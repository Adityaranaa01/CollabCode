"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRoomSocket } from "@/hooks/useRoomSocket";
import { roomApi, Room, RoomMember } from "@/lib/api";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TopBar } from "@/components/TopBar";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { ParticipantAvatar } from "@/components/ParticipantAvatar";
import { ChatMessage } from "@/components/ChatMessage";
import Editor, { type OnMount } from "@monaco-editor/react";
import type { editor as monacoEditor } from "monaco-editor";
import {
  FileText,
  Search,
  GitBranch,
  Bug,
  User,
  Send,
  Code2,
  Loader2,
  Check,
  Copy,
  X,
  Clock,
  Trash2,
  LogOut,
} from "lucide-react";

const AVATAR_COLORS = ["purple", "orange", "blue", "emerald"] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function SidebarIcon({
  icon: Icon,
  active,
}: {
  icon: React.FC<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <div className="relative group">
      <Icon
        className={`w-5 h-5 ${
          active ? "text-primary" : "text-slate-600 cursor-default"
        }`}
      />
      {!active && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#1a1a2e] border border-white/10 rounded text-[10px] text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          Coming soon
        </div>
      )}
    </div>
  );
}

export default function RoomClient() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  const { accessToken, user } = useAuth();

  const {
    document,
    version,
    participants,
    messages,
    connectionStatus,
    sendPatch,
    sendMessage,
    sendCursor,
  } = useRoomSocket(roomId);

  const [roomMeta, setRoomMeta] = useState<Room | null>(null);
  const [roomMembers, setRoomMembers] = useState<RoomMember[]>([]);
  const [roomLoading, setRoomLoading] = useState(true);
  const [chatInput, setChatInput] = useState("");

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareExpiry, setShareExpiry] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);
  const remoteUpdateRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accessToken || !roomId) return;

    Promise.all([
      roomApi.getRoom(accessToken, roomId),
      roomApi.getRoomMembers(accessToken, roomId),
    ])
      .then(([room, members]) => {
        setRoomMeta(room);
        setRoomMembers(members);
      })
      .catch(() => {})
      .finally(() => setRoomLoading(false));
  }, [accessToken, roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (connectionStatus !== "error") return;
    const timer = setTimeout(() => router.push("/dashboard"), 1500);
    return () => clearTimeout(timer);
  }, [connectionStatus, router]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const model = editor.getModel();
    if (!model) return;

    if (model.getValue() !== document) {
      remoteUpdateRef.current = true;
      const selections = editor.getSelections();
      model.setValue(document);
      if (selections) editor.setSelections(selections);
    }
  }, [document, version]);

  const handleEditorMount: OnMount = useCallback(
    (editor) => {
      editorRef.current = editor;
      editor.onDidChangeCursorPosition((e) => {
        sendCursor({ line: e.position.lineNumber, ch: e.position.column });
      });
    },
    [sendCursor]
  );

  function handleEditorChange(value: string | undefined) {
    if (value === undefined) return;
    if (remoteUpdateRef.current) {
      remoteUpdateRef.current = false;
      return;
    }
    sendPatch(value);
  }

  function handleSendMessage() {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setChatInput("");
  }

  function handleChatKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  async function handleOpenShare() {
    if (!accessToken || !roomId) return;

    setShowShareModal(true);
    setShareLoading(true);
    setShareError(null);
    setShareCopied(false);
    setShareLink(null);

    try {
      const result = await roomApi.createInvite(accessToken, roomId);
      setShareLink(
        `${window.location.origin}/room/${roomId}?invite=${result.token}`
      );
      setShareExpiry(result.expiresAt);
    } catch {
      setShareError(
        "Failed to generate invite. Only the room owner can create invites."
      );
    } finally {
      setShareLoading(false);
    }
  }

  async function handleCopyLink() {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {}
  }

  async function handleLeaveRoom() {
    setActionLoading(true);
    router.push("/dashboard");
  }

  async function handleDeleteRoom() {
    if (!accessToken || !roomId) return;
    setActionLoading(true);
    try {
      await roomApi.deleteRoom(accessToken, roomId);
      router.push("/dashboard");
    } catch {
      setActionLoading(false);
    }
  }

  if (!roomId) return null;

  const topBarParticipants = participants.slice(0, 3).map((p, i) => ({
    initials: getInitials(p.userId),
    color: getAvatarColor(i),
  }));

  if (participants.length > 3) {
    topBarParticipants.push({
      initials: `+${participants.length - 3}`,
      color: "orange" as const,
    });
  }

  const isConnected = connectionStatus === "connected";
  const isReconnecting = connectionStatus === "reconnecting";
  const isError = connectionStatus === "error";
  const editorLanguage = roomMeta?.language?.toLowerCase() || "plaintext";
  const isOwner = roomMeta?.owner?.id === user?.id;

  return (
    <ProtectedRoute>
      <div className="bg-background-dark font-display text-slate-100 overflow-hidden h-screen flex flex-col">
        <TopBar
          roomName={roomMeta?.name || (roomLoading ? "Loading..." : roomId)}
          showLiveBadge={isConnected}
          participants={topBarParticipants}
          onShare={handleOpenShare}
          onSettings={() => {
            setShowSettingsModal(true);
            setDeleteConfirm(false);
          }}
        />

        {isReconnecting && (
          <div className="h-7 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-center gap-2 text-[11px] text-yellow-400 font-medium">
            <Loader2 className="w-3 h-3 animate-spin" />
            Reconnecting to room...
          </div>
        )}

        <main className="flex-1 flex overflow-hidden">
          {/* Mini Sidebar — intentionally disabled */}
          <aside className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 bg-black/20 backdrop-blur-md z-10">
            <SidebarIcon icon={FileText} active />
            <SidebarIcon icon={Search} />
            <SidebarIcon icon={GitBranch} />
            <SidebarIcon icon={Bug} />
            <div className="mt-auto flex flex-col gap-4">
              <SidebarIcon icon={User} />
            </div>
          </aside>

          {/* Editor Area */}
          <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] opacity-50" />
              <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="flex h-10 border-b border-white/5 bg-black/60 backdrop-blur-md">
              <div className="flex items-center px-4 gap-2 bg-white/5 border-t-2 border-primary text-slate-100 text-xs font-medium cursor-default shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                {roomMeta?.name || "document"}
              </div>
            </div>

            <div className="flex-1 relative">
              {connectionStatus === "connecting" && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="text-xs text-slate-400">
                      Connecting to room...
                    </span>
                  </div>
                </div>
              )}
              {isError && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-sm text-red-400 font-medium">
                      Disconnected
                    </span>
                    <span className="text-xs text-slate-500">
                      Redirecting to dashboard...
                    </span>
                  </div>
                </div>
              )}
              <Editor
                height="100%"
                language={editorLanguage}
                theme="vs-dark"
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                options={{
                  fontSize: 13,
                  lineHeight: 24,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                  renderLineHighlight: "gutter",
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on",
                  readOnly: !isConnected,
                }}
              />
            </div>

            <div className="h-6 border-t border-white/5 bg-[#0d0a16] flex items-center px-3 justify-between text-[10px] text-slate-500 select-none">
              <div className="flex items-center gap-4">
                <span>v{version}</span>
                {isConnected && (
                  <span className="text-emerald-400">Connected</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span>{participants.length} online</span>
              </div>
            </div>
          </section>

          {/* Right Panel */}
          <aside className="w-80 border-l border-white/5 flex flex-col bg-black/60 backdrop-blur-xl z-10">
            {/* Participants */}
            <div className="p-4 border-b border-primary/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Active Participants
                </h3>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 rounded">
                  {participants.length} Total
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {participants.map((p, i) => {
                  const isYou = user?.id === p.userId;
                  const displayName = isYou
                    ? user?.displayName || "You"
                    : `User ${i + 1}`;
                  const initials = isYou
                    ? getInitials(user?.displayName || "You")
                    : `U${i + 1}`;
                  return (
                    <div
                      key={p.userId}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ParticipantAvatar
                          initials={initials}
                          color={getAvatarColor(i)}
                          status="online"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200">
                            {displayName}
                            {isYou ? " (You)" : ""}
                          </span>
                          <span className="text-[9px] text-primary/80">
                            In room
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {participants.length === 0 && (
                  <p className="text-xs text-slate-600">No participants</p>
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-primary/5 flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Room Chat
                </h3>
              </div>
              <div className="flex-1 overflow-auto p-4 flex flex-col gap-4 custom-scrollbar">
                {messages.length === 0 && (
                  <p className="text-xs text-slate-600 text-center mt-4">
                    No messages yet
                  </p>
                )}
                {messages.map((msg) => {
                  const isOwn = msg.userId === user?.id;
                  return (
                    <ChatMessage
                      key={msg.id}
                      sender={isOwn ? "You" : msg.user.displayName}
                      time={formatTime(msg.createdAt)}
                      message={msg.content}
                      isOwn={isOwn}
                      color={isOwn ? "default" : "primary"}
                    />
                  );
                })}
                <div ref={chatEndRef} />
              </div>
              <div className="p-4 bg-background-dark">
                <div className="relative">
                  <input
                    className="w-full bg-slate-800/50 border border-primary/20 rounded-lg py-2 pl-3 pr-10 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-100 placeholder:text-slate-600"
                    placeholder="Type a message..."
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                  />
                  <button
                    className="absolute right-2 top-1.5 text-primary hover:text-primary/80 cursor-pointer"
                    aria-label="Send message"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* Footer — informational only, no misleading interactions */}
        <footer className="h-6 bg-primary/90 backdrop-blur-md flex items-center px-3 justify-between text-[10px] text-white font-medium select-none shadow-[0_-4px_12px_rgba(137,90,246,0.2)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-1">
              <GitBranch className="w-3 h-3" />
              main
            </div>
            <div className="flex items-center gap-1 px-1">
              {participants.length} online
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-1">UTF-8</span>
            <span className="px-1">{roomMeta?.language || "Plaintext"}</span>
          </div>
        </footer>
      </div>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Room"
        footer={
          <Button
            variant="ghost"
            size="md"
            className="text-[11px] font-bold uppercase tracking-wider"
            onClick={() => setShowShareModal(false)}
            ariaLabel="Close share modal"
          >
            Done
          </Button>
        }
      >
        {shareLoading && (
          <div className="flex items-center justify-center py-4 gap-2 text-sm text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating invite link...
          </div>
        )}
        {!shareLoading && shareError && (
          <div className="text-sm text-red-400 text-center py-4">
            {shareError}
          </div>
        )}
        {!shareLoading && shareLink && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Invite Link
              </label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareLink}
                  className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                >
                  {shareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            {shareExpiry && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="w-3 h-3" />
                Expires {formatDate(shareExpiry)}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => {
          setShowSettingsModal(false);
          setDeleteConfirm(false);
        }}
        title="Room Settings"
        footer={
          <Button
            variant="ghost"
            size="md"
            className="text-[11px] font-bold uppercase tracking-wider"
            onClick={() => {
              setShowSettingsModal(false);
              setDeleteConfirm(false);
            }}
            ariaLabel="Close settings"
          >
            Close
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Room Info
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Name</span>
                <span className="text-slate-200 font-medium">
                  {roomMeta?.name || "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Language</span>
                <span className="text-slate-200 font-medium">
                  {roomMeta?.language || "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Created</span>
                <span className="text-slate-200 font-medium">
                  {roomMeta?.createdAt ? formatDate(roomMeta.createdAt) : "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Owner</span>
                <span className="text-slate-200 font-medium">
                  {roomMeta?.owner?.displayName || "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Members</span>
                <span className="text-slate-200 font-medium">
                  {roomMembers.length}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Visibility</span>
                <span className="text-slate-200 font-medium">
                  {roomMeta?.isPublic ? "Public" : "Private"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Actions
            </h4>

            {!isOwner && (
              <Button
                variant="ghost"
                size="md"
                className="w-full !justify-start text-slate-300 hover:text-white"
                onClick={handleLeaveRoom}
                disabled={actionLoading}
                ariaLabel="Leave room"
              >
                <LogOut className="w-4 h-4" />
                Leave Room
              </Button>
            )}

            {isOwner && !deleteConfirm && (
              <>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full !justify-start text-slate-300 hover:text-white"
                  onClick={handleLeaveRoom}
                  disabled={actionLoading}
                  ariaLabel="Leave room"
                >
                  <LogOut className="w-4 h-4" />
                  Leave Room
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full !justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={() => setDeleteConfirm(true)}
                  disabled={actionLoading}
                  ariaLabel="Delete room"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Room
                </Button>
              </>
            )}

            {isOwner && deleteConfirm && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 space-y-3">
                <p className="text-xs text-red-400">
                  This will permanently delete the room and all its data. This
                  action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[11px]"
                    onClick={() => setDeleteConfirm(false)}
                    ariaLabel="Cancel delete"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="!bg-red-500 hover:!bg-red-600 !shadow-none text-[11px]"
                    onClick={handleDeleteRoom}
                    disabled={actionLoading}
                    ariaLabel="Confirm delete room"
                  >
                    {actionLoading ? "Deleting..." : "Delete Forever"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}
