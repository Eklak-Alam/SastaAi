# Sasta AI

A high-performance, low-latency conversational interface engineered for local LLM orchestration. This platform utilizes Server-Sent Events (SSE) and an Edge proxy architecture to stream tokens in real-time from a local Llama 3 model directly to a highly polished Next.js frontend.

## System Architecture
12345
This repository is structured as a monorepo containing two decoupled microservices:

* **AI Engine (Backend):** A highly concurrent FastAPI server that interfaces with Ollama. It wraps the local LLM generation process and yields formatted SSE chunks.
* **Operator Interface (Frontend):** A Next.js application utilizing the Edge Runtime. It acts as a secure proxy, bypassing browser CORS constraints and piping the raw binary stream directly to a custom React hook.

## Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, React Markdown
* **Backend:** Python, FastAPI, Uvicorn, Pydantic
* **AI Layer:** Ollama (Llama 3 / Phi-3)

## Core Features

* **Zero-Latency Streaming:** Implements the native browser `ReadableStream` API to decode and render text chunk by chunk as it generates.
* **Smart Scroll Intelligence:** Automatically pins the chat to the bottom during active generation but gracefully releases control if the operator scrolls up to review history.
* **Premium UI/UX:** Features glassmorphism, dynamic LED gradient borders, smooth Framer Motion spring animations, and state-aware toast notifications.
* **Secure Proxy Routing:** Hides all backend infrastructure and endpoints from the client browser.

## Local Initialization

You will need three separate terminal windows to run this stack concurrently.

### Prerequisites

* Node.js (v18+)
* Python (3.10+)
* [Ollama](https://ollama.com/) installed locally

### 1. Boot the AI Core

Ensure your local model is running in the background.

```bash
ollama run llama3:instruct
```

*(Note: If you encounter CUDA memory limits, substitute `llama3` with a lighter model like `phi3`)*

### 2. Boot the FastAPI Backend

Open a new terminal and navigate to the backend directory.

```bash
cd streaming-chat-backend

# Initialize and activate the virtual environment
python -m venv venv
# Mac/Linux: source venv/bin/activate
# Windows: venv\Scripts\activate

# Install dependencies and start the server
pip install fastapi uvicorn pydantic pydantic-settings ollama
uvicorn main:app --reload
```

### 3. Boot the Next.js Frontend

Open a third terminal and navigate to the frontend directory.

```bash
cd streaming-chat-frontend

# Install dependencies and start the Edge server
npm install
npm run dev
```

Navigate to `http://localhost:3000` to interact with the platform.
