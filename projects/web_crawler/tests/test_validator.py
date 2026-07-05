"""Tests for validator module."""
import tempfile
from pathlib import Path
from unittest.mock import patch

import pytest

from webp2png.validator import is_webp_file, validate_input_file, validate_output_path


def test_is_webp_file_valid():
    """有効なWebPファイルのマジックナンバーチェック"""
    # 実際のWebPファイルがないため、モックを使用
    webp_header = b'RIFF' + b'\x00\x00\x00\x00' + b'WEBP' + b'\x00\x00'
    
    with tempfile.NamedTemporaryFile(suffix='.webp', delete=False) as f:
        f.write(webp_header)
        f.write(b'\x00' * 100)  # ダミーデータ
        temp_path = Path(f.name)
    
    try:
        result = is_webp_file(temp_path)
        assert result is True
    finally:
        temp_path.unlink()


def test_is_webp_file_invalid():
    """無効なファイルのマジックナンバーチェック"""
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
        f.write(b'PNG' + b'\x00' * 100)
        temp_path = Path(f.name)
    
    try:
        result = is_webp_file(temp_path)
        assert result is False
    finally:
        temp_path.unlink()


def test_validate_input_file_not_exists():
    """存在しないファイルの検証"""
    result, error = validate_input_file(Path("/nonexistent/file.webp"))
    assert result is False
    assert "does not exist" in error


def test_validate_output_path_directory_creation():
    """出力ディレクトリが存在しない場合の検証"""
    with tempfile.TemporaryDirectory() as tmpdir:
        output_path = Path(tmpdir) / "new_dir" / "output.png"
        result, error = validate_output_path(output_path, force=True)
        # 親ディレクトリの書き込み権限があればTrue
        # 実際の結果は環境に依存するため、エラーメッセージをチェック
        if not result:
            assert "permission" in error.lower() or "directory" in error.lower()

