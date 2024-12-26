AudioVisualizer component:

To visualize audio from both microphone and 11labs:

1. Pass these props to AudioVisualizer:
- microphoneStream: MediaStream from microphone input
- conversation: Conversation instance from useConversation hook

2. Inside AudioVisualizer, use these methods to get frequency data:
- conversation.getInputByteFrequencyData() - for microphone visualization 
- conversation.getOutputByteFrequencyData() - for 11labs audio visualization

Both methods return Uint8Arrays containing frequency data that can be used for visualization.






ELEVENLABS DOCS FOR CONVERSATION:

First, initialize the Conversation instance:

const conversation = await Conversation.startSession(options);
This will kick off the websocket connection and start using microphone to communicate with the ElevenLabs Conversational AI agent. Consider explaining and allowing microphone access in your apps UI before the Conversation kicks off:

// call after explaning to the user why the microphone access is needed
await navigator.mediaDevices.getUserMedia();
Session configuration
The options passed to startSession specifiy how the session is established. There are two ways to start a session:

Using Agent ID
Agent ID can be acquired through ElevenLabs UI. For public agents, you can use the ID directly:

const conversation = await Conversation.startSession({
  agentId: "<your-agent-id>",
});
Using a signed URL
If the conversation requires authorization, you will need to add a dedicated endpoint to your server that will request a signed url using the ElevenLabs API and pass it back to the client.

Here’s an example of how it could be set up:

// Node.js server

