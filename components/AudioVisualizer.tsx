'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AudioVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  microphoneStream: MediaStream | null;
  conversation: {
    getOutputByteFrequencyData?: () => Uint8Array;
    getOutputVolume?: () => number;
  };
}

export function AudioVisualizer({ 
  isListening, 
  isSpeaking, 
  microphoneStream,
  conversation 
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();
  
  const animate = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    let dataArray: Uint8Array;
    let averageLevel = 0;

    if (isSpeaking && conversation.getOutputByteFrequencyData && conversation.getOutputVolume) {
      const frequencyData = conversation.getOutputByteFrequencyData();
      dataArray = frequencyData;
      averageLevel = conversation.getOutputVolume();
    } else if (analyserRef.current) {
      dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      averageLevel = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length / 255;
    } else {
      dataArray = new Uint8Array(32);
    }

    ctx.clearRect(0, 0, width, height);

    // Draw circular visualizer
    const barCount = 32;
    const barWidth = 4;
    const barSpacing = 2;
    const maxBarHeight = radius * 0.8;

    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const value = dataArray[i % dataArray.length] / 255.0;
      const barHeight = maxBarHeight * value;

      ctx.save();
      ctx.rotate(angle);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, barHeight);
      if (isSpeaking) {
        gradient.addColorStop(0, `rgba(255, 59, 255, ${0.2 + value * 0.8})`);
        gradient.addColorStop(1, `rgba(92, 36, 255, ${0.1 + value * 0.9})`);
      } else {
        gradient.addColorStop(0, `rgba(92, 36, 255, ${0.2 + value * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 59, 255, ${0.1 + value * 0.9})`);
      }

      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(
        -barWidth / 2,
        radius * 0.2,
        barWidth,
        barHeight + Math.sin(Date.now() * 0.01 + i) * 5
      );

      ctx.restore();
    }

    // Add glow effect
    ctx.shadowColor = isSpeaking ? 'rgba(255, 59, 255, 0.5)' : 'rgba(92, 36, 255, 0.5)';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = isSpeaking ? 'rgba(255, 59, 255, 0.2)' : 'rgba(92, 36, 255, 0.2)';
    ctx.fill();

    ctx.restore();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [conversation, isSpeaking]);

  useEffect(() => {
    if (!microphoneStream || !isListening) {
      return;
    }

    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 64;
    sourceRef.current = audioContextRef.current.createMediaStreamSource(microphoneStream);
    sourceRef.current.connect(analyserRef.current);

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [microphoneStream, isListening, animate]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl">
          {isSpeaking ? '🗣️' : isListening ? '👂' : '⌛'}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-full h-full max-w-[200px] max-h-[200px]"
      />
    </div>
  );
}