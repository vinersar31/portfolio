"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

// Define the "file system" content
const files: Record<string, React.ReactNode> = {
  "about.txt": (
    <div className="space-y-2">
      <p>i&apos;m a software developer with a strong background in <strong className="text-foreground">C++</strong> and <strong className="text-foreground">ADAS systems</strong>.</p>
      <p>focused on building reliable and performance-critical applications.</p>
      <p>deeply passionate about <strong className="text-foreground">artificial intelligence</strong>, <strong className="text-foreground">machine learning</strong>, and <strong className="text-foreground">embedded systems</strong>.</p>
    </div>
  ),
  "projects.txt": (
    <div className="space-y-2">
      <p>here are some of my recent projects:</p>
      <ul className="list-inside list-disc pl-4 text-primary/80">
        <li>ADAS Perception System (C++)</li>
        <li>Embedded ML Controller (Rust)</li>
        <li>Portfolio Website (Next.js)</li>
      </ul>
      <p>type <span className="text-primary font-bold">cat links.txt</span> to see my github for more.</p>
    </div>
  ),
  "skills.txt": (
    <div className="space-y-2">
      <p><span className="text-green-400">languages:</span> C++, Rust, Python, TypeScript</p>
      <p><span className="text-green-400">technologies:</span> Embedded Systems, ROS, Linux, Machine Learning</p>
    </div>
  ),
  "links.txt": (
    <div className="space-y-2">
      <p>github: <a href="https://github.com/vinersar" target="_blank" className="text-blue-400 hover:underline">github.com/vinersar</a></p>
      <p>linkedin: <a href="https://linkedin.com/in/vinersar" target="_blank" className="text-blue-400 hover:underline">linkedin.com/in/vinersar</a></p>
      <p>email: <a href="mailto:vinersar31@example.com" className="text-blue-400 hover:underline">vinersar31@example.com</a></p>
    </div>
  )
};

const commandsHelp = (
  <div className="space-y-1">
    <p className="mb-2">Available commands:</p>
    <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-1">
      <span className="text-primary font-bold">ls</span><span>list available files</span>
      <span className="text-primary font-bold">cat</span><span>read a file (e.g., <span className="text-primary">cat about.txt</span>)</span>
      <span className="text-primary font-bold">help</span><span>show this help message</span>
      <span className="text-primary font-bold">clear</span><span>clear the terminal screen</span>
      <span className="text-primary font-bold">whoami</span><span>display current user</span>
    </div>
  </div>
);

