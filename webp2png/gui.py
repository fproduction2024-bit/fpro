"""Tkinter GUI for WebP to PNG conversion."""
import logging
import queue
import threading
from pathlib import Path
from typing import List

import tkinter as tk
from tkinter import filedialog, messagebox, ttk

from .converter import ConversionError, convert_webp_to_png
from .utils import collect_webp_files, generate_output_path

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)


class Webp2PngApp(tk.Tk):
    """Main application window."""

    def __init__(self) -> None:
        super().__init__()
        self.title("WebP to PNG Converter")
        self.geometry("640x480")

        self.input_paths: List[Path] = []
        self.output_dir: Path | None = None
        self.recursive = tk.BooleanVar(value=False)
        self.force = tk.BooleanVar(value=False)
        self.verbose = tk.BooleanVar(value=False)

        self._log_queue: queue.Queue[str] = queue.Queue()
        self._create_widgets()
        self._poll_log_queue()

    def _create_widgets(self) -> None:
        # Input controls
        input_frame = ttk.LabelFrame(self, text="入力")
        input_frame.pack(fill="x", padx=10, pady=8)

        btn_add_files = ttk.Button(input_frame, text="ファイル追加", command=self.add_files)
        btn_add_dir = ttk.Button(input_frame, text="ディレクトリ追加", command=self.add_directory)
        btn_clear = ttk.Button(input_frame, text="クリア", command=self.clear_inputs)
        btn_add_files.pack(side="left", padx=4, pady=4)
        btn_add_dir.pack(side="left", padx=4, pady=4)
        btn_clear.pack(side="left", padx=4, pady=4)

        self.listbox = tk.Listbox(input_frame, height=6)
        self.listbox.pack(fill="x", padx=4, pady=4)

        # Options
        option_frame = ttk.LabelFrame(self, text="オプション")
        option_frame.pack(fill="x", padx=10, pady=8)
        ttk.Checkbutton(option_frame, text="再帰的に探索", variable=self.recursive).pack(side="left", padx=4)
        ttk.Checkbutton(option_frame, text="既存ファイルを上書き", variable=self.force).pack(side="left", padx=4)
        ttk.Checkbutton(option_frame, text="詳細ログ", variable=self.verbose).pack(side="left", padx=4)

        # Output directory
        output_frame = ttk.LabelFrame(self, text="出力ディレクトリ")
        output_frame.pack(fill="x", padx=10, pady=8)
        self.output_dir_var = tk.StringVar()
        output_entry = ttk.Entry(output_frame, textvariable=self.output_dir_var)
        output_entry.pack(side="left", fill="x", expand=True, padx=4, pady=4)
        btn_output = ttk.Button(output_frame, text="選択", command=self.choose_output_dir)
        btn_output.pack(side="left", padx=4, pady=4)

        # Progress
        progress_frame = ttk.Frame(self)
        progress_frame.pack(fill="x", padx=10, pady=8)
        self.progress = ttk.Progressbar(progress_frame, mode="determinate")
        self.progress.pack(fill="x", padx=4, pady=4)

        # Log
        log_frame = ttk.LabelFrame(self, text="ログ")
        log_frame.pack(fill="both", expand=True, padx=10, pady=8)
        self.log_text = tk.Text(log_frame, height=10, state="disabled")
        self.log_text.pack(fill="both", expand=True, padx=4, pady=4)

        # Action
        action_frame = ttk.Frame(self)
        action_frame.pack(fill="x", padx=10, pady=8)
        self.run_button = ttk.Button(action_frame, text="変換を実行", command=self.run_conversion)
        self.run_button.pack(side="right", padx=4)

    def add_files(self) -> None:
        files = filedialog.askopenfilenames(
            title="WebPファイルを選択",
            filetypes=[("WebP files", "*.webp"), ("All files", "*.*")],
        )
        for f in files:
            path = Path(f)
            if path not in self.input_paths:
                self.input_paths.append(path)
                self.listbox.insert(tk.END, str(path))

    def add_directory(self) -> None:
        directory = filedialog.askdirectory(title="ディレクトリを選択")
        if directory:
            path = Path(directory)
            if path not in self.input_paths:
                self.input_paths.append(path)
                self.listbox.insert(tk.END, str(path))

    def clear_inputs(self) -> None:
        self.input_paths.clear()
        self.listbox.delete(0, tk.END)

    def choose_output_dir(self) -> None:
        directory = filedialog.askdirectory(title="出力ディレクトリを選択")
        if directory:
            self.output_dir = Path(directory)
            self.output_dir_var.set(str(self.output_dir))

    def _append_log(self, message: str) -> None:
        self._log_queue.put(message)

    def _poll_log_queue(self) -> None:
        try:
            while True:
                msg = self._log_queue.get_nowait()
                self.log_text.configure(state="normal")
                self.log_text.insert(tk.END, msg + "\n")
                self.log_text.see(tk.END)
                self.log_text.configure(state="disabled")
        except queue.Empty:
            pass
        self.after(100, self._poll_log_queue)

    def run_conversion(self) -> None:
        if not self.input_paths:
            messagebox.showerror("エラー", "入力ファイルまたはディレクトリを選択してください。")
            return

        # 収集
        webp_files = collect_webp_files(self.input_paths, recursive=self.recursive.get())
        if not webp_files:
            messagebox.showerror("エラー", "WebPファイルが見つかりません。")
            return

        # 出力ディレクトリ
        if self.output_dir_var.get():
            self.output_dir = Path(self.output_dir_var.get())
        else:
            self.output_dir = None

        # UIロック
        self.run_button.config(state="disabled")
        self.progress.config(maximum=len(webp_files), value=0)
        self._append_log(f"変換開始: {len(webp_files)} 件")

        threading.Thread(
            target=self._convert_batch,
            args=(webp_files,),
            daemon=True,
        ).start()

    def _convert_batch(self, webp_files: List[Path]) -> None:
        try:
            for idx, webp_file in enumerate(webp_files, start=1):
                try:
                    if self.output_dir:
                        out_path = generate_output_path(webp_file, self.output_dir)
                    else:
                        out_path = None
                    result = convert_webp_to_png(
                        webp_file,
                        output_path=out_path,
                        force=self.force.get(),
                        preserve_metadata=True,
                    )
                    self._append_log(f"成功: {webp_file} -> {result}")
                except ConversionError as e:
                    self._append_log(f"失敗: {webp_file} ({e})")
                finally:
                    self.progress.config(value=idx)
        finally:
            self.run_button.config(state="normal")
            self._append_log("変換完了")


def main() -> None:
    app = Webp2PngApp()
    app.mainloop()


if __name__ == "__main__":
    main()

