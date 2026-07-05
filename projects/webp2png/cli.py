"""Command-line interface for webp2png."""
import logging
import sys
from pathlib import Path
from typing import Optional, Tuple

import click
from tqdm import tqdm

from . import __version__
from .converter import ConversionError, convert_multiple_files, convert_webp_to_png
from .utils import collect_webp_files, generate_output_path, logger

# ロガーの設定
cli_logger = logging.getLogger(__name__)


def setup_logging(verbose: bool, quiet: bool) -> None:
    """ロギングレベルを設定する"""
    if quiet:
        level = logging.ERROR
    elif verbose:
        level = logging.DEBUG
    else:
        level = logging.INFO
    
    logging.getLogger().setLevel(level)


@click.command()
@click.argument('inputs', nargs=-1, required=True, type=click.Path(exists=True, path_type=Path))
@click.option('-o', '--output', type=click.Path(path_type=Path), help='出力ファイル名（単一ファイル時）')
@click.option('-d', '--output-dir', 'output_dir', type=click.Path(path_type=Path), help='出力ディレクトリ（複数ファイル時）')
@click.option('-r', '--recursive', is_flag=True, help='再帰的にディレクトリを探索')
@click.option('-f', '--force', is_flag=True, help='既存ファイルを上書き')
@click.option('-q', '--quiet', is_flag=True, help='エラー以外の出力を抑制')
@click.option('-v', '--verbose', is_flag=True, help='詳細ログ出力')
@click.version_option(version=__version__, prog_name='webp2png')
def main(
    inputs: Tuple[Path, ...],
    output: Optional[Path],
    output_dir: Optional[Path],
    recursive: bool,
    force: bool,
    quiet: bool,
    verbose: bool
) -> None:
    """
    WebP画像をPNG形式に変換するツール
    
    INPUTS: WebPファイルまたはディレクトリ（複数指定可能）
    
    例:
        webp2png image.webp -o output.png
        
        webp2png *.webp --output-dir ./png_output/
        
        webp2png -r ./images/ --output-dir ./converted/
    """
    # ロギング設定
    setup_logging(verbose, quiet)
    
    # 入力ファイルの収集
    input_paths = list(inputs)
    webp_files = collect_webp_files(input_paths, recursive=recursive)
    
    if not webp_files:
        click.echo("Error: No WebP files found.", err=True)
        sys.exit(1)
    
    # 単一ファイルの場合はoutputオプションを使用
    if len(webp_files) == 1 and output:
        try:
            output_path = convert_webp_to_png(
                webp_files[0],
                output_path=output,
                force=force
            )
            if not quiet:
                click.echo(f"Converted: {webp_files[0]} -> {output_path}")
        except ConversionError as e:
            click.echo(f"Error: {e}", err=True)
            sys.exit(1)
    else:
        # 複数ファイルの処理
        if output_dir:
            output_dir = Path(output_dir)
            output_dir.mkdir(parents=True, exist_ok=True)
        else:
            output_dir = None
        
        # プログレスバー付きで変換
        results = {}
        with tqdm(total=len(webp_files), disable=quiet, desc="Converting") as pbar:
            for webp_file in webp_files:
                try:
                    # output_dirが指定されている場合は出力パスを生成
                    if output_dir:
                        output_path = generate_output_path(webp_file, output_dir)
                    else:
                        output_path = None  # Noneの場合は自動生成される
                    
                    result_path = convert_webp_to_png(
                        webp_file,
                        output_path=output_path,
                        force=force
                    )
                    results[webp_file] = result_path
                    pbar.update(1)
                except ConversionError as e:
                    cli_logger.error(f"Conversion failed for {webp_file}: {e}")
                    results[webp_file] = None
                    pbar.update(1)
        
        # 結果のサマリー
        if not quiet:
            success_count = sum(1 for v in results.values() if v is not None)
            fail_count = len(results) - success_count
            
            click.echo(f"\nConversion complete:")
            click.echo(f"  Success: {success_count}")
            if fail_count > 0:
                click.echo(f"  Failed: {fail_count}", err=True)
                sys.exit(1)


if __name__ == '__main__':
    main()

