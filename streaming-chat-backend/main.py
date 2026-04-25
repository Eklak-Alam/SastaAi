from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from models.schemas import ChatRequest
from services.llm_service import stream_llama_response

# Initialize the app using the title from our config file
app = FastAPI(title=settings.project_name)

# CORS prevents the browser from blocking requests from our frontend.
# Since frontend is usually on port 3000, we must allow it to talk to backend on port 8000.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change "*" to "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This is the endpoint Next.js will call.
# It expects a POST request matching our ChatRequest schema.
@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    
    # 1. We take the Pydantic models from the frontend
    # 2. We convert them into standard Python dictionaries
    # 3. We pass them to Ollama
    formatted_messages = [
        {"role": msg.role, "content": msg.content} 
        for msg in request.messages
    ]
    
    # StreamingResponse is a special FastAPI class.
    # It takes our generator function and keeps the HTTP connection open.
    # The media_type tells the browser to expect a continuous stream of events.
    return StreamingResponse(
        stream_llama_response(formatted_messages),
        media_type="text/event-stream"
    )