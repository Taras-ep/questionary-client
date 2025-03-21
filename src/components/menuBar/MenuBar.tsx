import React from "react";
import { Link } from "react-router-dom";
import './MenuBar.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../models/RootState";

const MenuBar = () => {
    const authState = useSelector((state: RootState) => state.authState)

    return (
        <div className="menu-bar-container">
            <Link to={"/"} className="button catalog-button">
                CATALOG
            </Link>
            <div className="main-title">
                QUESTIONARIEX
            </div>
            {authState.user === null
                ? <Link to={"/LogInPage"} className="button log-in-button">
                    LOG IN
                </Link>
                : <div>
                    <p className="user-name-container">User: <span>{authState.user.userName}</span></p>
                    <Link to={"/LogInPage"} className="button log-out-button">
                        LOG OUT
                    </Link>
                </div>
            }
        </div>
    )
}

export default MenuBar