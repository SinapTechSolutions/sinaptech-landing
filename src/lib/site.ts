export const WHATSAPP_NUMBER = "5583921549886";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Gostaria de saber mais sobre as soluções da Sinaptech.";

export function buildWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_LINK = buildWhatsAppLink();
