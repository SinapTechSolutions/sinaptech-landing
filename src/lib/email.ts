export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "outlook.com.br",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
];

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isFreeEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return FREE_EMAIL_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`));
}

/** Retorna uma mensagem de erro ou `null` quando o e-mail é aceito. */
export function validateCorporateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Informe seu e-mail corporativo.";
  if (!EMAIL_REGEX.test(trimmed)) return "Formato de e-mail inválido.";
  if (isFreeEmail(trimmed)) {
    return "Use um e-mail corporativo (ex.: nome@empresa.com.br).";
  }
  return null;
}
