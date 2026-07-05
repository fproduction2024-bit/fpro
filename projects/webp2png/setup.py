"""Setup configuration for webp2png."""
from pathlib import Path

from setuptools import find_packages, setup

# READMEファイルを読み込む
readme_file = Path(__file__).parent / "README.md"
long_description = readme_file.read_text(encoding="utf-8") if readme_file.exists() else ""

setup(
    name="webp2png",
    version="1.0.0",
    description="WebP画像をPNG形式に変換するツール",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Your Name",
    author_email="your.email@example.com",
    url="https://github.com/yourusername/webp2png",
    packages=find_packages(),
    install_requires=[
        "Pillow>=10.0.0",
        "click>=8.0.0",
        "tqdm>=4.65.0",
    ],
    python_requires=">=3.8",
    entry_points={
        "console_scripts": [
            "webp2png=webp2png.cli:main",
            "webp2png-gui=webp2png.gui:main",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Programming Language :: Python :: 3.13",
        "Programming Language :: Python :: 3.14",
        "Topic :: Multimedia :: Graphics :: Graphics Conversion",
    ],
)

