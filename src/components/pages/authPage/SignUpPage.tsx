import React from "react";
import './FormUserSignUp.scss';
import SignUp from "./SignUp.tsx";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    return (
        <div className="form-wrapper-sign-up">
            <div className="form-container-sign-up">
                <header className="form-header-sign-up">
                    <div className="get-back-to-log-in-page">
                        <Link to='/LogInPage' className="log-in-page">{'<'}LOG IN</Link>
                    </div>
                    <h1>
                        SIGN UP
                    </h1>
                    <div className="close-icon-container-sign-up">
                        <button type="button" title="close-auth-window">
                           <Link to={"/"}><img src="/icons/close_icon.svg" alt="not available" /></Link>
                        </button>
                    </div>
                </header>
                <form action="#" method="post" id="form-user-sign-up">
                    <SignUp />
                </form>
                <footer className="privacy-policy-sign-up">
                    <p>
                        By continuing, you agree to create an account <br />
                        and consent to the processing of personal data
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default SignUpPage;
