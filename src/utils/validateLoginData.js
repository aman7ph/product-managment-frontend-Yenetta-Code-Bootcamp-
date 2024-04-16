function validateSignupData(fullname, email, password, confirmPassword) {
  const errors = {};

  if (!fullname.trim()) {
    errors.fullName = "Full Name is required.";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+/.test(password)) {
    errors.password =
      "Password must contain a mix of uppercase and lowercase letters, and numbers.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function validateLoginData(email, password) {
  const errors = {};

  if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+/.test(password)) {
    errors.password =
      "Password must contain a mix of uppercase and lowercase letters, and numbers.";
  }

  return errors;
}

export { validateSignupData, validateLoginData };
