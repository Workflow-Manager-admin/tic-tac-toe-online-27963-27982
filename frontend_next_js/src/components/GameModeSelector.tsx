"use client";
import { useState } from "react";
import type { Player, Mode } from "@/app/page";

type Props = {
  onModeSelect: (mode: Mode, symbol?: Player) => void;
};

export default function GameModeSelector({ onModeSelect }: Props) {
  const [aiSymbol, setAiSymbol] = useState<Player>("X");

  return (
    <div
      style={{
        marginTop: "2.8rem",
        marginBottom: "2.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <div>
        <button
          style={{
            background: "#1e293b",
            color: "#fff",
            border: "none",
            borderRadius: "0.5em",
            padding: "1em 2.8em",
            fontWeight: 500,
            fontSize: "1.05rem",
            marginBottom: "1em",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={() => onModeSelect("MULTIPLAYER")}
        >
          Multiplayer
        </button>
      </div>
      <div>
        <div
          style={{
            marginBottom: "0.7em",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          or play against <span style={{ color: "#ef4444" }}>AI</span> as:
        </div>
        <div style={{ display: "flex", gap: "1.5em", alignItems: "center" }}>
          <button
            onClick={() => {
              setAiSymbol("X");
              onModeSelect("SINGLE_AI", "X");
            }}
            style={{
              background: aiSymbol === "X" ? "#ef4444" : "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: "0.5em",
              padding: "0.9em 2em",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
              outline: aiSymbol === "X" ? "2px solid #ef4444" : "none",
              opacity: 1,
              transition: "background 0.2s",
            }}
            aria-pressed={aiSymbol === "X"}
            aria-label="Play as X"
          >
            X
          </button>
          <button
            onClick={() => {
              setAiSymbol("O");
              onModeSelect("SINGLE_AI", "O");
            }}
            style={{
              background: aiSymbol === "O" ? "#ef4444" : "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: "0.5em",
              padding: "0.9em 2em",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
              outline: aiSymbol === "O" ? "2px solid #ef4444" : "none",
              opacity: 1,
              transition: "background 0.2s",
            }}
            aria-pressed={aiSymbol === "O"}
            aria-label="Play as O"
          >
            O
          </button>
        </div>
      </div>
    </div>
  );
}
