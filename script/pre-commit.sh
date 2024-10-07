#!/bin/sh

## 定义大文件的大小限制（以字节为单位）
#FILE_SIZE_LIMIT=$((100 * 1024 * 1024))  # 100MB
#
## 获取暂存区中的大文件列表
#large_files=$(git diff --cached --name-only | xargs -I{} sh -c '
#  if [ -f "$1" ]; then
#    file_size=$(wc -c <"$1")
#    if [ $file_size -ge '$FILE_SIZE_LIMIT' ]; then
#      echo "$1"
#    fi
#  fi
#' -- {})
#
## 如果存在大文件，将其添加到 Git LFS 跟踪
#if [ -n "$large_files" ]; then
#  echo "Tracking large files with Git LFS:"
#  echo "$large_files" | while read -r file; do
#    echo "  $file"
#    git lfs track "$file"
#  done
#
#  # 更新 .gitattributes 文件
#  git add .gitattributes
#
#  # 重新添加暂存区中的文件
#  echo "$large_files" | xargs git add
#fi
