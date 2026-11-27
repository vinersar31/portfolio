"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/Terminal";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** the terminal lives behind the ~ key (or the button) so it never crowds the intro. */
export function TerminalToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-4">
      <p className="font-mono text-[13px] text-muted-foreground">
        psst:{" "}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="home-terminal"
          className="hover:text-foreground transition-colors"
        >
          {open ? "close the terminal" : "press"}{" "}
          <kbd className="rounded border border-border px-1.5 text-foreground">~</kbd>{" "}
          {open ? "" : "to open the terminal"}
        </button>
      </p>
      {open && (
        <div id="home-terminal" className="animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
          <Terminal />
        </div>
      )}
    </div>
  );
}
