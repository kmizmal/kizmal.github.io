'use strict';

const fs = require('fs').promises;
const path = require('path');
var config = hexo.config;  // 获取 Hexo 配置

// 获取 Hexo 项目的 public 目录路径
const hexoRootDir = path.resolve(__dirname, '..');
const publicDir = path.join(hexoRootDir, 'public');

// 递归读取目录中的所有 HTML 文件
async function readHtmlFiles(dir) {
    try {
        const files = await fs.readdir(dir);

        // 遍历每个文件
        for (const file of files) {
            const filePath = path.join(dir, file);

            // 获取文件信息
            const stats = await fs.stat(filePath);

            // 如果是目录，递归读取
            if (stats.isDirectory()) {
                await readHtmlFiles(filePath);
            } else if (file.endsWith('.html')) {
                // 如果是 .html 文件，读取并打印
                const data = await fs.readFile(filePath, 'utf8');
                console.log(`内容来自 ${filePath}:`);
                //读取语言配置
                const languageCode = config.language.split('-')[0];
                const translatedContent = await Translate(data, languageCode,"en");  // 确保异步调用
                // 打印翻译后的内容
                console.log("翻译结果", translatedContent);
            }
        }
    } catch (err) {
        console.error('读取文件时出错:', err);
    }
}

// 从 public 目录开始读取
// hexo.on("exit", async function (post) {
//     await readHtmlFiles(publicDir);
// });


// 翻译函数，调用 LibreTranslate API 进行翻译
const translate_api_url = "https://asfag654-libretranslate.hf.space/translate";
async function Translate(data, source,target) {
    try {
        console.log("少女正在努力翻译:", data);
        const res = await fetch(translate_api_url, {
            method: "POST",
            body: JSON.stringify({
                q: data, // 要翻译的文本
                source: source, // 源语言
                target: target,   // 翻译目标语言为英文
                format: "html",  //指定HTML 格式
            }),
            headers: { "Content-Type": "application/json" },
        });

        // 检查响应状态码
        if (!res.ok) {
            console.error(`API 返回错误: ${res.status} ${res.statusText}`);
            const errorText = await res.text();  // 获取错误页面内容
            console.error('错误页面内容:', errorText);
            return data;  // 返回原始数据
        }

        // 解析 JSON 数据
        const translateData = await res.json();

        if (translateData?.translatedText) {
            return translateData.translatedText.replace(html, "");  // 删除翻译结果中的 "html" 前缀;
        } else {
            console.error("少女为你痛哭，翻译api抽风了", translateData);
            return data;
        }
    } catch (error) {
        console.error("少女为你痛哭，翻译api失效了", error);
        return data;
    }
}

