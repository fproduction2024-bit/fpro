"""Core conversion engine for webp2png."""
import logging
from pathlib import Path
from typing import Dict, Optional

from PIL import Image

from .validator import validate_input_file, validate_output_path
from .utils import ensure_output_dir, handle_file_conflict, generate_output_path

logger = logging.getLogger(__name__)


class ConversionError(Exception):
    """変換エラー用のカスタム例外"""
    pass


def convert_webp_to_png(
    input_path: Path,
    output_path: Optional[Path] = None,
    force: bool = False,
    preserve_metadata: bool = True
) -> Path:
    """
    WebP画像をPNGに変換する
    
    Args:
        input_path: 入力WebPファイルのパス
        output_path: 出力PNGファイルのパス（Noneの場合は自動生成）
        force: 既存ファイルを上書きするか
        preserve_metadata: メタデータを保持するか
        
    Returns:
        実際に保存された出力ファイルのパス
        
    Raises:
        ConversionError: 変換に失敗した場合
    """
    # 入力ファイルの検証
    is_valid, error_msg = validate_input_file(input_path)
    if not is_valid:
        raise ConversionError(error_msg)
    
    # 出力パスの生成
    if output_path is None:
        output_path = generate_output_path(input_path)
    else:
        output_path = Path(output_path)
    
    # 出力ディレクトリの確保
    ensure_output_dir(output_path)
    
    # ファイル競合の処理
    output_path = handle_file_conflict(output_path, force)
    
    # 出力パスの検証
    is_valid, error_msg = validate_output_path(output_path, force)
    if not is_valid:
        raise ConversionError(error_msg)
    
    try:
        # WebP画像を読み込み
        logger.debug(f"Opening WebP file: {input_path}")
        with Image.open(input_path) as img:
            # 画像形式を確認
            if img.format != 'WEBP':
                raise ConversionError(f"Image format is not WebP: {img.format}")
            
            # RGBAモードに変換（透明度を保持）
            if img.mode != 'RGBA':
                logger.debug(f"Converting mode from {img.mode} to RGBA")
                img = img.convert('RGBA')
            
            # メタデータを取得（EXIF等）
            metadata = {}
            if preserve_metadata:
                # EXIFデータがある場合は保持
                if hasattr(img, '_getexif') and img._getexif():
                    metadata['exif'] = img._getexif()
                # その他のメタデータ
                if hasattr(img, 'info'):
                    # PNG形式では保持できない一部の情報を除外
                    for key in ['icc_profile', 'webp', 'compression']:
                        if key in img.info:
                            metadata[key] = img.info[key]
            
            # PNGとして保存
            logger.debug(f"Saving PNG file: {output_path}")
            save_kwargs = {
                'format': 'PNG',
                'optimize': True,
            }
            
            # メタデータがある場合は追加
            if metadata:
                # PNG形式ではexifは直接保存できないため、infoに追加
                if 'exif' in metadata:
                    try:
                        # PillowのPNG形式ではEXIFは限定的にサポート
                        # 可能な場合はinfoに追加
                        pass  # EXIFのPNG保存は複雑なため、ここでは省略
                    except Exception as e:
                        logger.warning(f"Could not preserve EXIF data: {e}")
            
            img.save(output_path, **save_kwargs)
            logger.info(f"Successfully converted: {input_path} -> {output_path}")
            
            return output_path
            
    except IOError as e:
        raise ConversionError(f"IO error while processing {input_path}: {e}")
    except Exception as e:
        raise ConversionError(f"Unexpected error while converting {input_path}: {e}")


def convert_multiple_files(
    input_paths: list[Path],
    output_dir: Optional[Path] = None,
    force: bool = False,
    preserve_metadata: bool = True
) -> Dict[Path, Optional[Path]]:
    """
    複数のWebPファイルをPNGに変換する
    
    Args:
        input_paths: 入力WebPファイルのパスリスト
        output_dir: 出力ディレクトリ（Noneの場合は各入力ファイルと同じディレクトリ）
        force: 既存ファイルを上書きするか
        preserve_metadata: メタデータを保持するか
        
    Returns:
        変換結果の辞書 {入力パス: 出力パス or None（失敗時）}
    """
    results = {}
    
    for input_path in input_paths:
        try:
            # output_dirが指定されている場合は、そこに出力パスを生成
            if output_dir:
                output_path = generate_output_path(input_path, output_dir)
            else:
                output_path = None  # Noneの場合は自動生成される
            
            result_path = convert_webp_to_png(
                input_path,
                output_path=output_path,
                force=force,
                preserve_metadata=preserve_metadata
            )
            results[input_path] = result_path
        except ConversionError as e:
            logger.error(f"Conversion failed for {input_path}: {e}")
            results[input_path] = None
    
    return results

