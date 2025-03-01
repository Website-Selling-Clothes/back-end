export const userNameAtLeast5Characters = new Error(
  "Username must be at least 5 characters"
);
export const userNameAtMost100Characters = new Error(
  "Username must be at most 100 characters"
);
export const phoneAtLeast10Characters = new Error(
  "Phone must be at least 10 characters"
);
export const phoneAtMost15Characters = new Error(
  "Phone must be at most 15 characters"
);
export const emailInvalid = new Error("Email is invalid");
export const passwordAtLeast6Characters = new Error(
  "Password must be at least 6 characters"
);
export const passwordAtMost30Characters = new Error(
  "Password must be at most 30 characters"
);
export const firstNameAtLeast2Characters = new Error(
  "First name must be at least 2 characters"
);
export const firstNameAtMost100Characters = new Error(
  "First name must be at most 100 characters"
);
export const lastNameAtLeast2Characters = new Error(
  "Last name must be at least 2 characters"
);
export const lastNameAtMost100Characters = new Error(
  "Last name must be at most 100 characters"
);
export const birthdayInvalid = new Error("Birthday is invalid");
export const roleInvalid = new Error("Role is invalid");
export const genderInvalid = new Error("Gender is invalid");
export const statusInvalid = new Error("Status is invalid");
export const userNameNotExisted = new Error("Username is not existed");
export const passwordNotMatch = new Error("Password not match");
export const ErrEmailExisted = new Error("Email is already existed");
export const ErrInvalidUsernameAndPassword = new Error(
  "Invalid username and password"
);
export const ErrUserInactivated = new Error("User is inactivated or banned");
export const ErrInvalidToken = new Error("Invalid token");
