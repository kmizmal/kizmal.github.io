'use strict';

var hexo = hexo || {};
const config = hexo.config;
const front = require('hexo-front-matter');
const fs = require('hexo-fs');

// 配置读取（保持默认值，无需修改hexo配置即可使用）
const translateConfig = hexo.config.translate || {};
const apiUrl = translateConfig.api_url || "https://asfag654-libretranslate.hf.space/translate";
const targetLang = translateConfig.target_lang || "en";
const defaultSourceLang = 'zh'; // 默认源语言

hexo.extend.filter.register('before_post_render', async function (data) {
    if (data.Translate_title) {
        hexo.log.info(`跳过已翻译文章: ${data.title}`);
        return data;
    }

    // 标题处理逻辑保持不变
    const sanitizedTitle = data.title
        .replace(/[^\w\s\u4e00-\u9fa5]/g, "")
        .replace(/\s+/g, "-");

    // 语言检测增强
    const sourceLang = config.language ? 
        config.language.split('-')[0] : 
        defaultSourceLang;

    try {
        const translatedTitle = await translateWithRetry(sanitizedTitle, sourceLang);
        
        if (translatedTitle !== sanitizedTitle) {
            data.Translate_title = translatedTitle.replace(/\s+/g, "-");
            await rewriteFile(data);
            hexo.log.info(`标题翻译完成: ${sanitizedTitle} → ${data.Translate_title}`);
        } else {
            hexo.log.warn(`标题未变化: ${sanitizedTitle}`);
        }
    } catch (error) {
        hexo.log.error(`标题翻译失败: ${sanitizedTitle}`, error);
    }

    return data;
}, 5);

/* 文件重写函数（改进字段保留） */
async function rewriteFile(data) {
    // 克隆数据并移除Hexo内部属性
    const frontMatterData = {...data};
    [
        'content', 'full_source', 'source', 'path', 'raw', // Hexo内部属性
        'site', '_content', '_id', 'layout'                // 其他可能存在的冗余属性
    ].forEach(prop => delete frontMatterData[prop]);

    // 特殊处理分类标签结构
    if (frontMatterData.tags?.data) {
        frontMatterData.tags = frontMatterData.tags.data.map(t => t.name);
    }
    if (frontMatterData.categories?.data) {
        frontMatterData.categories = frontMatterData.categories.data.map(c => c.name);
    }

    // 生成新内容
    const newContent = `---\n${front.stringify(frontMatterData).trim()}\n${data.content}`;
    
    try {
        await fs.writeFile(data.full_source, newContent);
    } catch (error) {
        hexo.log.error('文件写入失败:', error);
        throw error; // 向上传递错误
    }
}

/* 增强版翻译函数（含重试机制） */
async function translateWithRetry(text, sourceLang, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const result = await response.json();
            if (result?.translatedText) {
                return result.translatedText;
            }
            throw new Error('无效的API响应');

        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 指数退避
            hexo.log.warn(`第 ${i+1} 次重试翻译: ${text}`);
        }
    }
}