export const validateAlphanumeric = (
  label: string,
  isRequired: boolean = true
) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s.,\-():;/]+$/,
      message: `${label} solo puede contener caracteres alfanuméricos`,
    },
  };
  return rules;
};

export const validateNumeric = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[0-9]+$/,
      message: `${label} solo puede contener caracteres numéricos`,
    },
  };
  return rules;
};

export const validateYear = (label: string, isRequired: boolean = true) => {
  const currentYear = new Date().getFullYear(); // Get current year
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^(20)\d{2}$/, // Allows only years between 2000 and 2099
      message: `${label} solo puede contener años entre 2000 y 2099`,
    },
  };
  return rules;
};

export const validatePhoneNumber = (
  label: string,
  isRequired: boolean = true
) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[0-9]{10}$/,
      message: `${label} es un número de teléfono inválido`,
    },
  };
  return rules;
};

export const validateFloat = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[0-9]+(\.[0-9]+)?$/,
      message: `${label} solo puede contener números o decimales`,
    },
  };
  return rules;
};

export const validateEmail = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: `${label} es una dirección de correo electrónico inválida`,
    },
  };
  return rules;
};

export const validateDate = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value:
        /^(?:(\d{4})-(\d{2})-(\d{2})(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?|(\d{2})-(\d{2})-(\d{4}))$/,
      message: `${label} tiene un formato de fecha inválido`,
    },
  };
  return rules;
};

export const validateTime = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      message: `${label} tiene un formato de hora inválido`,
    },
  };
  return rules;
};

export const validateTags = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[a-zA-Z0-9ñÑ\s\-_.,<>\/]+$/,
      message: `${label} solo puede contener caracteres alfanuméricos, espacios y algunos caracteres especiales`,
    },
  };
  return rules;
};

export const validateCURP = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}\d$/,
      message: `${label} tiene un formato de CURP inválido`,
    },
  };
  return rules;
};

export const validateRFCMoral = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[A-Z&Ñ]{3}\d{6}[A-Z\d]{3}$/,
      message: `${label} tiene un formato de RFC moral inválido`,
    },
  };
  return rules;
};

export const validateRFCFisico = (
  label: string,
  isRequired: boolean = true
) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[A-Z]{4}\d{6}[A-Z\d]{3}$/,
      message: `${label} tiene un formato de RFC físico inválido`,
    },
  };
  return rules;
};

export const validateRFC = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^[A-ZÑ&]{3,4}[0-9]{6}[A-V1-9][0-9A-ZÑ][0-9]$/,
      message: `${label} tiene un formato de RFC inválido`,
    },
  };
  return rules;
};

export const validateSelects = (label: string, isRequired: boolean = true) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
  };
  return rules;
};

export const validateContainers = (
  label: string,
  isRequired: boolean = true
) => {
  const rules = {
    ...(isRequired && { required: `${label} es requerido` }),
    pattern: {
      value: /^(\d+,)*\d+$/,
      message: `${label} solo puede contener números separados por comas`,
    },
  };
  return rules;
};
