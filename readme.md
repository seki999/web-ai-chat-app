# web-ai-chat-app

An AI chat application with a web interface, the front end uses HTML/CSS/JavaScript, and the back end uses the Node.js and Express frameworks.

## Features

-   **Frontend-Backend Separation:** The front-end and back-end code are separated and run independently, which is convenient for maintenance and expansion.
-   **Secure API Key Storage:** The API key is stored in the back-end environment variables, and the front end cannot directly access it, improving security.
-   **Real-time Chat Interface:** Users can chat with AI in real time on the web page.
-   **Elegant Error Handling:** The front end implements a good error handling mechanism, which can display friendly error messages to users.
-   **Local Persistent Chat History:** Use the browser's `localStorage` to store the chat history. Even if the browser is closed or the computer is restarted, you can still see the previous chat content when you reopen it.
-   **Markdown Support:** Supports Markdown syntax, including code block rendering, making AI responses clearer and more readable.

## Installation and Setup

### Prerequisites

-   Node.js (>=14.x)
-   npm or yarn
-   AI API Key (e.g., Gemini API Key)

### Installation Steps

1.  Clone the repository or download the project files.
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set the `GEMINI_API_KEY` in your environment variables:

    ```bash
    export GEMINI_API_KEY="YOUR_API_KEY"
    ```

    **Note:** Replace `"YOUR_API_KEY"` with your actual Gemini API key.

    ### How to get Gemini API key

    [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

4.  Start the server:

    ```bash
    npm start
    ```

5.  Access the application:

    Open your browser and visit `http://localhost:3000`

## Project Structure

```
web-ai-chat-app/
│
├── public/                # Static files directory
│   └── index.html         # Frontend page
├── .gitignore             # Git ignore file
├── package.json           # Project dependency configuration
├── package-lock.json      # package-lock.json
└── server.js              # Backend server code
```



## Usage Instructions

1.  After opening the application, you will see a chat interface.
2.  Enter your question in the input box at the bottom.
3.  Click the "Send" button or press the Enter key to send the message.
4.  Wait for the AI's response.

## Local Chat History Persistence (localStorage)

This application uses the browser's `localStorage` to implement local persistent storage of the chat history. This means:

-   **Data Persistence:** Even if you close the browser or restart your computer, the chat history will not be lost. You can still see the previous chat content when you open the application next time.
-   **No Login Required:** Because the data is stored locally, users can view the history without logging in.
-   **Server-Independent:** The chat history is stored in the user's browser and is independent of the server's state. Even if the server restarts, the chat history will still exist.

### How It Works

1.  **Data Storage Location:**

    *   The chat history is stored in the browser's `localStorage` in key-value pairs.
    *   **Key Name:** `chatHistory`, which is a constant defined in `public/index.html`.
    *   **Key Value:** A JSON string containing an array of chat history records. Each element in the array is an object containing `content` (message content) and `sender` (sender, user, or bot).
    *   **Storage Locations:**
        *   **Chrome/Edge:** Developer Tools -> Application -> Storage -> Local Storage -> `http://localhost:3000`
        *   **Firefox:** Developer Tools -> Storage -> Local Storage -> `http://localhost:3000`
        *   **Safari:** Develop -> Show Web Inspector -> Storage -> Local Storage -> `http://localhost:3000`
    *   **Data Structure:** The data will be saved in this JSON format:

        ```json
        [
            {
                "content": "Hello",
                "sender": "user"
            },
            {
                "content": "Hello! Nice to chat with you.",
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

2.  **Saving Mechanism:**

    *   Whenever a user sends a message or receives a response from the AI, the `saveMessageToLocalStorage(message, sender)` function is triggered.
    *   This function will:
        *   Get the existing chat history from `localStorage` (if any).
        *   Add the new message to the chat history.
        *   Resave the updated chat history to `localStorage`.
    *   **Call Location:**
        *   **Sending a Message:** `saveMessageToLocalStorage(message, 'user')` is called in the `sendMessage()` function.
        *   **AI Response:** `saveMessageToLocalStorage(content, 'bot')` is called in the `addMessage()` function.

3.  **Loading Mechanism:**

    *   When the page loads, the `loadChatHistory()` function is called immediately.
    *   This function will:
        *   Get the chat history from `localStorage`.
        *   If there is chat history in `localStorage`, iterate through each record and display it on the chat interface.
        *  If there is no data in `localStorage`, no history will be displayed.

4.  **Operating System and Browser Dependencies:**

    *   `localStorage` is a feature provided by browsers and is independent of the operating system. This means that whether users use Windows, macOS, or Linux, as long as they access the application with the same browser, the chat history will be saved and loaded correctly.
    *   `localStorage` data is isolated between different browsers and does not interfere with each other. This means that if a user visits and chats in Chrome, and then visits in Firefox, their chat history will be separate in the two browsers.

### Clearing the Chat History

There are three ways to clear the chat history:

1.  **Clear with in-app button (Recommended):**

    *   On the chat interface, you can click the "Clear History" button to clear the current application's chat history.
    *   After clicking, the chat history will be immediately deleted, and the page will automatically refresh to display an empty chat interface.

2.  **Manual Clearing in the Browser:**

    *   Users can manually clear the browser's local storage data. The specific steps vary depending on the browser (refer to the storage locations above and delete the local data).
    *   Clearing the browser's local data will clear the `localStorage` data of **all websites**, not just this application's chat history.

3.  **Clearing with code (For testing):**

    *   In the `public/index.html` file, you can uncomment the line `//localStorage.removeItem('chatHistory')`.
    *   Then, when you refresh or reopen the web page, it will clear the data. After the test, comment it out again.
    *   This way can only be used for testing.

### Precautions

-   **Capacity Limit:** `localStorage` has a limited storage capacity (usually 5MB). Long-term chat histories may exceed this limit.
-   **Security:** The data stored in `localStorage` is in plain text. Do not store sensitive information in it.

## Security Precautions

-   Regularly replace the API key.
-   Use HTTPS in a production environment.
-   Limit API request frequency to prevent abuse.

## License

MIT

## What to do if 3000 port is occupied

```bash
lsof -i :3000
kill -9 <PID>
