"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/utils/cn";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type ChatRole = "user" | "assistant" | "system";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  isError?: boolean;
};

type ConnectionStatus = "connecting" | "connected" | "disconnected";

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildWsUrl() {
  // Prefer explicit configuration when the backend is on a different host/port.
  const envUrl = process.env.NEXT_PUBLIC_CHAT_WS_URL;
  if (envUrl && envUrl.trim()) return envUrl.trim();

  if (typeof window === "undefined") return "";
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  return `${proto}://${window.location.host}/ws/chat`;
}

function coerceIncomingMessage(data: unknown): string {
  if (typeof data === "string") return data;

  // Some servers send binary frames.
  if (data instanceof ArrayBuffer) {
    try {
      return new TextDecoder().decode(new Uint8Array(data));
    } catch {
      return "";
    }
  }

  return "";
}

function extractAssistantText(raw: string): { text: string; isError: boolean } {
  const trimmed = raw.trim();
  if (!trimmed) return { text: "", isError: false };

  // Try JSON payloads commonly used by FastAPI chat websockets.
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "string") return { text: parsed, isError: false };

    if (parsed && typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;

      // Check for error responses
      if (obj.type === "error") {
        const code = obj.code as string;
        const message = obj.message as string;
        const details = obj.details as string;

        if (code === "QUOTA_EXCEEDED") {
          return {
            text: `❌ **API Quota Exceeded**\n\n${message}\n\nDetails: ${details}`,
            isError: true,
          };
        } else if (code === "API_ERROR") {
          return {
            text: `❌ **API Error**\n\n${message}\n\nDetails: ${details}`,
            isError: true,
          };
        }
      }

      const candidates = [
        obj.reply,
        obj.content,
        obj.message,
        obj.text,
        obj.data,
        obj.output,
      ];

      for (const value of candidates) {
        if (typeof value === "string" && value.trim())
          return { text: value, isError: false };
      }

      // If backend sends something like { type: "chunk", delta: "..." }
      const delta = obj.delta;
      if (typeof delta === "string" && delta.trim())
        return { text: delta, isError: false };
    }
  } catch {
    // fall back to raw text
  }

  return { text: trimmed, isError: false };
}

