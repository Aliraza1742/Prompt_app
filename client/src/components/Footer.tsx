export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span style={{ opacity: 0.7 }}>© {new Date().getFullYear()} Prompt Studio</span>
        <span className="badge-effect">
          Made for cozy prompt engineering
        </span>
      </div>
    </footer>
  )
}
