#!/usr/bin/env python3
"""
auto_video_full.py — 台本から研修動画を全自動生成

使い方:
  python3 auto_video_full.py script.txt \
    --voice-id YOUR_VOICE_MODEL_ID \
    --api-key YOUR_FISH_AUDIO_API_KEY \
    --theme dark \
    --output output.mp4

台本フォーマット:
  === SLIDE 01: タイトル ===
  ・箇条書き1（スライドに表示）
  ・箇条書き2
  ・箇条書き3
  ---
  ここにナレーション全文を書きます。
  音声はこちらが使われ、スライドには表示されません。

  ※「---」区切りがない場合は、本文がそのままスライドにも音声にも使われます。
"""

import argparse, json, os, re, subprocess, sys, textwrap, time
from datetime import datetime

# --- 必須ライブラリの自動インストール機能 ---
def ensure_package(import_name, pip_name=None):
    if pip_name is None: pip_name = import_name
    try:
        __import__(import_name); return True
    except ImportError:
        print(f"  ⏳ {pip_name} を自動インストール中...")
        ret = os.system(f"python3 -m pip install {pip_name} --break-system-packages 2>/dev/null || python3 -m pip install {pip_name}")
        import site, importlib
        user_site = site.getusersitepackages()
        if user_site not in sys.path:
            sys.path.insert(0, user_site)
        importlib.invalidate_caches()
        try:
            __import__(import_name); print(f"  ✅ {pip_name} インストール完了"); return True
        except ImportError: pass
        print(f"  ❌ {pip_name} のインストールに失敗")
        print(f"     手動実行: python3 -m pip install {pip_name} --break-system-packages")
        return False

if not ensure_package("PIL", "Pillow"): sys.exit(1)
if not ensure_package("requests"): sys.exit(1)

from PIL import Image, ImageDraw, ImageFont
import requests

SLIDE_W, SLIDE_H = 1920, 1080
THEMES = {
    "dark":  {"bg":(20,30,50),   "title_color":(255,255,255), "body_color":(220,220,230), "accent":(80,140,255),  "slide_num_color":(100,120,160)},
    "light": {"bg":(255,255,255),"title_color":(30,40,60),    "body_color":(50,60,80),    "accent":(40,100,200),  "slide_num_color":(180,180,190)},
    "blue":  {"bg":(10,25,65),   "title_color":(255,255,255), "body_color":(200,210,230), "accent":(60,180,255),  "slide_num_color":(80,100,150)},
}
FISH_AUDIO_TTS_URL = "https://api.fish.audio/v1/tts"

def find_font():
    for p in [
        "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
        "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc",
        "/System/Library/Fonts/ヒラギノ丸ゴ ProN W4.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/AppleSDGothicNeo.ttc",
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "C:\\Windows\\Fonts\\msgothic.ttc",
        "C:\\Windows\\Fonts\\meiryo.ttc",
    ]:
        if os.path.exists(p): return p
    return None

def get_font(size, font_path=None):
    if font_path:
        try: return ImageFont.truetype(font_path, size)
        except: pass
    return ImageFont.load_default()

def parse_script(filepath):
    """台本を解析。---区切りがあればスライド表示用とナレーション用を分離"""
    with open(filepath,"r",encoding="utf-8") as f: content = f.read()
    parts = re.split(r"===\s*SLIDE\s*(\d+)\s*[:：]\s*(.*?)\s*===", content)
    slides = []
    i = 1
    while i+2 <= len(parts):
        body_raw = parts[i+2].strip()

        # --- 区切りで「スライド表示用」と「ナレーション用」を分離
        if re.search(r'^---\s*$', body_raw, re.MULTILINE):
            split_parts = re.split(r'^---\s*$', body_raw, maxsplit=1, flags=re.MULTILINE)
            display = split_parts[0].strip()
            narration = split_parts[1].strip() if len(split_parts) > 1 else body_raw
        else:
            # 区切りがなければ両方同じ（従来互換）
            display = body_raw
            narration = body_raw

        slides.append({
            "num": int(parts[i]),
            "title": parts[i+1].strip(),
            "display": display,    # スライド画像に表示するテキスト
            "narration": narration, # 音声生成に使うテキスト
            "body": narration,      # 後方互換
        })
        i += 3
    if not slides:
        print("❌ スライド区切り（===SLIDE 01: ...===）が見つかりません。"); sys.exit(1)
    return slides

