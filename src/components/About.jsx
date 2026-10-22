import { CheckCircleIcon, ArrowDownTrayIcon, ArrowDownIcon, ServerStackIcon, CircleStackIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';

const strengths = [
  'Aplicaciones con Java y Spring Boot',
  'Arquitecturas monolíticas y microservicios',
  'Integración de servicios y mensajería',
  'Interfaces con Angular y React',
];

export default function About() {
  return (
    <section className="section about-section" id="sobre-mi" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" label="Un poco sobre mí" title="Detrás del código" description="Mi recorrido, lo que construyo y hacia dónde quiero seguir creciendo." />
        <div className="about-layout">
          <div className="architecture-art" data-reveal aria-label="Esquema conceptual de una aplicación: interfaz, servicios Java y datos">
            <div className="art-topbar"><div className="window-dots"><span /><span /><span /></div><span>application / overview</span></div>
            <div className="architecture-body">
              <span className="art-label">CONECTAR LAS PIEZAS</span>
              <div className="architecture-node"><CodeBracketIcon /><div><strong>Interfaz</strong><span>Angular · React · Web</span></div></div>
              <div className="architecture-connector"><ArrowDownIcon /><span>peticiones y respuestas</span></div>
              <div className="architecture-node architecture-main"><ServerStackIcon /><div><strong>Lógica de negocio</strong><span>Java · Spring Boot · Servicios</span></div></div>
              <div className="architecture-connector"><ArrowDownIcon /><span>persistencia</span></div>
              <div className="architecture-node"><CircleStackIcon /><div><strong>Datos</strong><span>Consultas · MySQL</span></div></div>
            </div>
            <div className="art-footer"><span className="status-dot" /> De la interfaz a los datos.</div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow">Anthony · Alanya</span>
            <h3>Backend como enfoque.<br /><span>Una visión de la aplicación completa.</span></h3>
            <p>Mi enfoque es el desarrollo backend con <strong>Java y Spring Boot</strong>. He construido aplicaciones web con arquitecturas monolíticas y microservicios, trabajando en funcionalidades de gestión e integración de servicios.</p>
            <p>También he desarrollado interfaces con Angular, React y HTML, CSS y JavaScript. Esta experiencia me permite comprender cómo se conectan las distintas partes de una aplicación, desde la lógica del servidor hasta la interacción con el usuario.</p>
            <ul className="strengths">{strengths.map(strength => <li key={strength}><CheckCircleIcon />{strength}</li>)}</ul>
            <p className="about-note">Mi recorrido combina proyectos académicos y exploraciones personales. Busco oportunidades laborales para aportar lo aprendido y seguir creciendo dentro de un equipo.</p>
            <a className="text-button" href="/cv/mi-cv_1.pdf" download>Conoce mi trayectoria <ArrowDownTrayIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
