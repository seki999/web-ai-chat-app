# web-ai-chat-app

一个基于 AI API 的聊天应用，前端使用 HTML/CSS/JavaScript 实现，后端使用 Node.js 和 Express 框架。

## 特点

-   **前后端分离架构:** 前端和后端代码分离，独立运行，便于维护和扩展。
-   **API 密钥安全存储在后端:** API 密钥存储在后端环境变量中，前端无法直接访问，提高了安全性。
-   **实时聊天界面:** 用户可以在网页上实时与 AI 进行对话。
-   **优雅的错误处理:** 前端实现了良好的错误处理机制，可以向用户显示友好的错误信息。
-   **本地持久化聊天记录:** 使用浏览器的 `localStorage` 存储聊天记录，即使关闭浏览器、重启电脑，重新打开也能看到之前的聊天内容。
-   **Markdown 支持:** 支持 Markdown 语法，包括代码块的渲染显示，使 AI 的回复更清晰易读。

## 安装与设置

### 前提条件

-   Node.js (>=14.x)
-   npm 或 yarn
-   AI API 密钥 (例如 Gemini API 密钥)

### 安装步骤

1.  克隆仓库或下载项目文件。
2.  安装依赖：

    ```bash
    npm install
    ```

3.  在环境变量中设置 `GEMINI_API_KEY`：

    ```bash
    export GEMINI_API_KEY="YOUR_API_KEY"
    ```

    **注意:** 将 `"YOUR_API_KEY"` 替换为你实际的 Gemini API 密钥。

    ### How to get Gemini API key

    [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

4.  启动服务器：

    ```bash
    npm start
    ```

5.  访问应用：

    打开浏览器并访问 `http://localhost:3000`

## 项目结构

```
web-ai-chat-app/
│
├── public/                # 静态文件目录
│   └── index.html         # 前端页面
├── .gitignore             # Git忽略文件
├── package.json           # 项目依赖配置
├── package-lock.json      # 锁定依赖版本
└── server.js              # 后端服务器代码
```


## 使用说明

1.  打开应用后，你会看到一个聊天界面。
2.  在底部输入框中输入你的问题。
3.  点击"发送"按钮或按 Enter 键发送消息。
4.  等待 AI 的回复。

## 本地聊天记录持久化 (localStorage)

该应用使用浏览器的 `localStorage` 来实现聊天记录的本地持久化存储。这意味着：

-   **数据持久性:** 即使关闭浏览器、重启电脑，聊天记录也不会丢失。下次打开应用时，仍然可以看到之前的聊天内容。
-   **无需登录:** 由于数据存储在本地，无需用户登录即可查看历史记录。
-   **与服务器无关:** 聊天记录存储在用户的浏览器中，与服务器的状态无关。即使服务器重启，聊天记录仍然存在。

### 工作原理

1.  **数据存储位置:**

    *   聊天记录以键值对的形式存储在浏览器的 `localStorage` 中。
    *   **键名:** `chatHistory`，这是在 `public/index.html` 中定义的常量。
    *   **键值:** 一个 JSON 字符串，内容是一个包含聊天记录的数组。数组中每个元素是一个对象，包含 `content` (消息内容) 和 `sender` (发送者，user 或 bot)。
    *   **存储位置：**
        *   **Chrome/Edge:** 开发者工具 -> Application -> Storage -> Local Storage -> `http://localhost:3000`
        *   **Firefox:** 开发者工具 -> Storage -> Local Storage -> `http://localhost:3000`
        *   **Safari:** 开发 -> 显示网页检查器 -> 存储 -> 本地存储 -> `http://localhost:3000`
    *   **数据结构:** 数据会保存成这样的 JSON 格式：

        ```json
        [
            {
                "content": "你好",
                "sender": "user"
            },
            {
                "content": "你好！很高兴与你聊天。",
                "sender": "bot"
            },
            {
                "content": "How are you?",
                "sender": "user"
            },
            {
                "content": "I am doing well, thank you for asking. How about you?",
                "sender": "bot"
            }
        ]
        ```

2.  **保存机制:**

    *   每当用户发送一条消息或收到 AI 的回复时，都会触发 `saveMessageToLocalStorage(message, sender)` 函数。
    *   该函数会：
        *   从 `localStorage` 中获取现有的聊天记录（如果有的话）。
        *   将新的消息添加到聊天记录中。
        *   将更新后的聊天记录重新保存到 `localStorage`。
    *   **调用位置:**
        *   **发送消息时:** `sendMessage()` 函数中调用了 `saveMessageToLocalStorage(message, 'user')`
        *   **AI 回复时:** `addMessage()` 函数中调用了 `saveMessageToLocalStorage(content, 'bot')`

3.  **加载机制:**

    *   当页面加载时，`loadChatHistory()` 函数会被立即调用。
    *   该函数会：
        *   从 `localStorage` 中获取聊天记录。
        *   如果 `localStorage` 中存在聊天记录，则遍历每条记录并显示在聊天界面上。
        *   如果 `localStorage` 中没有数据, 不会显示历史记录。

4.  **操作系统和浏览器相关性:**

    *   `localStorage` 是浏览器提供的功能，与操作系统无关。这意味着无论用户使用 Windows、macOS 还是 Linux，只要使用相同的浏览器访问应用，聊天记录都会被正确地保存和加载。
    *   不同的浏览器之间，`localStorage` 数据是隔离的，互不干扰。这意味着如果用户在 Chrome 中访问并聊天，然后在 Firefox 中访问，他们的聊天记录在两个浏览器中是独立的。

### 清除聊天记录

有两种方法可以清除聊天记录：

1.  **通过浏览器手动清除:**

    *   用户可以手动清除浏览器的本地存储数据，具体操作因浏览器而异（参考上面的数据存储位置，删除本地数据即可）。
    *   清除浏览器的本地数据会同时清除**所有网站**的 `localStorage` 数据，不仅仅是该应用的聊天记录。

2.  **通过代码清除(测试使用):**

    *   在 `public/index.html` 文件中, 可以取消注释`//localStorage.removeItem('chatHistory')` 这行代码。
    *   然后在刷新或者重新打开网页的时候，就会清除。然后把它注释掉。
    *   This way can only be used for testing.

### 注意事项

-   **容量限制:** `localStorage` 的存储容量有限（通常为 5MB）。长时间的聊天记录可能会超出这个限制。
-   **安全性:** `localStorage` 存储的数据是明文的，敏感信息不要存放在其中。

## 安全注意事项

-   定期更换 API 密钥。
-   在生产环境中使用 HTTPS。
-   限制 API 请求频率以防止滥用。

## 许可证

MIT

## 3000 端口占用不能使用的情况

```bash
lsof -i :3000
kill -9 <PID>