def wrap_text_ja(text, max_chars=32):
    lines = []
    for p in text.split("\n"):
        p = p.strip()
        if not p: lines.append(""); continue
        while len(p)>max_chars: lines.append(p[:max_chars]); p=p[max_chars:]
        if p: lines.append(p)
    return lines

def generate_slide_image(slide, theme_name, font_path, output_path, total):
    """スライド画像生成 — slide["display"] を表示"""
    theme = THEMES[theme_name]
    img = Image.new("RGB",(SLIDE_W,SLIDE_H),theme["bg"])
    draw = ImageDraw.Draw(img)
    tf = get_font(52,font_path); bf = get_font(34,font_path); nf = get_font(24,font_path)
    draw.rectangle([0,0,8,SLIDE_H], fill=theme["accent"])
    nt = f"{slide['num']} / {total}"
    nb = draw.textbbox((0,0),nt,font=nf)
    draw.text((SLIDE_W-(nb[2]-nb[0])-60, SLIDE_H-60), nt, fill=theme["slide_num_color"], font=nf)
    ty = 100
    for line in wrap_text_ja(slide["title"],28):
        draw.text((100,ty), line, fill=theme["title_color"], font=tf); ty+=70
    ly = ty+20
    draw.rectangle([100,ly,400,ly+4], fill=theme["accent"])
    by = ly+50

    # ★ display（箇条書き）を表示
    display_text = slide.get("display", slide.get("body", ""))
    for line in wrap_text_ja(display_text, 40)[:16]:
        draw.text((100,by), line, fill=theme["body_color"], font=bf); by+=50
    img.save(output_path,"PNG")

def generate_audio(text, voice_id, api_key, output_path, emotion=None):
    headers = {"Authorization":f"Bearer {api_key}","Content-Type":"application/json"}
    payload = {"text":text,"reference_id":voice_id,"format":"mp3","mp3_bitrate":128}
    if emotion: payload["prosody"] = {"emotion":[emotion]}
    for attempt in range(3):
        try:
            resp = requests.post(FISH_AUDIO_TTS_URL, headers=headers, json=payload, timeout=120)
            if resp.status_code == 200:
                with open(output_path,"wb") as f: f.write(resp.content)
                return True
            elif resp.status_code == 429:
                w=10*(attempt+1); print(f"    ⏳ レート制限。{w}秒待機..."); time.sleep(w)
            else:
                print(f"    ⚠️  API エラー（{resp.status_code}）: {resp.text[:200]}")
                if attempt<2: time.sleep(5)
        except requests.exceptions.Timeout:
            print(f"    ⏳ タイムアウト。リトライ {attempt+1}/3"); time.sleep(5)
        except Exception as e:
            print(f"    ❌ 通信エラー: {e}")
            if attempt<2: time.sleep(5)
    return False

def get_audio_duration(fp):
    try:
        r = subprocess.run(["ffprobe","-v","quiet","-show_entries","format=duration","-of","csv=p=0",fp], capture_output=True, text=True)
        return float(r.stdout.strip())
    except: return 5.0

def combine_video(slides_dir, audio_dir, output_path, slides):
    td = os.path.join(os.path.dirname(output_path),"_temp_video")
    os.makedirs(td, exist_ok=True)
    segs = []
    for s in slides:
        n=s["num"]; ip=os.path.join(slides_dir,f"slide_{n:02d}.png"); ap=os.path.join(audio_dir,f"slide_{n:02d}.mp3"); sp=os.path.join(td,f"segment_{n:02d}.mp4")
        if not os.path.exists(ip): print(f"  ⚠️  slide_{n:02d}.png なし。スキップ。"); continue
        if os.path.exists(ap):
            dur = get_audio_duration(ap)+0.5
            cmd=["ffmpeg","-y","-loop","1","-i",ip,"-i",ap,"-c:v","libx264","-tune","stillimage","-c:a","aac","-b:a","192k","-pix_fmt","yuv420p","-t",f"{dur:.2f}","-shortest",sp]
        else:
            print(f"  ⚠️  slide_{n:02d}.mp3 なし。3秒の無音スライド。")
            cmd=["ffmpeg","-y","-loop","1","-i",ip,"-f","lavfi","-i","anullsrc=r=44100:cl=stereo","-c:v","libx264","-tune","stillimage","-c:a","aac","-pix_fmt","yuv420p","-t","3",sp]
        subprocess.run(cmd, capture_output=True); segs.append(sp)
    if not segs: print("❌ 動画セグメントが0個"); return False
    cf = os.path.join(td,"concat.txt")
    with open(cf,"w") as f:
        for s in segs: f.write(f"file '{s}'\n")
    r = subprocess.run(["ffmpeg","-y","-f","concat","-safe","0","-i",cf,"-c","copy",output_path], capture_output=True, text=True)
    for s in segs:
        try: os.remove(s)
        except: pass
    try: os.remove(cf); os.rmdir(td)
    except: pass
    return r.returncode == 0

