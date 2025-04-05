import React, { useEffect, useRef, useState } from "react";
import { useButtonIsActiveStyle } from "../../../Utils/hooks/buttonIsActiveStyle.tsx";
import './LogIn.scss'
import '../../../styles/mediaRequests/auth-form-media-req.scss'
import ButtonContinue from "../../utils/ButtonContinue.tsx";
import { placeholderInputAnimation } from '../../../Utils/placeholderInputAnimation/placeholderInputAnimation.ts'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Utils/Redux/Store.ts";
import { useNavigate } from "react-router-dom";
import logInUser from "../../../Utils/Redux/API/logInUser.ts";

const LogIn = () => {
    const inputEmailOrPhoneRef = useRef<HTMLInputElement | null>(null);
    const inputPasswordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

    const emailOrPhoneRef = useRef<string>("")

    const [showInputOnClick, setShowInputOnClick] = useState<boolean>()
    const dispatch = useDispatch<AppDispatch>();

    const { isActive, setIsActive } = useButtonIsActiveStyle(inputEmailOrPhoneRef)

    function handleInputOnClick() {
        if (isActive) {
            setShowInputOnClick(true)
        } else {
            setShowInputOnClick(false)
        }
    }

    const handleSubmit = () => {
        let password = ""
    
        if (emailOrPhoneRef.current == "" ) {
            emailOrPhoneRef.current = inputEmailOrPhoneRef.current?.value || "";
        } else {
            password = inputPasswordRef.current?.value || "";
        }

        let emailOrPhone = emailOrPhoneRef.current || ""

        if (emailOrPhone && password) {
            dispatch(logInUser({ emailOrPhone, password }));
            navigate("/")
        }
    };

    useEffect(() => {
        const intervalID = placeholderInputAnimation(inputEmailOrPhoneRef, ['myEmail123@gmail.com', '+380 12 345 67 89'], 200);
        return intervalID
    }, []);

    useEffect(() => {
        const intervalID= placeholderInputAnimation(inputPasswordRef, ['m y p a s s w o r d'], 100);
        return intervalID
    }, []);

    return (
        <div className="input-log-in-input-container">
            <div className="user-email-phone-number_input-container">
                {!showInputOnClick ? <input
                    key="email-phone-number"
                    ref={inputEmailOrPhoneRef}
                    type="text"
                    aria-label="email-phone-number"
                    onChange={(e) => setIsActive(e.target.value.length > 0)}
                /> : <input
                    key="password"
                    ref={inputPasswordRef}
                    type="password"
                    aria-label="password"
                    onChange={(e) => setIsActive(e.target.value.length > 0)}
                />}

                <span className="sign-up-container">
                    <span className="sign-up-text">Don't have an account?</span>
                    <Link to="/SignUpPage" className="sign-up-ref">SIGN UP</Link>
                </span>
                <div className="button-container-log-in">
                    <ButtonContinue isActive={isActive} text={'CONTINUE'} onContinue={() => {
                        handleInputOnClick()
                        handleSubmit()
                    }} />
                </div>
            </div>
        </div>
    );
};

export default LogIn;
