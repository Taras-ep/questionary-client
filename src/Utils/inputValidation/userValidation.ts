import StackedError from "../../errors/StackedError.ts";

function passwordValidation(password: string) {
    if (!password) throw new StackedError({ fieldName: "password", errorMessage: "Field cannot be empty" }, "Validation error");
    if (password.length < 8) throw new StackedError({ fieldName: "password", errorMessage: "Password must be at least 8 characters long" }, "Validation error");
    if (!/[a-z]/.test(password)) throw new StackedError({ fieldName: "password", errorMessage: "Password must contain at least one lowercase letter" }, "Validation error");
    if (!/[A-Z]/.test(password)) throw new StackedError({ fieldName: "password", errorMessage: "Password must contain at least one uppercase letter" }, "Validation error");
    if (!/[0-9]/.test(password)) throw new StackedError({ fieldName: "password", errorMessage: "Password must contain at least one digit" }, "Validation error");
    if (!/[@$!%^&*_?]/.test(password)) throw new StackedError({ fieldName: "password", errorMessage: "Password must contain at least one special character" }, "Validation error");

    return true;
}

function emailValidation(email: string) {
    if (!email) throw new StackedError({ fieldName: "email", errorMessage: "Field cannot be empty" }, "Validation error");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) throw new StackedError({ fieldName: "email", errorMessage: "Invalid email address" }, "Validation error");

    return true
}

function phoneValidation(phone: string) {
    if (!phone) throw new StackedError({ fieldName: "phoneNumber", errorMessage: "Field cannot be empty" }, "Validation error");
    if (!/^\+?[0-9]{10,15}$/.test(phone)) throw new StackedError({ fieldName: "phoneNumber", errorMessage: "Invalid phone number" }, "Validation error");

    return true
}

function nameValidation(name: string) {
    if (!name) throw new StackedError({ fieldName: "name", errorMessage: "Field cannot be empty" }, "Validation error");
    if (/[0-9]+/.test(name)) throw new StackedError({ fieldName: "name", errorMessage: "Name should only contain letters" }, "Validation error");

    return true
}

export const UserSignUpValidator = (name: string, email: string, phone: string, password: string) => {
    if (nameValidation(name) && emailValidation(email) && phoneValidation(phone) && passwordValidation(password)) return true
};

export const UserLogInValidator = (emailOrPhone: string, password: string) => {
    if (emailValidation(emailOrPhone) || phoneValidation(emailOrPhone)) {
        return passwordValidation(password)
    }
}