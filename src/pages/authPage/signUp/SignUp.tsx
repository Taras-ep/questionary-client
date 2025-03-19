import React, { useRef, useState, useMemo } from "react";
import { useButtonIsActiveStyle } from "../../../Utils/hooks/buttonIsActiveStyle.tsx";
import '../../../styles/SignUp.scss'
import '../../../styles/mediaRequests/auth-form-media-req.scss'
import ButtonContinue from "../../../Utils/ButtonContinue/ButtonContinue.tsx";
import { SignUpService } from "../../../service/SignUpService.ts";
import StackedError from "../../../errors/StackedError.ts";
import HttpError from "../../../errors/HttpError.ts";
import OutputValidationError from "../../../Utils/inputValidation/outputValidationError.ts";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate();
    const signUpService = SignUpService.instace;

    const userNameInputRef = useRef<HTMLInputElement>(null);
    const userEmailInputRef = useRef<HTMLInputElement>(null);
    const userPhoneNumberInputRef = useRef<HTMLInputElement>(null);
    const userPasswordInputRef = useRef<HTMLInputElement>(null);

    const [validationError, setValidationError] = useState({
        fieldName: '',
        errorMessage: ''
    });

    const outputValidationError = useMemo(() =>
        new OutputValidationError(validationError.fieldName, validationError.errorMessage),
        [validationError]
    );

    const { isActive, setIsActive } = useButtonIsActiveStyle([
        userNameInputRef,
        userEmailInputRef,
        userPhoneNumberInputRef,
        userPasswordInputRef
    ]);

    async function createUserOnClick() {
        if (
            userNameInputRef.current &&
            userEmailInputRef.current &&
            userPhoneNumberInputRef.current &&
            userPasswordInputRef.current
        ) {
            try {
                await signUpService.createUser(
                    userNameInputRef.current.value,
                    userEmailInputRef.current.value,
                    userPhoneNumberInputRef.current.value,
                    userPasswordInputRef.current.value
                );
                navigate("/SignUpPage/OnSuccessSignUpPage"); 
            } catch (error) {
                if (error instanceof StackedError) {
                    setValidationError({
                        fieldName: error.error.fieldName,
                        errorMessage: error.error.errorMessage
                    });
                }
            }
        }
    }

    return (
        <div className="input-sign-up-container">
            <div className="user-name_input-container input__container">
                <div className="output-error-pisition__configurator">
                    <input
                        type="text"
                        aria-label="user-name"
                        ref={userNameInputRef}
                        onChange={(e) => setIsActive(e.target.value.length > 0)}
                        placeholder="Name"
                    />
                    <div className="show-validation-error">
                        {outputValidationError.showValidationErrorName()}
                    </div>
                </div>
            </div>
            <div className="user-email_input-container input__container">
                <div className="output-error-pisition__configurator">
                    <input
                        type="email"
                        aria-label="email"
                        ref={userEmailInputRef}
                        onChange={(e) => setIsActive(e.target.value.length > 0)}
                        placeholder="Email address"
                    />
                    <div className="show-validation-error">
                        {outputValidationError.showValidationErrorEmail()}
                    </div>
                </div>
            </div>
            <div className="user-phone-number_input-container input__container">
                <div className="output-error-pisition__configurator">
                    <input
                        type="text"
                        aria-label="user-phone-number"
                        ref={userPhoneNumberInputRef}
                        onChange={(e) => setIsActive(e.target.value.length > 0)}
                        placeholder="Phone number"
                    />
                    <div className="show-validation-error">
                        {outputValidationError.showValidationErrorPhoneNumber()}
                    </div>
                </div>
            </div>
            <div className="user-password_input-container input__container">
                <div className="output-error-pisition__configurator">
                    <input
                        type="password"
                        aria-label="user-password"
                        ref={userPasswordInputRef}
                        onChange={(e) => setIsActive(e.target.value.length > 0)}
                        placeholder="Password (minimum 8 characters)"
                    />
                    <div className="show-validation-error">
                        {outputValidationError.showValidationErrorPassword()}
                    </div>
                </div>
            </div>
            <div className="button-container-sign-up">
                <ButtonContinue isActive={isActive} text={'CONFIRM'} onContinue={createUserOnClick} />
            </div>
        </div>
    );
};

export default SignUp;