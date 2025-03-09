# OpenAI Chat Application

A Next.js web application that allows you to chat with OpenAI language models. The application always responds in Japanese regardless of the input language.

## Features

- Clean, modern UI with Tailwind CSS
- Real-time chat interface
- Support for all OpenAI GPT models
- Japanese language responses for all queries
- Responsive design for desktop and mobile
- Fallback to simulated responses when API key is not configured

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vxfactor/web-chat.git
cd web-chat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How it Works

The application sends user messages to the OpenAI API and displays the responses in Japanese. It instructs the AI to always respond in Japanese, regardless of the language you use for your questions. This is achieved by modifying the system prompt that gets sent to the OpenAI API.

The app supports all the major OpenAI models, including:

- GPT-3.5 Turbo
- GPT-3.5 Turbo (16K context)
- GPT-4
- GPT-4 Turbo
- GPT-4 (32K context)

If an OpenAI API key is not provided in the `.env.local` file, the application will fall back to simulated responses in Japanese.

## Project Structure

- `app/`: Next.js app directory
  - `api/`: API routes for communicating with OpenAI
  - `page.tsx`: Main chat interface component
  - `layout.tsx`: Root layout
- `components/`: React components
  - `ChatWindow.tsx`: Displays chat messages
  - `ChatInput.tsx`: Message input and send button
  - `ModelSelector.tsx`: Dropdown to select OpenAI models

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

## License

This project is licensed under the MIT License.