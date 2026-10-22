export default function SectionHeading({ id, label, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">{label}</span>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
