import { UserSignUpValidator } from "../Utils/inputValidation/userValidation.ts";
import HttpError from "../errors/HttpError.ts";

export interface createUserJSON {
    name?: string,
    email?: string,
    phoneNumber?: string,
    password?: string,
}

export class SignUpService {

    private constructor() { }

    static readonly instace = new SignUpService()

    private createUserData(name: string, email: string, phone: string, password: string) {
        let isValidated = UserSignUpValidator(name, email, phone, password)
        if (isValidated) {
            let createUserJSON = { name, email, phone, password }
            return createUserJSON
        }

    }

    public async createUser(name: string, email: string, phone: string, password: string) {
        let userData = this.createUserData(name, email, phone, password)
        if (userData) {
            let createUserResponse = await fetch('http://localhost:2323/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })

            if (!createUserResponse.ok) {
                console.log(createUserResponse.json())
            }
            return createUserResponse.json()
        }
    }
}

