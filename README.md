# Markdown Cool Editor

一个用于在VSCode中高亮显示Markdown标题的扩展。不同级别的标题将使用不同的颜色进行显示。

## 功能

- 针对6个级别的Markdown标题设置不同的高亮颜色
- 实时高亮显示，让您的文档结构更加清晰
- 可自定义每个级别标题的颜色

## 默认颜色

- H1 (`# 标题`) - 红色 (#FF2D00)
- H2 (`## 标题`) - 深青色 (#00CED1)
- H3 (`### 标题`) - 浅蓝色 (#33A8FF)
- H4 (`#### 标题`) - 紫色 (#9900CC)
- H5 (`##### 标题`) - 金色 (#FFC700)
- H6 (`###### 标题`) - 粉色 (#FF00AA)

## 自定义颜色

您可以在VSCode设置中自定义每个级别标题的颜色：

1. 打开设置 (Ctrl+,)
2. 搜索 "Markdown Cool Editor"
3. 更改相应级别标题的颜色

## 安装

您可以通过以下步骤安装此扩展：

1. 打开VSCode
2. 打开扩展视图 (Ctrl+Shift+X)
3. 搜索"Markdown Cool Editor"
4. 点击安装

## 本地安装

如果您从源代码构建此扩展，可以通过以下步骤安装：

```bash
# 安装依赖
npm install

# 编译扩展
npm run compile

# 将编译后的文件打包成VSIX文件
npx vsce package

# 安装VSIX文件
code --install-extension markdown-heading-highlighter-0.1.0.vsix
```

## 使用注意

- 此扩展仅对Markdown文件有效
- 标题必须使用标准Markdown语法 (# 标题) 