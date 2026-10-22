export default function Footer() {
  return (
    <footer className="site-footer container">
      <a className="wordmark" href="#inicio">
        thooni<span>dev</span><span className="wordmark-dot">.</span>
      </a>
      <span>© {new Date().getFullYear()}</span>
      <a href="#inicio">Volver arriba ↑</a>
    </footer>
  );
}