def main():
    p = argparse.ArgumentParser(description="台本から研修動画を全自動生成")
    p.add_argument("script", help="台本ファイル（script.txt）")
    p.add_argument("--voice-id", required=True, help="Fish Audio ボイスモデルID")
    p.add_argument("--api-key", required=True, help="Fish Audio APIキー")
    p.add_argument("--theme", default="dark", choices=["dark","light","blue"])
    p.add_argument("--output", default="output.mp4")
    p.add_argument("--emotion", default=None, help="音声の感情（calm, happy, excited）")
    args = p.parse_args()

    wd = os.path.dirname(os.path.abspath(args.script)) or "."

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_dir = os.path.join(wd, f"run_{ts}")
    sd = os.path.join(run_dir, "slides"); ad = os.path.join(run_dir, "audio")
    os.makedirs(sd, exist_ok=True); os.makedirs(ad, exist_ok=True)

    base, ext = os.path.splitext(args.output)
    op = os.path.join(wd, f"{base}_{ts}{ext}")
    print(f"📁 出力先: {os.path.basename(op)}")

    fp = find_font()
    if fp: print(f"✅ フォント: {os.path.basename(fp)}")
    else: print("⚠️  日本語フォントなし。デフォルト使用。")

    print(f"\n{'='*50}\n① 台本を解析中...\n{'='*50}")
    slides = parse_script(args.script)
    print(f"   → {len(slides)} 枚のスライド")

    # --- 区切りの使用状況を表示 ---
    has_separator = any(s["display"] != s["narration"] for s in slides)
    if has_separator:
        print("   → 📋 箇条書きモード: スライド=箇条書き / 音声=ナレーション全文")
    else:
        print("   → 📝 通常モード: スライドと音声で同じテキストを使用")
        print("       ※ 箇条書きにするには台本に「---」区切りを追加してください")

    print(f"\n{'='*50}\n② スライド画像を生成中...\n{'='*50}")
    for s in slides:
        ip=os.path.join(sd,f"slide_{s['num']:02d}.png")
        generate_slide_image(s,args.theme,fp,ip,len(slides))
        print(f"   ✅ slide_{s['num']:02d}.png")

    print(f"\n{'='*50}\n③ Fish Audio で音声を生成中...\n{'='*50}")
    failed=[]
    for s in slides:
        ap=os.path.join(ad,f"slide_{s['num']:02d}.mp3")
        print(f"   🎙  スライド {s['num']:02d}: {s['title'][:30]}...")
        # ★ 音声は narration（ナレーション全文）を使用
        if generate_audio(s["narration"],args.voice_id,args.api_key,ap,emotion=args.emotion):
            d=get_audio_duration(ap); print(f"   ✅ slide_{s['num']:02d}.mp3 ({d:.1f}秒)")
        else: failed.append(s["num"]); print(f"   ❌ slide_{s['num']:02d} 失敗")
        time.sleep(1)
    if failed: print(f"\n⚠️  音声生成失敗: スライド {failed}\n   → 無音で処理")

    print(f"\n{'='*50}\n④ ffmpeg で動画を結合中...\n{'='*50}")
    if combine_video(sd,ad,op,slides) and os.path.exists(op):
        sz=os.path.getsize(op)/(1024*1024)
        print(f"\n{'='*50}\n🎉 完成！\n   ファイル: {op}\n   サイズ: {sz:.1f} MB\n{'='*50}")
    else:
        print(f"\n❌ 動画結合に失敗。ffmpegを確認: brew install ffmpeg"); sys.exit(1)

if __name__ == "__main__": main()
