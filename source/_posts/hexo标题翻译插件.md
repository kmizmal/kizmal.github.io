---
title: hexo标题翻译插件
date: 2025-01-04 11:43:58
tags:
---
使用[libretranslate](https://github.com/LibreTranslate/LibreTranslate)将Hexo中的汉字标题转成英文标题，开箱即用，无需手工修改标题内容

### 安装
1. ***命令行安装***

在hexo项目目录执行
```bash
mkdir scripts
curl -O https://github.com/kmizmal/hexo-translate-title/releases/download/release/translate-title.js scripts/
```
2. ***手动安装***

在[Releases](https://github.com/kmizmal/hexo-translate-title/releases)下载translate-title.js之后手动扔到hexo项目目录下的scripts文件夹 ~~，如果没有就创建一个~~
### 配置（可选）

在`translate-title.js`的52行`translate_api_url`后填入你自己搭建的[libretranslate](https://github.com/LibreTranslate/LibreTranslate)接口

