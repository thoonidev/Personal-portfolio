import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
const links = [['inicio', 'Inicio'], ['sobre-mi', 'Sobre mí'], ['tecnologias', 'Tecnologías'], ['proyectos', 'Proyectos'], ['exploraciones', 'Exploraciones'], ['contacto', 'Contacto']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    const onEscape = event => { if (event.key === 'Escape') setOpen(false); };
    media.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', onEscape);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => { observer.disconnect(); media.removeEventListener('change', closeOnDesktop); window.removeEventListener('keydown', onEscape); };
  }, []);
  return <header className="site-header"><div className="container nav-inner">
    <a className="wordmark" href="#inicio" aria-label="thoonidev, inicio" onClick={() => setOpen(false)}>thooni<span>dev</span><span className="wordmark-dot">.</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <XMarkIcon /> : <Bars3Icon />}</button>
    <nav id="main-nav" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegación principal">{links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  </div></header>;
}
