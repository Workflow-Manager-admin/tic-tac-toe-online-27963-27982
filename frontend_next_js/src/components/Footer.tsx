export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        fontSize: "0.97em",
        padding: "1rem 0 0.2rem 0",
        color: "#64748b",
        letterSpacing: "0.02em",
      }}
    >
      <div>
        © {new Date().getFullYear()} Tic-Tac-Toe Online &middot;{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ef4444",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Built with Next.js
        </a>
      </div>
    </footer>
  );
}
