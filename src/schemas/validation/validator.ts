import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "is invalid",
    required: "is a mandatory field",
    oneOf: "must be one of the following values: ${values}",
    notOneOf: "cannot be one of the following values: ${values}",
    notType: () => {
      return `must be valid`;
    },
    defined: " must not be undefined",
  },
  string: {
    length: "must have exactly ${length} characters",
    min: "must have at least ${min} characters",
    max: "must have at most ${max} characters",
    email: "has invalid email format",
    url: "must have a valid URL format",
    trim: "must not contain leading or trailing spaces.",
    lowercase: "must be uppercase",
    uppercase: "must be in lowercase",
  },
  number: {
    min: "must have at least ${min}",
    max: "must have at most${max}",
    lessThan: "must be less than ${less}",
    moreThan: "must be greater than ${more}",
    // notEqual: "não pode ser igual à ${notEqual}",
    positive: "must be a positive number",
    negative: "must be a negative number",
    integer: "must be a integer number",
  },
  date: {
    min: "must be greater than date ${min}",
    max: "must be lower than date ${max}",
  },
  array: {
    min: "must have at least ${min} valid registration",
    max: "must have a maximum of ${max} valid registration",
  },
});

export default yup;
