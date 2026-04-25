import json
from ollama import AsyncClient
from core.config import settings

async def stream_llama_response(messages: list):
    # Initialize the client inside the function
    client = AsyncClient(host=settings.ollama_base_url)
    
    try:
        # We start the chat request and tell it to stream tokens one by one
        response = await client.chat(
            model=settings.model_name,
            messages=messages,
            stream=True
        )
        
        # 'async for' listens continuously as Ollama generates tokens
        async for chunk in response:
            # Extract the raw text piece from the Ollama response dictionary
            content = chunk.get('message', {}).get('content', '')
            
            if content:
                # We package the text into a JSON format. 
                # This makes it safe to send special characters over the network.
                data = json.dumps({"text": content})
                
                # Yield sends this chunk to the frontend immediately.
                # SSE strict format requires 'data: <your_json>\n\n'
                yield f"data: {data}\n\n"
                
    except Exception as e:
        # If the local Ollama crashes or disconnects, we send an error message to the UI
        error_data = json.dumps({"error": f"LLM Connection failed: {str(e)}"})
        yield f"data: {error_data}\n\n"