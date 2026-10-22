export class ContactError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'ContactError';
    this.fields = fields;
  }
}

export async function sendContactMessage(payload) {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const isJson = response.headers.get('content-type')?.includes('json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 429) {
        throw new ContactError('Has realizado varios intentos. Espera unos minutos antes de volver a enviar.');
      }
      throw new ContactError(
        data?.detail || 'No se pudo enviar el mensaje. Inténtalo más tarde o escríbeme por correo.',
        data?.errors || {},
      );
    }

    if (!data?.message) {
      throw new ContactError('No se pudo confirmar el envío. Puedes contactarme por correo.');
    }
    return data.message;
  } catch (error) {
    if (error instanceof ContactError) throw error;
    if (error.name === 'AbortError') {
      throw new ContactError('El servicio tardó demasiado en responder. No pudimos confirmar el envío; evita repetirlo inmediatamente.');
    }
    throw new ContactError('No se pudo conectar con el servicio de contacto. Puedes escribirme por correo o LinkedIn.');
  } finally {
    window.clearTimeout(timeout);
  }
}
