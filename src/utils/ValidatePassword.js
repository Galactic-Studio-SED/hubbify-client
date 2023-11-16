const validatePassword = (value) => {
  // Validation rules
  const validRequired = value !== "";
  const validLength = value.length >= 8;
  const hasNumber = /\d/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  // Check all rules
  if (!validRequired) {
    return "Password is required.";
  }
  if (!validLength) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasNumber) {
    return "Password must contain at least one number.";
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!hasSpecialChar) {
    return "Password must contain at least one special character.";
  }

  return true; // Password is valid
};

export default validatePassword;
