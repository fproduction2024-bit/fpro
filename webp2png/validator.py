"""Validation functions for webp2png."""
import logging
from pathlib import Path
from typing import Tuple

logger = logging.getLogger(__name__)

# デフォルトのファイルサイズ制限（100MB）
MAX_FILE_SIZE = 100 * 1024 * 1024


def is_webp_file(file_path: Path) -> bool:
    """
    WebPファイルかどうかを判定する（マジックナンバーでチェック）
    
    Args:
        file_path: チェックするファイルのパス
        
    Returns:
        WebPファイルの場合True
    """
    try:
        with open(file_path, 'rb') as f:
            header = f.read(12)
            # WebPのマジックナンバー: "RIFF" + 4バイト + "WEBP"
            if len(header) >= 12:
                return header[0:4] == b'RIFF' and header[8:12] == b'WEBP'
    except Exception as e:
        logger.error(f"Error reading file header: {e}")
        return False
    
    return False


def validate_input_file(file_path: Path) -> Tuple[bool, str]:
    """
    入力ファイルを検証する
    
    Args:
        file_path: 検証するファイルのパス
        
    Returns:
        (検証成功フラグ, エラーメッセージ)
    """
    # ファイル存在確認
    if not file_path.exists():
        return False, f"File does not exist: {file_path}"
    
    # ファイルかどうか確認
    if not file_path.is_file():
        return False, f"Not a file: {file_path}"
    
    # 読み取り権限確認
    if not file_path.stat().st_mode & 0o044:
        return False, f"No read permission: {file_path}"
    
    # ファイルサイズ確認
    file_size = file_path.stat().st_size
    if file_size == 0:
        return False, f"File is empty: {file_path}"
    
    if file_size > MAX_FILE_SIZE:
        return False, f"File too large ({file_size / 1024 / 1024:.2f}MB > {MAX_FILE_SIZE / 1024 / 1024}MB): {file_path}"
    
    # WebP形式確認
    if not is_webp_file(file_path):
        return False, f"Not a valid WebP file: {file_path}"
    
    return True, ""


def validate_output_path(output_path: Path, force: bool = False) -> Tuple[bool, str]:
    """
    出力パスを検証する
    
    Args:
        output_path: 検証する出力パスのパス
        force: 既存ファイルを上書きするか
        
    Returns:
        (検証成功フラグ, エラーメッセージ)
    """
    output_dir = output_path.parent
    
    # ディレクトリの存在確認と作成
    if output_dir.exists():
        if not output_dir.is_dir():
            return False, f"Output directory is not a directory: {output_dir}"
    else:
        # ディレクトリが存在しない場合は、実際に作成を試みる
        # （権限チェックの代わりに実際の操作で確認）
        try:
            output_dir.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            return False, f"No permission to create directory: {output_dir}"
        except Exception as e:
            return False, f"Cannot create directory {output_dir}: {e}"
    
    # 書き込み権限の確認（実際に書き込みテストファイルを作成して確認）
    try:
        test_file = output_dir / ".webp2png_write_test"
        test_file.touch()
        test_file.unlink()
    except PermissionError:
        return False, f"No write permission in directory: {output_dir}"
    except Exception as e:
        return False, f"Cannot write to directory {output_dir}: {e}"
    
    # 既存ファイルの確認
    if output_path.exists() and not force:
        return False, f"Output file already exists (use --force to overwrite): {output_path}"
    
    return True, ""

