import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";
import styles from "./Header.module.css"

function Header() {
    return (
        <div className={styles.mainHeader}>
            <nav>
                <NavLink to={PATH.login}>{'login '}</NavLink>
                <NavLink to={PATH.profile}>{'profile '}</NavLink>
                <NavLink to={PATH.singIn}>{'sign-in '}</NavLink>
                <NavLink to={PATH.passwordRecovery}>{'password-recovery '}</NavLink>
                <NavLink to={PATH.newPassword}>{'new-password '}</NavLink>
                <NavLink to={PATH.superComponentsStand}>{'superComponentsStand '}</NavLink>
                <NavLink to={PATH.error404}>{'ExampleError404'}</NavLink>


            </nav>
        </div>

    );
}

export default Header;