"""Utility functions for webp2png."""
import logging
from pathlib import Path
from typing import List, Optional

# ロギング設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def collect_webp_files(paths: List[Path], recursive: bool = False) -> List[Path]:
    """
    WebPファイルを収集する
    
    Args:
        paths: 検索対象のパスリスト（ファイルまたはディレクトリ）
        recursive: 再帰的にディレクトリを探索するか
        
    Returns:
        WebPファイルのパスリスト
    """
    webp_files = []
    
    for path in paths:
        path = Path(path)
        
        if not path.exists():
            logger.warning(f"Path does not exist: {path}")
            continue
            
        if path.is_file():
            if path.suffix.lower() == '.webp':
                webp_files.append(path)
            else:
                logger.warning(f"Not a WebP file: {path}")
        elif path.is_dir():
            pattern = "**/*.webp" if recursive else "*.webp"
            webp_files.extend(path.glob(pattern))
    
    return sorted(set(webp_files))


def ensure_output_dir(output_path: Path) -> None:
    """出力ディレクトリが存在しない場合は作成する"""
    output_dir = output_path.parent
    if not output_dir.exists():
        output_dir.mkdir(parents=True, exist_ok=True)
        logger.debug(f"Created output directory: {output_dir}")


def generate_output_path(input_path: Path, output_dir: Optional[Path] = None) -> Path:
    """
    入力ファイルから出力パスを生成する
    
    Args:
        input_path: 入力ファイルのパス
        output_dir: 出力ディレクトリ（Noneの場合は入力ファイルと同じディレクトリ）
        
    Returns:
        出力ファイルのパス
    """
    if output_dir:
        output_path = output_dir / f"{input_path.stem}.png"
    else:
        output_path = input_path.with_suffix('.png')
    
    return output_path


def handle_file_conflict(output_path: Path, force: bool = False) -> Path:
    """
    ファイル競合を処理する
    
    Args:
        output_path: 出力ファイルのパス
        force: 既存ファイルを上書きするか
        
    Returns:
        実際に使用する出力パス
    """
    if not output_path.exists():
        return output_path
    
    if force:
        logger.info(f"Overwriting existing file: {output_path}")
        return output_path
    else:
        # 番号を付与して新しいファイル名を生成
        counter = 1
        base_path = output_path.parent / output_path.stem
        extension = output_path.suffix
        
        while True:
            new_path = Path(f"{base_path}_{counter}{extension}")
            if not new_path.exists():
                logger.info(f"File exists, using: {new_path}")
                return new_path
            counter += 1

