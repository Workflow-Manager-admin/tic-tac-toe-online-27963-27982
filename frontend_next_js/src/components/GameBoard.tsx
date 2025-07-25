"use client";
import { useState, useEffect } from "react";
import type { Player, Mode } from "@/app/page";
import GameStatus from "./GameStatus";

const BOARD_SIZE = 3;

function getOpponent(player: Player): Player {
  return player === "X" ? "O" : "X";
}

function getInitialBoard(): (Player | null)[] {
  return Array(BOARD_SIZE * BOARD_SIZE).fill(null);
}

function checkWinner(board: (Player | null)[]): Player | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6],            // Diags
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

function isDraw(board: (Player | null)[]) {
  return board.every(v => v !== null) && !checkWinner(board);
}

 // Basic AI: Pick first empty slot (deterministic, upgradeable)
function simpleAIMove(board: (Player | null)[]): number {
  for (let i = 0; i < board.length; ++i)
    if (!board[i]) return i;
  return -1;
}

type Props = {
  gameMode: Mode;
  playerSymbol: Player; // The human's symbol if playing AI, always 'X' in multiplayer for Player 1
  onNewGame: () => void;
};

// PUBLIC_INTERFACE
export default function GameBoard({
  gameMode,
  playerSymbol,
  onNewGame,
}: Props) {
  const [board, setBoard] = useState<(Player | null)[]>(getInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [status, setStatus] = useState<string>("X's turn");
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Multiplayer turn tracking for REST stub/future integration
  // For future: sync currentPlayer and board via REST API calls

  // Handle AI turn
  useEffect(() => {
    if (
      gameMode === "SINGLE_AI" &&
      !gameOver &&
      currentPlayer !== playerSymbol
    ) {
      // Simulate slight delay for AI
      const move = simpleAIMove(board);
      if (move !== -1) {
        setTimeout(() => {
          handleCellClick(move);
        }, 420);
      }
    }
    // eslint-disable-next-line
  }, [currentPlayer, gameMode, playerSymbol, gameOver, board]);

  // Main Cell Click handler
  function handleCellClick(idx: number) {
    if (gameOver || board[idx]) return;

    // In the future: Check if valid turn via REST
    if (
      gameMode === "SINGLE_AI" &&
      currentPlayer !== playerSymbol
    )
      return; // Block input if AI's turn

    const newBoard = board.slice();
    newBoard[idx] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setStatus(`Player ${winner} wins!`);
      setGameOver(true);
      return;
    }
    if (isDraw(newBoard)) {
      setStatus("It's a draw!");
      setGameOver(true);
      return;
    }
    const next = getOpponent(currentPlayer);
    setCurrentPlayer(next);
    setStatus(`${next}'s turn`);
  }

  function handleRestart() {
    setBoard(getInitialBoard());
    setCurrentPlayer("X");
    setStatus("X's turn");
    setGameOver(false);
  }

  function handleNewGame() {
    onNewGame();
    setBoard(getInitialBoard());
    setCurrentPlayer("X");
    setStatus("X's turn");
    setGameOver(false);
  }

  // For future REST API multiplayer
  // Placeholder for future multiplayer REST integration

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 4px 28px 0 #d1d5db33",
        borderRadius: "1.5rem",
        padding: "2.2rem 1.5rem",
        width: "min(92vw, 420px)",
        minWidth: "min(95vw, 300px)",
        maxWidth: "98vw",
        marginBottom: "1.3rem",
        marginTop: "1.3rem",
      }}
    >
      <GameStatus
        mode={gameMode}
        currentPlayer={currentPlayer}
        playerSymbol={playerSymbol}
        status={status}
        gameOver={gameOver}
      />
      {/* Tic-Tac-Toe Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gridTemplateRows: "repeat(3, 60px)",
          gap: "7px",
          margin: "1.2rem auto",
          justifyContent: "center",
          width: "max-content",
        }}
      >
        {board.map((cell, i) => (
          <button
            key={i}
            aria-label={`Cell ${i % 3 + 1}, ${Math.floor(i / 3) + 1}`}
            onClick={() => handleCellClick(i)}
            disabled={Boolean(cell) || gameOver || (gameMode === "SINGLE_AI" && currentPlayer !== playerSymbol)}
            style={{
              width: "60px",
              height: "60px",
              fontSize: "2rem",
              fontWeight: 600,
              color: cell === "X" ? "#ef4444" : "#1e293b",
              background: cell
                ? "rgba(145, 170, 184, 0.07)"
                : "#f8fafc",
              border: "2px solid #64748b44",
              borderRadius: "0.5rem",
              cursor:
                !cell && !gameOver && (gameMode !== "SINGLE_AI" || currentPlayer === playerSymbol)
                  ? "pointer"
                  : "not-allowed",
              transition: "background 0.18s, border 0.16s",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1.3rem", marginTop: "0.7rem" }}>
        <button
          onClick={handleRestart}
          style={{
            background: "#64748b",
            color: "#fff",
            border: "none",
            borderRadius: "0.5em",
            padding: "0.7em 1.6em",
            fontWeight: 500,
            fontSize: "1rem",
            marginTop: "0.2em",
            opacity: gameOver ? 1 : 0.93,
            cursor: "pointer",
          }}
        >
          Restart
        </button>
        <button
          onClick={handleNewGame}
          style={{
            background: "#fff",
            color: "#1e293b",
            border: "1.5px solid #64748b77",
            borderRadius: "0.5em",
            padding: "0.7em 1.6em",
            fontWeight: 500,
            fontSize: "1rem",
            marginTop: "0.2em",
            cursor: "pointer",
          }}
        >
          New Game
        </button>
      </div>
      <div
        style={{
          margin: "0.6em auto 0",
          color: "#64748b",
          fontSize: "0.9em",
        }}
      >
        {gameMode === "MULTIPLAYER" && (
          <span>
            Multiplayer (future online): Board is local for now.<br />
            <span style={{ fontSize: "0.85em" }}>
              (REST API stubbed for future)
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
