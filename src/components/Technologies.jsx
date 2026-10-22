import { CodeBracketIcon, CircleStackIcon, CommandLineIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import { technologyGroups } from '../data';
import SectionHeading from './SectionHeading';
const icons = [ServerStackIcon, CodeBracketIcon, CircleStackIcon, CommandLineIcon];
export default function Technologies() {
  return <section className="section skills-section" id="tecnologias" aria-labelledby="skills-title"><div className="container">
    <SectionHeading id="skills-title" label="Mi caja de herramientas" title="Tecnologías" description="Las herramientas que utilizo en mis proyectos, con Java y Spring Boot como especialidad." />
    <div className="technology-grid">{technologyGroups.map((group, index) => { const Icon = icons[index]; return <article className={`technology-group ${index === 0 ? 'technology-primary' : ''}`} key={group.title} data-reveal><div className="technology-heading"><Icon /><h3>{group.title}</h3></div><p>{group.description}</p><div className="technology-list">{group.items.map(item => <span key={item.name}>{item.icon && <img src={item.icon} alt="" width="21" height="21" loading="lazy" />}{item.name}</span>)}</div></article>; })}</div>
  </div></section>;
}
