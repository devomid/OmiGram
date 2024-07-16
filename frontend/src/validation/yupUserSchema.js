import * as yup from 'yup';
import dayjs from "dayjs";

/* REGEX PASSWORD RULE */
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const usernameRules = /^[a-zA-Z0-9\-._]+$/
const ageRules = dayjs().subtract(18, "years").format("YYYY-MM-DD");

export const UserSignupValidation = yup.object().shape({
  username: yup.string().min(5, 'Username must be at least 5 characters or more.').max(25, `Username can't be more than 25 characters.`).matches(usernameRules, 'Invalid username.\nPlease use only letters, numbers, period, underscore and hyphen.').required('Username is required.'),
  firstName: yup.string().min(2).max(10).required('First name is required.'),
  lastName: yup.string().max(15).required('Last name is required.'),
  email: yup.string().email('Enter a valid email address.').required('Email is required.'),
  password: yup.string().min(8, 'Password must be at least 8 characters or more.').matches(passwordRules, { message: "Please enter a stronger password" }).required("Password required"),
  passwordConfirmation: yup.string().required("password confirmation is Required").oneOf([yup.ref("password"), null], "Password not match"),
  friends: yup.array(),
  birthDate: yup.date().max(ageRules, 'You must be 18 or older to sign up!').required('Birthday is required.'),
  picture: yup.string(),
  phoneNumber: yup.string().required('Phone number is required.'),
  city: yup.string(),
  status: yup.boolean(),
  occupation: yup.string(),
  education: yup.string(),
  location: yup.string(),
  bio: yup.string()
});

export const UserSigninValidation = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().min(5).required("Password required"),
});

export const socialCompletionValidation = yup.object().shape({
  username: yup.string().required('Username is required.'),
  birthDate: yup.date().max(ageRules, 'You must be 18 or older to sign up!').required('Birthday is required.'),
  phoneNumber: yup.string().required('Phone number is required.'),
  password: yup.string().min(8, 'Password must be at least 8 characters or more.').matches(passwordRules, { message: "Please enter a stronger password" }).required("Password required"),
  passwordConfirmation: yup.string().required("password confirmation is Required").oneOf([yup.ref("password"), null], "Password not match"),
});

export const picUploadValidation = yup.object().shape({
  useEmail: yup.string().required('Email is required')
})

export const UserEditPersonalInfoValidation = yup.object().shape({
  firstName: yup.string().min(2).max(10).required(`You can't remove your first name.`),
  lastName: yup.string().max(15).required(`You can't remove your last name.`),
  birthDate: yup.date().max(ageRules, 'You must be 18 or older to sign up!'),
  phoneNumber: yup.string().required(`You can't remove your phone number.`),
  country: yup.string(),
  city: yup.string(),
  education: yup.string(),
  gender: yup.string().required('Please specify your gender.'),
  bio: yup.string(),
});

export const UserEditAccountInfoValidation = yup.object().shape({
  email: yup.string().email('Enter a valid email address.').required('Email is required.'),
  username: yup.string().min(5, 'Username must be at least 5 characters or more.').max(25, `Username can't be more than 25 characters.`).matches(usernameRules, 'Invalid username.\nPlease use only letters, numbers, period, underscore and hyphen.').required('Username is required.'),
});

export const UserEditAccountSecurityValidation = yup.object().shape({
  oldPassword: yup.string().min(8, 'Password must be at least 8 characters or more.').matches(passwordRules, { message: "Please enter your password" }).required("Password required"),
  password: yup.string().min(8, 'Password must be at least 8 characters or more.').matches(passwordRules, { message: "Please enter a stronger password" }).required("Password required"),
  passwordConfirmation: yup.string().required("password confirmation is Required").oneOf([yup.ref("password"), null], "Password not match"),
});

export const UserDeleteAccountValidation = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters or more.').matches(passwordRules, { message: "Please enter a stronger password" }).required("Password required"),
});