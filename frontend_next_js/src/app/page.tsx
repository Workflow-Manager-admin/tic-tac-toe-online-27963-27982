"use client";
import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import GameHeader from "@/components/GameHeader";
import GameModeSelector from "@/components/GameModeSelector";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";

export type Player = "X" | "O";
export type Mode = "MULTIPLAYER" | "SINGLE_AI";

// PUBLIC_INTERFACE
export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null); // Game mode not selected initially
  const [playerSymbol, setPlayerSymbol] = useState<Player>("X");
  const [restartKey, setRestartKey] = useState<number>(0); // Used to reset GameBoard

  // When user selects mode (and optional symbol), start game
  const handleModeSelect = (selectedMode: Mode, symbol: Player = "X") => {
    setMode(selectedMode);
    setPlayerSymbol(symbol);
    setRestartKey((k) => k + 1); // Ensure fresh board on new mode
  };



  // PUBLIC_INTERFACE
  function handleNewGame() {
    setMode(null);
    setRestartKey((k) => k + 1);
  }

  return (
    <div className={styles.wrapper}>
      <GameHeader />
      <main className={styles.main}>
        {!mode ? (
          <GameModeSelector onModeSelect={handleModeSelect} />
        ) : (
          <>
            <GameBoard
              key={restartKey}
              gameMode={mode}
              playerSymbol={playerSymbol}
              onNewGame={handleNewGame}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
