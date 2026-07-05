"""Tests for converter module."""
import tempfile
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from PIL import Image

from webp2png.converter import ConversionError, convert_webp_to_png
from webp2png.validator import is_webp_file


def create_test_webp(output_path: Path) -> None:
    """テスト用のWebP画像を作成"""
    # 簡単なテスト画像を作成
    img = Image.new('RGBA', (100, 100), (255, 0, 0, 128))
    img.save(output_path, 'WEBP')


def test_convert_webp_to_png_not_exists():
    """存在しないファイルの変換"""
    with pytest.raises(ConversionError):
        convert_webp_to_png(Path("/nonexistent/file.webp"))


def test_convert_webp_to_png_invalid_format():
    """無効な形式のファイルの変換"""
    with tempfile.NamedTemporaryFile(suffix='.txt', delete=False) as f:
        f.write(b"not an image")
        temp_path = Path(f.name)
    
    try:
        with pytest.raises(ConversionError):
            convert_webp_to_png(temp_path)
    finally:
        temp_path.unlink()


@patch('webp2png.converter.validate_input_file')
@patch('webp2png.converter.is_webp_file')
def test_convert_webp_to_png_success(mock_is_webp, mock_validate):
    """正常な変換のテスト（モック使用）"""
    mock_validate.return_value = (True, "")
    mock_is_webp.return_value = True
    
    with tempfile.TemporaryDirectory() as tmpdir:
        input_path = Path(tmpdir) / "test.webp"
        output_path = Path(tmpdir) / "test.png"
        
        # 実際のWebP画像を作成
        create_test_webp(input_path)
        
        result = convert_webp_to_png(input_path, output_path, force=True)
        
        assert result == output_path
        assert output_path.exists()
        
        # PNGファイルとして読み込めることを確認
        with Image.open(output_path) as img:
            assert img.format == 'PNG'

