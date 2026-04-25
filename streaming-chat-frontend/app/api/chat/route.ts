import { NextResponse } from 'next/server';

// Opt into the Edge runtime for maximum streaming speed and zero cold starts
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON payload from the Brutalist UI
    const body = await req.json();

    // 2. Fetch the secure backend URL from the environment variables
    // In local development, this is http://localhost:8000
    const backendUrl = process.env.FASTAPI_BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { error: "System Error: Backend routing not configured." }, 
        { status: 500 }
      );
    }

    // 3. Open the connection to the Python streaming engine
    const response = await fetch(`${backendUrl}/api/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 4. Handle backend crashes gracefully
    if (!response.ok) {
      console.error(`Backend rejected request with status: ${response.status}`);
      return NextResponse.json(
        { error: "AI Engine is currently unreachable." }, 
        { status: response.status }
      );
    }

    // 5. Pipe the raw SSE stream directly back to the client browser
    // This maintains the exact token-by-token speed of your local Llama 3
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error("Edge Proxy Pipeline Error:", error);
    return NextResponse.json(
      { error: "Fatal pipeline failure. Check console logs." }, 
      { status: 500 }
    );
  }
}