export function ChatInterface({
  className,
  fontClassName,
  title = "Chat",
}: {
  className?: string;
  fontClassName?: string;
  title?: string;
}) {
  const wsUrl = useMemo(() => buildWsUrl(), []);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const reconnectAttemptRef = useRef(0);

  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nowId(),
      role: "system",
      content:
        "Ask anything about my projects, experience, or anything else you'd like to know!",
      createdAt: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isWsOpen = wsRef.current?.readyState === WebSocket.OPEN;

  const scheduleReconnect = () => {
    if (reconnectTimerRef.current)
      window.clearTimeout(reconnectTimerRef.current);
    const attempt = reconnectAttemptRef.current;
    const delayMs = Math.min(10_000, 500 * Math.pow(2, attempt));
    reconnectAttemptRef.current = attempt + 1;
    reconnectTimerRef.current = window.setTimeout(() => {
      connect();
    }, delayMs);
  };

  const connect = () => {
    if (!wsUrl) {
      setStatus("disconnected");
      return;
    }

    try {
      setStatus("connecting");

      if (wsRef.current) {
        try {
          wsRef.current.onopen = null;
          wsRef.current.onmessage = null;
          wsRef.current.onclose = null;
          wsRef.current.onerror = null;
          wsRef.current.close();
        } catch {
          // ignore
        }
      }

      const ws = new WebSocket(wsUrl);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttemptRef.current = 0;
        setStatus("connected");
      };

      ws.onmessage = (evt) => {
        const raw = coerceIncomingMessage(evt.data);
        const { text, isError } = extractAssistantText(raw);
        if (!text) return;

        // If backend streams chunks, we try to append into the last assistant message.
        setMessages((prev) => {
          const last = prev[prev.length - 1];

          // For errors, always create a new message (don't append)
          if (isError) {
            const newId = nowId();
            return [
              ...prev,
              {
                id: newId,
                role: "system",
                content: text,
                createdAt: Date.now(),
                isError: true,
              },
            ];
          }

          if (last && last.role === "assistant" && !last.isError) {
            const next = prev.slice();
            next[prev.length - 1] = {
              ...last,
              content: `${last.content}${text}`,
            };
            return next;
          }

          const newId = nowId();
          return [
            ...prev,
            {
              id: newId,
              role: "assistant",
              content: text,
              createdAt: Date.now(),
            },
          ];
        });
      };

      ws.onerror = () => {
        // Let onclose handle reconnect.
        try {
          ws.close();
        } catch {
          // ignore
        }
      };

      ws.onclose = () => {
        setStatus("disconnected");
        scheduleReconnect();
      };
    } catch {
      setStatus("disconnected");
      scheduleReconnect();
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimerRef.current)
        window.clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          // ignore
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsUrl]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: nowId(), role: "user", content: text, createdAt: Date.now() },
    ]);

    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      // Attempt reconnect and show a lightweight system note.
      setMessages((prev) => [
        ...prev,
        {
          id: nowId(),
          role: "system",
          content: "Not connected yet — reconnecting…",
          createdAt: Date.now(),
        },
      ]);
      connect();
      return;
    }

    // Default payload: JSON with a `message` field (common FastAPI patterns).
    // If your backend expects plain text frames, change this to `ws.send(text)`.
    ws.send(JSON.stringify({ message: text }));
  };

  const statusLabel =
    status === "connected"
      ? "Connected"
      : status === "connecting"
      ? "Connecting"
      : "Disconnected";

  return (
    <div
      className={cn(
        "rounded-2xl w-full overflow-hidden bg-black border border-transparent dark:border-white/[0.2] relative",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className={cn(
                "text-[#ddd] font-bold tracking-wide",
                fontClassName
              )}
            >
              {title}
            </div>
            <div className={cn("mt-1 text-sm text-zinc-400", fontClassName)}>
              WebSocket: <span className="text-[#ddd]">/ws/chat</span> •{" "}
              {statusLabel}
            </div>
          </div>

          <HoverBorderGradient
            as="button"
            containerClassName="rounded-full"
            className={cn(
              "dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2",
              fontClassName
            )}
            onClick={() => connect()}
            aria-label="Reconnect"
          >
            <span>Reconnect</span>
          </HoverBorderGradient>
        </div>

        <div
          ref={scrollRef}
          className={cn(
            "mt-6 h-[360px] overflow-y-auto rounded-2xl border border-white/[0.08] bg-black/30 p-4",
            "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          )}
        >
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const isSystem = m.role === "system";
              const isError = m.isError;

              return (
                <div
                  key={m.id}
                  className={cn(
                    "w-full flex",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 border",
                      isError
                        ? "bg-red-950/30 border-red-500/30"
                        : isSystem
                        ? "bg-black/20 border-white/[0.08]"
                        : isUser
                        ? "bg-black border-white/[0.16]"
                        : "bg-black/40 border-white/[0.12]"
                    )}
                  >
                    <div
                      className={cn(
                        "prose prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:bg-black/60 prose-pre:text-xs",
                        "text-sm leading-relaxed max-w-none",
                        isSystem ? "text-zinc-400" : "text-[#ddd]",
                        fontClassName
                      )}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            placeholder={isWsOpen ? "Type a message…" : "Connecting…"}
            className={cn(
              "flex-1 rounded-full bg-black/30 border border-white/[0.12] px-4 py-3 text-[#ddd] outline-none",
              "placeholder:text-zinc-500 focus:border-white/[0.22]",
              fontClassName
            )}
          />

          <HoverBorderGradient
            as="button"
            containerClassName="rounded-full"
            className={cn(
              "dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2",
              fontClassName
            )}
            onClick={() => send()}
            aria-label="Send"
          >
            <span>Send</span>
          </HoverBorderGradient>
        </div>

        {!process.env.NEXT_PUBLIC_CHAT_WS_URL && (
          <div className={cn("mt-3 text-xs text-zinc-500", fontClassName)}>
            Tip: If your FastAPI backend isn’t served from the same host as this
            site, set
            <span className="text-[#ddd]"> NEXT_PUBLIC_CHAT_WS_URL</span> (e.g.
            <span className="text-[#ddd]"> ws://localhost:8000/ws/chat</span>).
          </div>
        )}
      </div>
    </div>
  );
}
