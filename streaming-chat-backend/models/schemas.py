from pydantic import BaseModel, Field
from typing import List

# Defines a single message in the chat history
class Message(BaseModel):
    # 'role' must be either 'user' or 'assistant'
    role: str = Field(..., description="The sender of the message: 'user' or 'assistant'")
    
    # The actual text the user typed or the AI generated
    content: str = Field(..., description="The text content of the message")

# Defines the exact JSON payload the Next.js frontend will send us
class ChatRequest(BaseModel):
    # It expects a list of the Message objects we defined above
    messages: List[Message] = Field(..., description="The full conversation history")