# Langgraph-Multi-Agent-HITL-Form

A demonstration project showcasing Langgraph's capabilities for Multi-Agent Collaboration (Swarm-Agents) and Human In The Loop (HITL) interactions.



https://github.com/user-attachments/assets/ae7a3f6f-8adb-45ef-8482-24f60cb57568



## Overview

Langgraph-Multi-Agent-HITL-Form demonstrates how AI agents can interact with humans through form-based data collection. This project provides a clean, user-friendly interface for conversational AI that can pause to request structured information from users when needed. It showcases an elegant approach to handling complex or sensitive data input requirements in AI workflows.

## Why HITL Forms?

Traditional AI assistants gather information through conversational back-and-forth, which can be inefficient when:

- Tools require numerous parameters (e.g., creating issue tickets, registration processes)
- Sensitive data needs to be collected in a structured format
- Complex data entry would be error-prone through conversation alone

This demo shows how Langgraph can interrupt the conversational flow to present structured forms to users, collecting precise data needed for tool execution, then resuming the AI workflow once data is provided.

## Features

- 🤖 Multi-Agent Collaboration with Langgraph's Swarm-Agents
- 🧠 Human In The Loop (HITL) capabilities with structured form interrupts
- 🚀 Real-time streaming AI responses
- 📝 Form-based data collection for complex tool parameters
- 💬 Clean chat interface with resumable conversations after form submission
- ⚙️ Configurable backend connection settings
- 📱 Fully responsive design optimized for both desktop and mobile

## Tech Stack

### Frontend
- **Next.js & React** - Modern web framework with TypeScript support
- **Tailwind CSS** - Utility-first styling with shadcn/ui components
- **React Hook Form** - Form handling with Zod validation
- **Langgraph SDK** - To interact with the Langgraph backend

### Backend
- **Langgraph** - For building AI agent workflows with HITL capabilities
- **LangChain** - Core abstractions to support the AI interactions
- **Python 3.11** - Programming language for the backend

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Python 3.11.6
- uv or poetry

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/langgraph-hitl-form.git
cd langgraph-hitl-form
```

### Backend Setup

1. Create and activate a virtual environment
```bash
cd backend
uv venv --python 3.11.6
source .venv/bin/activate
```

2. Install the backend dependencies
```bash
uv sync
```

3. Update .env file in the backend folder with the following:
```bash
OPENAI_API_KEY=your_openai_api_key
```
You can use other providers as well. Follow the langchain documentation to set up other providers.

1. Start the backend server
```bash
langgraph dev
```

### Frontend Setup

1. Install the frontend dependencies
```bash
cd frontend
npm install
```

2. Start the frontend development server
```bash
npm run dev
```

## Usage Examples

### When to Use HITL Forms

✅ **Beneficial Use Cases:**
- Creating issue tickets with multiple fields
- User registration processes
- Form-based data collection workflows
- Protecting sensitive information with structured input
- Any tool requiring numerous parameters

❌ **Less Beneficial Use Cases:**
- Simple tools with 1-2 parameters
- Non-sensitive data that's easy to extract from conversation
- Scenarios where conversational flow shouldn't be interrupted

### How It Works

1. The AI agent determines it needs additional information to complete a task
2. The agent pauses the conversation and presents a structured form
3. The user fills out the form with the required information
4. Upon submission, the agent receives the structured data and continues processing
5. The conversation resumes with the agent using the collected information

## Configuration

The application can be configured to connect to a Langgraph server:

1. Click the "Settings" button in the upper right corner of the chat interface
2. Enter your Langgraph server URL (default: http://localhost:2024)
3. Specify the assistant ID (default: agent)
4. Save the configuration

The settings will be stored in localStorage and persist across sessions.

