import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Utils/Redux/Store.ts";
import getUser from "../../Utils/Redux/API/getUser.ts";
import './MenuBar.scss'
import { useSelector } from "react-redux";
import { RootState } from "../../models/RootState";
import logoutUser from "../../Utils/Redux/API/logoutUser.ts";

const MenuBar = () => {
    const authState = useSelector((state: RootState) => state.authState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUser());
    }, []);

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
                    <p className="user-name-container">User: <span>{authState.user.name}</span></p>
                    <button type="button" className="button log-out-button" onClick={() => dispatch(logoutUser())}>
                        LOG OUT
                    </button>
                </div>
            }
        </div>
    )
}

export default MenuBar