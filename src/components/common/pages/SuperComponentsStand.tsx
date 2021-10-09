import React from "react";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import SuperButton from "../c2-SuperButton/SuperButton";
import SuperCheckbox from "../c3-SuperCheckbox/SuperCheckbox";
import styles from "./SuperComponentsStand.module.css"

export const SuperComponentsStand = () => {
    return (
        <div className={styles.superComponentsStand}>
            <SuperInputText/>
            <SuperButton> Button </SuperButton>
            <SuperCheckbox/>
        </div>
    );
}