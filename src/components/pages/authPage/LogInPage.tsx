import React from "react";
import './FormUserLogIn.scss';
import LogIn from './LogIn.tsx';
import { Link } from "react-router-dom";

const AuthForm = () => {
    return (
        <div className="form-wrapper">
            <div className="form-container">
                <header className="form-header">
                    <div className="form-header-container">
                        <h1>
                            LOG IN
                        </h1>
                        <div className="close-icon-container">
                            <button type="button" title="close-auth-window">
                                <Link to={"/"}><img src="/icons/close_icon.svg" alt="not available" /></Link>
                            </button>
                        </div>
                    </div>
                </header>
                <form action="#" method="post" id="form-user-auth">
                    <LogIn />
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
