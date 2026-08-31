const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function initEmailJS() {
  // Initialized dynamically on send
}

export async function sendEmail(templateId, templateParams) {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    console.warn('EmailJS not configured. Set VITE_EMAILJS_* env variables.');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const { default: emailjs } = await import('@emailjs/browser');
    const response = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, message: error.text || 'Failed to send email' };
  }
}

export const TEMPLATE_IDS = {
  contact: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  booking: import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  newsletter: import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  hiring:
    import.meta.env.VITE_EMAILJS_HIRING_TEMPLATE_ID ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
