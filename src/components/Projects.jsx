import { useState } from 'react';
import { ArrowUpRightIcon, CodeBracketIcon, PlusIcon } from '@heroicons/react/24/outline';
import { featuredProjects, additionalProjects } from '../data';
import SectionHeading from './SectionHeading';
function ProjectCard({ project, index }) {
  return <article className="project-card" data-reveal style={{ '--reveal-delay': `${index * 0.08}s` }}>
    <div className="project-visual"><img src={project.image} alt={`Captura de ${project.title}`} width="790" height="340" loading="lazy" /></div>
    <div className="project-content"><span className="eyebrow project-kind">Proyecto académico · Aplicación web</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
    <div className="project-links"><a href={project.link} target="_blank" rel="noreferrer"><CodeBracketIcon /> Ver código <ArrowUpRightIcon /></a><details><summary>Qué incluye <PlusIcon /></summary><p>{project.scope}</p></details></div></div>
  </article>;
}
export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  return <section className="section projects-section" id="proyectos" aria-labelledby="projects-title"><div className="container">
    <SectionHeading id="projects-title" label="Del código a la aplicación" title="Mis proyectos" description="Una selección de aplicaciones web y de las tecnologías que hay detrás." />
    <div className="projects-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
    <button className="text-button more-projects" aria-expanded={expanded} aria-controls="additional-projects" onClick={() => setExpanded(!expanded)}>{expanded ? 'Mostrar menos proyectos' : 'Explorar otros proyectos'} <PlusIcon className={expanded ? 'rotated' : ''} /></button>
    <div id="additional-projects" className="additional-projects" hidden={!expanded}>{additionalProjects.map(project => <a key={project.title} href={project.link} target="_blank" rel="noreferrer"><div><h3>{project.title}</h3><p>{project.description}</p><span>{project.technologies.join(' · ')}</span></div><ArrowUpRightIcon /></a>)}</div>
  </div></section>;
}
