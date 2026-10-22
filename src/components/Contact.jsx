import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRightIcon, EnvelopeIcon, CodeBracketIcon, UserCircleIcon,
  PaperAirplaneIcon, ClipboardDocumentIcon, CheckIcon,
  CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon,
} from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';
import { sendContactMessage } from '../services/contact';

const email = 'anthony.abel.alanya@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [status, setStatus] = useState('idle');
  const [fieldErrors, setFieldErrors] = useState({});
  const sending = useRef(false);
  const feedbackRef = useRef(null);

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    feedbackRef.current?.focus({ preventScroll: true });
    feedbackRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyStatus('Correo copiado.');
    } catch {
      setCopyStatus('Puedes seleccionar el correo o abrirlo con el enlace.');
    }
  }

  async function submitMessage(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    for (const field of ['name', 'email', 'subject', 'message']) {
      payload[field] = payload[field].trim();
    }
    const lengths = { name: 2, subject: 3, message: 10 };
    const invalid = Object.entries(lengths).find(([field, min]) => payload[field].length < min);
    if (invalid) {
      setFieldErrors({ [invalid[0]]: `Ingresa al menos ${invalid[1]} caracteres, sin contar espacios al inicio o al final.` });
      form.elements.namedItem(invalid[0]).focus();
      return;
    }
    sending.current = true;
    setStatus('sending');
    setFormStatus('Enviando tu mensaje…');
    setFieldErrors({});
    try {
      await sendContactMessage(payload);
      setStatus('success');
      setFormStatus('Gracias por escribirme. Tu mensaje se envió correctamente.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setFormStatus(error.message);
      setFieldErrors(error.fields || {});
    } finally {
      sending.current = false;
    }
  }

  function clearFeedback(event) {
    if (sending.current) return;
    setFormStatus('');
    setStatus('idle');
    const field = event.target.name;
    setFieldErrors(previous => ({ ...previous, [field]: undefined }));
  }

  function fieldFeedback(field) {
    return fieldErrors[field] ? <span className="field-error" id={`error-${field}`}>{fieldErrors[field]}</span> : null;
  }

  return (
    <section className="section contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" label="El siguiente paso" title="Hablemos" description="¿Una oportunidad para trabajar juntos? Me gustaría conocerla." />
        <div className="contact-layout">
          <div className="contact-information" data-reveal>
            <h3>Información de contacto</h3>
            <p>Busco mi primera oportunidad profesional en desarrollo backend. Puedes escribirme para conversar sobre una oportunidad o sobre mis proyectos.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <EnvelopeIcon />
                <a href={`mailto:${email}`}><span>Correo electrónico</span><strong>{email}</strong></a>
                <button className="icon-button" type="button" onClick={copyEmail} aria-label={copied ? 'Correo copiado' : 'Copiar correo'}>{copied ? <CheckIcon /> : <ClipboardDocumentIcon />}</button>
              </div>
              <a className="contact-method" href="https://www.linkedin.com/in/thoonidev" target="_blank" rel="noreferrer"><UserCircleIcon /><div><span>LinkedIn</span><strong>Conectemos profesionalmente</strong></div><ArrowUpRightIcon /></a>
              <a className="contact-method" href="https://github.com/thoonidev" target="_blank" rel="noreferrer"><CodeBracketIcon /><div><span>GitHub</span><strong>Explora mis repositorios</strong></div><ArrowUpRightIcon /></a>
            </div>
            <span role="status" className="copy-status">{copyStatus}</span>
            <p className="contact-location">Lima, Perú</p>
          </div>
          <form className="contact-form" onSubmit={submitMessage} onChange={clearFeedback} data-reveal aria-describedby="contact-form-note" aria-busy={status === 'sending'}>
            <h3>Escríbeme un mensaje</h3>
            {formStatus && (
              <div
                ref={feedbackRef}
                className={`contact-feedback contact-feedback-${status}`}
                role={status === 'error' ? 'alert' : 'status'}
                aria-atomic="true"
                tabIndex={-1}
              >
                {status === 'success' ? <CheckCircleIcon aria-hidden="true" /> : status === 'error' ? <ExclamationCircleIcon aria-hidden="true" /> : <ArrowPathIcon aria-hidden="true" />}
                <div>
                  <strong>{status === 'success' ? '¡Mensaje enviado!' : status === 'error' ? 'No se pudo enviar el mensaje' : 'Enviando tu mensaje…'}</strong>
                  <p>{formStatus}</p>
                </div>
              </div>
            )}
            <fieldset disabled={status === 'sending'}>
            <div className="form-row">
              <label htmlFor="contact-name">Nombre<input id="contact-name" name="name" autoComplete="name" placeholder="Tu nombre" required minLength={2} maxLength={100} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? 'error-name' : undefined} />{fieldFeedback('name')}</label>
              <label htmlFor="contact-email">Correo<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="tu@correo.com" required maxLength={254} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? 'error-email' : undefined} />{fieldFeedback('email')}</label>
            </div>
            <label htmlFor="contact-subject">Asunto<input id="contact-subject" name="subject" placeholder="¿Sobre qué te gustaría conversar?" required minLength={3} maxLength={150} aria-invalid={!!fieldErrors.subject} aria-describedby={fieldErrors.subject ? 'error-subject' : undefined} />{fieldFeedback('subject')}</label>
            <label htmlFor="contact-message">Mensaje<textarea id="contact-message" name="message" placeholder="Cuéntame un poco más…" rows={5} required minLength={10} maxLength={3000} aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? 'error-message' : undefined} />{fieldFeedback('message')}</label>
            <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Deja este campo vacío<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
            <p className="form-note" id="contact-form-note">Utilizaré tus datos únicamente para responder a tu mensaje.</p>
            <button className="button button-primary" type="submit">{status === 'sending' ? 'Enviando…' : 'Enviar mensaje'} <PaperAirplaneIcon /></button>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}
