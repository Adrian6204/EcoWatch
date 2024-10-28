export const validateForm = (formData, fields) => {
    for (const field of fields) {
      if (!formData[field]) {
        return `Please input all required fields.`;
      }
    }
    return '';
  };
  