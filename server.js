const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 聊天API路由
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: '缺少提示信息' });
        }
        
        // 直接使用系统环境变量中的API密钥
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ error: 'API密钥未配置，请设置GEMINI_API_KEY环境变量' });
        }
        
        console.log("使用API请求URL:", `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=[已隐藏]`);
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // 检查响应
        if (response.data.error) {
            return res.status(500).json({ error: response.data.error.message });
        }
        
        if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
            const botResponse = response.data.candidates[0].content.parts[0].text;
            return res.json({ response: botResponse });
        } else {
            return res.status(500).json({ error: '无法获取有效的响应' });
        }
        
    } catch (error) {
        console.error('API调用错误:', error.response ? error.response.data : error.message);
        return res.status(500).json({ 
            error: error.response && error.response.data.error 
                ? error.response.data.error.message 
                : '服务器错误'
        });
    }
});

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`API密钥状态: ${process.env.GEMINI_API_KEY ? '已设置' : '未设置'}`);
});