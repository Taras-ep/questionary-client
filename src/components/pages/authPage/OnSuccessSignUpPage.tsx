import React from "react";
import './OnSignUpSuccessPage.scss'
import ButtonContinue from "../../utils/ButtonContinue.tsx";
import { Link } from "react-router-dom";

const OnSuccessSignUpPage = () => {
    return (
        <div className="on-success-sign-up-page-wrapper">
            <div className="on-success-sign-up-page-container">
                <div className="on-success-text">
                Congratulations! Your account has been successfully created. You can now log in and start using all the features. Welcome aboard! 
                </div>
                <div className="button-back-to-log-in-page-container">
                    <Link to={"/LogInPage"}><ButtonContinue isActive={true} text="OK" onContinue={() => {}}/></Link>
                </div>
            </div>
        </div>
    )
}

export default OnSuccessSignUpPage