from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # This points to your local Ollama default port
    ollama_base_url: str = "http://localhost:11434"
    
    # Define the model here so we only have to change it in one place
    model_name: str = "llama3"
    
    # Project name for the API documentation
    project_name: str = "Streaming Llama 3 API"

    class Config:
        # Tells Pydantic to read variables from a .env file if it exists
        env_file = ".env"

# Create a global settings object to import into other files
settings = Settings()