app.get("/signed-url", yourAuthMiddleware, async (req, res) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${process.env.AGENT_ID}`,
    {
      method: "GET",
      headers: {
        // Requesting a signed url requires your ElevenLabs API key
        // Do NOT expose your API key to the client!
        "xi-api-key": process.env.XI_API_KEY,
      },
    }
  );

  if (!response.ok) {
    return res.status(500).send("Failed to get signed URL");
  }

  const body = await response.json();
  res.send(body.signed_url);
});
// Client

const response = await fetch("/signed-url", yourAuthHeaders);
const signedUrl = await response.text();

const conversation = await Conversation.startSession({ signedUrl });
Optional callbacks
The options passed to startSession can also be used to register optional callbacks:

onConnect - handler called when the conversation websocket connection is established.
onDisconnect - handler called when the conversation websocket connection is ended.
onMessage - handler called when a new text message is received. These can be tentative or final transcriptions of user voice, replies produced by LLM. Primarily used for handling conversation transcription.
onError - handler called when an error is encountered.
onStatusChange - handler called whenever connection status changes. Can be connected, connecting and disconnected (initial).
onModeChange - handler called when a status changes, eg. agent switches from speaking to listening, or the other way around.
Return value
startSession returns a Conversation instance that can be used to control the session. The method will throw an error if the session cannot be established. This can happen if the user denies microphone access, or if the websocket connection fails.


await conversation.endSession();
getId
A method returning the conversation ID.

const id = conversation.geId();
setVolume
A method to set the output volume of the conversation. Accepts object with volume field between 0 and 1.

await conversation.setVolume({ volume: 0.5 });
getInputVolume / getOutputVolume
Methods that return the current input/output volume on a scale from 0 to 1 where 0 is -100 dB and 1 is -30 dB.

const inputVolume = await conversation.getInputVolume();
const outputVolume = await conversation.getOutputVolume();
getInputByteFrequencyData / getOutputByteFrequencyData
Methods that return Uint8Arrays containg the current input/output frequency data. See AnalyserNode.getByteFrequencyData for more information.

API Reference
WebSocket
Create real-time, interactive voice conversations with AI agents

This documentation is for developers integrating directly with the ElevenLabs WebSocket API. For convenience, consider using the official SDKs provided by ElevenLabs.

The ElevenLabs Conversational AI WebSocket API enables real-time, interactive voice conversations with AI agents. By establishing a WebSocket connection, you can send audio input and receive audio responses in real-time, creating life-like conversational experiences.

Endpoint: wss://api.elevenlabs.io/v1/convai/conversation?agent_id={agent_id}

​
Authentication
​
Using Agent ID
For public agents, you can directly use the agent_id in the WebSocket URL without additional authentication:


wss://api.elevenlabs.io/v1/convai/conversation?agent_id=<your-agent-id>
​
Using a Signed URL
For private agents or conversations requiring authorization, obtain a signed URL from your server, which securely communicates with the ElevenLabs API using your API key.

​
Example using cURL
Request:


curl -X GET "https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=<your-agent-id>" \
     -H "xi-api-key: <your-api-key>"
Response:


{
  "signed_url": "wss://api.elevenlabs.io/v1/convai/conversation?agent_id=<your-agent-id>&token=<token>"
}
Never expose your ElevenLabs API key on the client side.
​
Communication
​
Client-to-Server Messages
​
User Audio Chunk
Send audio data from the user to the server.

Format:


{
  "user_audio_chunk": "<base64-encoded-audio-data>"
}
Notes:

Audio Format Requirements:

PCM 16-bit mono format
Base64 encoded
Sample rate of 16,000 Hz
Recommended Chunk Duration:

Send audio chunks approximately every 250 milliseconds (0.25 seconds)
This equates to chunks of about 4,000 samples at a 16,000 Hz sample rate
Optimizing Latency and Efficiency:

Balance Latency and Efficiency: Sending audio chunks every 250 milliseconds offers a good trade-off between responsiveness and network overhead.
Adjust Based on Needs:
Lower Latency Requirements: Decrease the chunk duration to send smaller chunks more frequently.
Higher Efficiency Requirements: Increase the chunk duration to send larger chunks less frequently.
Network Conditions: Adapt the chunk size if you experience network constraints or variability.
​
Pong Message
Respond to server ping messages by sending a pong message, ensuring the event_id matches the one received in the ping message.

Format:


{
  "type": "pong",
  "event_id": 12345
}
​
Server-to-Client Messages
​
conversation_initiation_metadata
Provides initial metadata about the conversation.

Format:


{
  "type": "conversation_initiation_metadata",
  "conversation_initiation_metadata_event": {
    "conversation_id": "conv_123456789",
    "agent_output_audio_format": "pcm_16000"
  }
}
​
Other Server-to-Client Messages
Type	Purpose
user_transcript	Transcriptions of the user’s speech
agent_response	Agent’s textual response
audio	Chunks of the agent’s audio response
interruption	Indicates that the agent’s response was interrupted
ping	Server pings to measure latency
Message Formats
user_transcript:


{
  "type": "user_transcript",
  "user_transcription_event": {
    "user_transcript": "Hello, how are you today?"
  }
}
agent_response:


{
  "type": "agent_response",
  "agent_response_event": {
    "agent_response": "Hello! I'm doing well, thank you for asking. How can I assist you today?"
  }
}
audio:


{
  "type": "audio",
  "audio_event": {
    "audio_base_64": "SGVsbG8sIHRoaXMgaXMgYSBzYW1wbGUgYXVkaW8gY2h1bms=",
    "event_id": 67890
  }
}
interruption:


{
  "type": "interruption",
  "interruption_event": {
    "event_id": 54321
  }
}
internal_tentative_agent_response:


{
  "type": "internal_tentative_agent_response",
  "tentative_agent_response_internal_event": {
    "tentative_agent_response": "I'm thinking about how to respond..."
  }
}
ping:


{
  "type": "ping",
  "ping_event": {
    "event_id": 13579,
    "ping_ms": 50
  }
}
​
Latency Management
To ensure smooth conversations, implement these strategies:

Adaptive Buffering: Adjust audio buffering based on network conditions.
Jitter Buffer: Implement a jitter buffer to smooth out variations in packet arrival times.
Ping-Pong Monitoring: Use ping and pong events to measure round-trip time and adjust accordingly.
​
Security Best Practices
Rotate API keys regularly and use environment variables to store them.
Implement rate limiting to prevent abuse.
Clearly explain the intention when prompting users for microphone access.
Optimized Chunking: Tweak the audio chunk duration to balance latency and efficiency.



old working conversation.tsx file:
'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { Message, IncomingMessage, Role } from '../types/conversation';
import { useConversation } from '@11labs/react';
import { ConversationControls } from './ConversationControls';
import { ConversationStatus } from './ConversationStatus';
import { MessageList } from './MessageList';
import { AudioVisualizer } from './AudioVisualizer';

interface ConversationOptions {
  agentId: string;
  audioStream?: MediaStream;
}

export function Conversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
    },
    onDisconnect: () => {
      console.log('Disconnected');
      setMicrophoneStream(null);
    },
    onMessage: (message: IncomingMessage) => {
      console.log('Received message:', message);
      setMessages(prev => [...prev, {
        text: message.message || message.text || '',
        sender: (message.role || message.source || 'agent') as Role,
        timestamp: new Date()
      }]);
    },
    onError: (error: string) => {
      console.error('Error:', error);
    },
    onAudioStream: (stream: MediaStream) => {
      console.log('Received audio stream');
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
        audioRef.current.play().catch(console.error);
      }
    }
  });

  const startConversation = useCallback(async () => {
    try {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
      }
      
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneStream(micStream);
      
      const options: ConversationOptions = {
        agentId: '5MXOKiURgOvOvsm4BvL3',
        audioStream: micStream
      };
      
      await conversation.startSession(options);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        setMicrophoneStream(null);
      }
    }
  }, [conversation, microphoneStream]);

  const stopConversation = useCallback(async () => {
    if (microphoneStream) {
      microphoneStream.getTracks().forEach(track => track.stop());
      setMicrophoneStream(null);
    }
    await conversation.endSession();
  }, [conversation, microphoneStream]);

  useEffect(() => {
    return () => {
      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      <ConversationControls 
        onStart={startConversation}
        onStop={stopConversation}
        isConnected={conversation.status === 'connected'}
      />
      
      <ConversationStatus 
        status={conversation.status}
        isSpeaking={conversation.isSpeaking}
      />
      
      <MessageList messages={messages} />
      
      <AudioVisualizer 
        isListening={conversation.status === 'connected'} 
        isSpeaking={conversation.isSpeaking}
        microphoneStream={microphoneStream}
        conversation={conversation}
      />
      
      <audio ref={audioRef} autoPlay playsInline className="hidden" />
    </div>
  );
}

use from here 