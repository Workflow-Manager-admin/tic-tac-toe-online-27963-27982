import type { Mode, Player } from "@/app/page";

type Props = {
  mode: Mode;
  currentPlayer: Player;
  playerSymbol: Player;
  status: string;
  gameOver: boolean;
};

// PUBLIC_INTERFACE
export default function GameStatus({
  mode,
  currentPlayer,
  playerSymbol,
  status,
  gameOver,
}: Props) {
  let info: React.ReactNode;

  if (gameOver) {
    if (/draw/i.test(status)) {
      info = (
        <span style={{ color: "#64748b" }}>
          <b>It&apos;s a draw!</b>
        </span>
      );
    } else if (/wins/i.test(status)) {
      const winner = status.match(/[XO]/)?.[0] ?? "?";
      info = (
        <span>
          <b>
            <span style={{ color: winner === "X" ? "#ef4444" : "#1e293b" }}>
              Player {winner} wins!
            </span>
          </b>
        </span>
      );
    }
  } else {
    if (mode === "SINGLE_AI") {
      // "Your turn" or "AI's turn"
      info =
        currentPlayer === playerSymbol ? (
          <span>
            <span style={{ color: "#ef4444", fontWeight: 600 }}>
              Your turn ({playerSymbol})
            </span>
          </span>
        ) : (
          <span>
            <span style={{ color: "#1e293b" }}>
              AI&apos;s turn ({currentPlayer})
            </span>
          </span>
        );
    } else {
      info = (
        <span>
          <span
            style={{
              color: currentPlayer === "X" ? "#ef4444" : "#1e293b",
              fontWeight: 600,
            }}
          >
            Player {currentPlayer}&apos;s turn
          </span>
        </span>
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "2.4em",
        width: "100%",
        textAlign: "center",
        fontSize: "1.07em",
        fontWeight: 500,
        margin: "0 0 0.2em",
      }}
    >
      {info}
    </div>
  );
}