type HistoryEntry = {
  id: number;
  command: string;
  output: React.ReactNode;
};

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"auto" | "interactive">("auto");
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-typing sequence state
  const sequence = useMemo(() => ["cat about.txt", "cat skills.txt", "cat projects.txt", "cat links.txt"], []);
  const [seqIndex, setSeqIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, input]);

  // Handle clicking anywhere to focus input and enter interactive mode
  const handleTerminalClick = () => {
    if (mode === "auto") {
      setMode("interactive");
      setInput("");
      setHistory([
        {
          id: Date.now(),
          command: "",
          output: (
            <div className="text-muted-foreground mb-4">
              Interactive mode activated. Type <span className="text-primary font-bold">help</span> to see available commands.
            </div>
          )
        }
      ]);
    }
    inputRef.current?.focus();
  };

  // Auto-typing logic (only runs in "auto" mode)
  useEffect(() => {
    if (mode === "interactive") return;

    let timeout: NodeJS.Timeout;

    const currentCommand = sequence[seqIndex];

    if (isPaused) {
      // Pause after typing the full command before deleting it
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting) {
      // Deleting characters
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
          setInput(currentCommand.substring(0, charIndex - 1));
        }, 30); // Fast deletion speed
      } else {
        // Finished deleting, move to next command directly using state updates outside effects
        // By changing seqIndex inside a setTimeout, we break the infinite synchronous render
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setSeqIndex((prev) => (prev + 1) % sequence.length);
        }, 0);
      }
    } else {
      // Typing characters
      if (charIndex < currentCommand.length) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          setInput(currentCommand.substring(0, charIndex + 1));
        }, Math.random() * 100 + 50); // Random typing speed (50-150ms)
      } else {
        // Finished typing the command
        // Avoid synchronous render loop
        timeout = setTimeout(() => {
           setIsPaused(true);
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [mode, seqIndex, charIndex, isDeleting, isPaused, sequence]);

  // Execute a command
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return; // Ignore empty commands

    const parts = trimmedCmd.split(" ").filter(Boolean);
    const baseCommand = parts[0]?.toLowerCase();
    const arg = parts[1];

    let output: React.ReactNode = null;

    switch (baseCommand) {
      case "help":
        output = commandsHelp;
        break;
      case "ls":
        output = (
          <div className="flex gap-6 text-blue-400">
            {Object.keys(files).map((file) => (
              <span key={file}>{file}</span>
            ))}
          </div>
        );
        break;
      case "cat":
        if (!arg) {
          output = <span className="text-red-500">cat: missing file operand</span>;
        } else if (files[arg]) {
          output = <div className="ml-4 border-l-2 border-border pl-4 my-2">{files[arg]}</div>;
        } else {
          output = <span className="text-red-500">cat: {arg}: No such file or directory</span>;
        }
        break;
      case "clear":
        setHistory([]);
        return; // Don't add clear to history
      case "whoami":
        output = "vinersar31";
        break;
      case "cd":
        if (!arg || arg === "~") {
             output = null;
        } else if(arg === "about" || arg === "projects" || arg === "cv") {
            router.push(`/${arg}`);
            output = `Navigating to /${arg}...`;
        } else {
             output = <span className="text-red-500">cd: {arg}: No such file or directory</span>;
        }
        break;
      default:
        output = <span className="text-red-500">{baseCommand}: command not found</span>;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        command: trimmedCmd,
        output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === "auto") setMode("interactive");
    setInput(e.target.value);
  };

  return (
    <div
      className="w-full h-[65vh] min-h-[400px] max-h-[700px] bg-zinc-950 text-zinc-300 font-mono p-1 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-zinc-800 relative group"
      onClick={handleTerminalClick}
    >
      {/* Fake Window Header */}
      <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 rounded-t-lg shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-zinc-500 select-none">vinersar31@portofolio:~</div>
      </div>

      {/* Terminal Content Area */}
      <div
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        ref={scrollRef}
      >
        {/* Intro Text */}
        {history.length === 0 && mode === "auto" && (
           <div className="mb-6 text-zinc-500">
             <p>Welcome to vinersarOS v1.0.0</p>
             <p>Click anywhere or start typing to interact.</p>
           </div>
        )}

        {/* Command History */}
        {history.map((entry) => (
          <div key={entry.id} className="mb-4">
            <div className="flex">
              <span className="text-green-400 mr-2 shrink-0">vinersar31@portofolio&gt;</span>
              <span className="text-zinc-100">{entry.command}</span>
            </div>
            {entry.output && <div className="mt-2 text-zinc-300">{entry.output}</div>}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center">
          <span className="text-green-400 mr-2 shrink-0">vinersar31@portofolio&gt;</span>
          <div className="relative flex-1 flex items-center h-6">

            {/* The visible typed text */}
            <span className="text-zinc-100 whitespace-pre absolute inset-0 pointer-events-none flex items-center">
              {input}
              {/* Blinking Cursor */}
              <span
                className={`inline-block w-[8px] h-[1em] ml-[1px] ${cursorVisible ? 'bg-zinc-300' : 'bg-transparent'}`}
                style={{ verticalAlign: 'middle' }}
              ></span>
            </span>

            {/* Hidden actual input for handling keyboard events smoothly */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 w-full h-full opacity-0 cursor-text text-transparent outline-none bg-transparent"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
