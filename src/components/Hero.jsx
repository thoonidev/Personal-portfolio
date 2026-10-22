import { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowDownTrayIcon, ArrowUpRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
const words = ['Java & Spring Boot', 'arquitecturas monolíticas', 'microservicios'];
const orbitIcons = [
  { name: 'Java', icon: '/icons/java.svg', position: 'java' },
  { name: 'Spring', icon: '/icons/spring.svg', position: 'spring' },
  { name: 'React', icon: '/icons/react_dark.svg', position: 'react' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', position: 'javascript' },
  { name: 'MySQL', icon: '/icons/mysql.svg', position: 'mysql' },
  { name: 'Git', icon: '/icons/git.svg', position: 'git' },
];
function TypedWord() {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let index = 0;
    let count = words[0].length;
    let deleting = true;
    const tick = () => {
      count += deleting ? -1 : 1;
      setText(words[index].slice(0, count));
      let delay = deleting ? 38 : 78;
      if (count === 0) { index = (index + 1) % words.length; deleting = false; delay = 350; }
      else if (count === words[index].length && !deleting) { deleting = true; delay = 2400; }
      timer = window.setTimeout(tick, delay);
    };
    const sync = () => {
      window.clearTimeout(timer);
      if (media.matches) setText(words[0]);
      else { index = 0; count = words[0].length; deleting = true; setText(words[0]); timer = window.setTimeout(tick, 2600); }
    };
    sync(); media.addEventListener('change', sync);
    return () => { window.clearTimeout(timer); media.removeEventListener('change', sync); };
  }, []);
  return <><span className="sr-only">Java y Spring Boot, arquitecturas monolíticas y microservicios.</span><span aria-hidden="true" className="typed-word">{text}<span className="type-cursor">|</span></span></>;
}
export default function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <div className="hero-glow" aria-hidden="true" />
    <div className="hero-particles" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <span key={index} style={{ '--x': `${(index * 29 + 7) % 100}%`, '--y': `${(index * 17 + 11) % 100}%`, '--delay': `${index * -0.7}s` }} />)}</div>
    <div className="container hero-content">
      <div className="hero-introduction"><span className="hero-greeting"><span className="status-dot" /> Hola, soy Anthony</span><h1 id="hero-title">Desarrollador <span>Backend</span> Junior</h1><div className="hero-specialty"><CodeBracketIcon /><TypedWord /></div>
      <p className="hero-description">Construyo aplicaciones web con <strong>Java y Spring Boot</strong>, desde soluciones monolíticas hasta microservicios. Complemento mi enfoque backend con experiencia en frontend con Angular, React y tecnologías web.</p>
      <div className="hero-actions"><a className="button button-primary" href="#proyectos">Ver proyectos <ArrowDownIcon /></a><a className="button button-secondary" href="/cv/mi-cv_1.pdf" download>Descargar CV <ArrowDownTrayIcon /></a></div>
      <div className="hero-socials"><a href="https://github.com/thoonidev" target="_blank" rel="noreferrer">GitHub <ArrowUpRightIcon /></a><a href="https://www.linkedin.com/in/thoonidev" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRightIcon /></a><span>Lima, Perú</span></div></div>
      <div className="portrait-scene" aria-label="Anthony y tecnologías utilizadas en sus proyectos">
        <div className="orbit orbit-outer" aria-hidden="true" /><div className="orbit orbit-inner" aria-hidden="true" />
        <div className="portrait-frame"><img src="/profile.png" alt="Anthony, desarrollador backend junior" width="460" height="460" fetchPriority="high" /></div>
        <div className="orbit-system">{orbitIcons.map(item => <div className={`orbit-node node-${item.position}`} key={item.name}><div className="technology-satellite"><img src={item.icon} alt={item.name} width="30" height="30" /></div></div>)}</div>
      </div>
      <a className="scroll-cue" href="#sobre-mi">Conoce mi recorrido <ArrowDownIcon /></a>
    </div>
  </section>;
}
