import { userManagementState } from "../../../../zustand/userManagementState";

export const validateForm = (formData, fields) => {
    for (const field of fields) {
      if (!formData[field]) {
        return `Please input all required fields.`;
      }
    }
    return '';
  };
  
export const checkServerResponse = (response) => {
  if (response) {
    if (response.status === 201 || response.status === 200 ) return true; 
  }
}

export const saveUser = (response) => {
  userManagementState.getState().setUser(response.data); 
}