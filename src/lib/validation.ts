export const iranPhoneRegex = /^(?:\+989|09|00989)\d{9}$/;

export function isValidIranianPhone(phone: string): boolean {
  return iranPhoneRegex.test(phone);
}