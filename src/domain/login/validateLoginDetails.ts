/**
 * Validates the login details submitted by the user.
 *
 * @param email The email address submitted by the user
 * @param password The password submitted by the user
 * @returns The error message to display to the user, or true on successful login
 */
export const validateLoginDetails = (
  email?: string,
  password?: string,
): string | true => {
  if (!email) {
    return 'Please enter your email address';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  if (!password) {
    return 'Please enter your password';
  }
  if (password.length < 8) {
    return 'Your password should be at least 8 characters long';
  }
  return true;
};

const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
