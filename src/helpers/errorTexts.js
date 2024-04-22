import {Errors} from "../error/Errors";

export function getErrorText(errorCode) {
    if (errorCode === Errors.ERROR_SIGN_UP_NO_USERNAME) {
        return "No username";
    }
    if (errorCode === Errors.ERROR_SIGN_UP_NO_PASSWORD) {
        return "No password";
    }
    if (errorCode === Errors.ERROR_SIGN_UP_PASSWORDS_DONT_MATCH) {
        return "Passwords don't match";
    }
    if (errorCode === Errors.ERROR_SIGN_UP_USERNAME_TAKEN) {
        return "Username already taken";
    }
    if (errorCode === Errors.ERROR_NO_SUCH_USERNAME) {
        return "No such username";
    }
    if (errorCode === Errors.ERROR_NO_SUCH_USER) {
        return "No such user";
    }
    if (errorCode === Errors.ERROR_NO_SUCH_MAIL) {
        return "No such mail";
    }
    if (errorCode === Errors.ERROR_MAIL_TAKEN) {
        return "Mail already taken";
    }
    if (errorCode === Errors.ERROR_INVALID_EMAIL_OR_PASSWORD) {
        return "Invalid email or password";
    }
}