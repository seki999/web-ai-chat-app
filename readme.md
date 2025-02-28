# Gemini 聊天应用

一个基于Gemini API的聊天应用，前端使用HTML/CSS/JavaScript实现，后端使用Node.js和Express框架。

## 特点

- 前后端分离架构
- API密钥安全存储在后端
- 实时聊天界面
- 优雅的错误处理

## 安装与设置

### 前提条件

- Node.js (>=14.x)
- npm 或 yarn
- Gemini API密钥

### 安装步骤

1. 克隆仓库或下载项目文件

2. 安装依赖
```bash
npm install
```
3. 必须在环境变量里面使用，先设置环境变量
export GEMINI_API_KEY="API KEY"

4. 启动服务器
```bash
npm start
```

5. 访问应用
打开浏览器并访问 `http://localhost:3000`

## 项目结构

```
gemini-chat-app/
│
├── public/                # 静态文件目录
│   └── index.html         # 前端页面
├── .gitignore             # Git忽略文件
├── package.json           # 项目依赖配置
├── package-lock.json      # 锁定依赖版本
└── server.js              # 后端服务器代码
```

## 使用说明

1. 打开应用后，你会看到一个聊天界面
2. 在底部输入框中输入你的问题
3. 点击"发送"按钮或按Enter键发送消息
4. 等待AI的回复

## 安全注意事项
- 定期更换加密密钥
- 在生产环境中使用HTTPS
- 限制API请求频率以防止滥用

## 许可证
MIT

## 3000 port占用不能使用的情况
lsof -i :3000
kill -9 <PID>

## How to getGemini API key
https://aistudio.google.com/app/apikey

