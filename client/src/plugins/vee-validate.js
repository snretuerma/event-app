import { extend } from 'vee-validate';
import {
  required,
  between,
  alpha_spaces,
  alpha_dash,
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} is required",
})

extend("between", {
  ...between,
  message: "{_field_} value must be between {min} and {max}",
})

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "{_field_} must only contain alphabetic characters or spaces",
})

extend("alpha_dash", {
  ...alpha_dash,
  message:
    "{_field_} must only contain alphanumeric characters, dashes or underscores",
})
