// @flow
export const camelize = (s: string) => s.replace(/-[a-z]/g, m => m.slice(1).toUpperCase());
export const decamelize = (s: string) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
