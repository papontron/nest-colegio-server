const ERROR_MESSAGES = {
  notAuthorized: 'Usted no está autorizado',
  required(field: string) {
    return `el campo ${field} es requerido`;
  },
} as const;
