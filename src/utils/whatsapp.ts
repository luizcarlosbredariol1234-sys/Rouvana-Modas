export function buildWhatsAppUrl(phoneClean: string, text: string): string {
  const digits = phoneClean.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(text)}`;
}
