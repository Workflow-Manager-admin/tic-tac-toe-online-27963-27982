export default function GameHeader() {
  return (
    <header
      style={{
        width: "100%",
        textAlign: "center",
        paddingTop: "1.5rem",
        paddingBottom: "0.25rem",
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: "2.4rem",
          color: "#1e293b",
          letterSpacing: "-1px",
        }}
      >
        Tic-Tac-Toe Online
      </h1>
      <p
        style={{
          color: "#64748b",
          fontSize: "1rem",
          marginTop: "-0.5rem",
        }}
      >
        Play with a friend or challenge the AI
      </p>
    </header>
  );
}
