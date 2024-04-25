import {Errors} from "../error/Errors";

export function getErrorText(errorCode) {
    switch (errorCode) {
        case Errors.ERROR_SIGN_UP_NO_USERNAME:
            return "No username";
        case Errors.ERROR_SIGN_UP_NO_PASSWORD:
            return "No password";
        case Errors.ERROR_SIGN_UP_PASSWORDS_DONT_MATCH:
            return "Passwords don't match";
        case Errors.ERROR_SIGN_UP_USERNAME_TAKEN:
            return "Username already taken";
        case Errors.ERROR_NO_SUCH_USERNAME:
            return "No such username";
        case Errors.ERROR_NO_SUCH_USER:
            return "No such user";
        case Errors.ERROR_NO_SUCH_MAIL:
            return "No such mail";
        case Errors.ERROR_MAIL_TAKEN:
            return "Mail already taken";
        case Errors.ERROR_INVALID_EMAIL_OR_PASSWORD:
            return "Invalid email or password";
        default:
            return "Unknown error";
    }
}