import React from "react";
import classes from "./IButton.module.scss";
const IButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.IButton}>
            {children}
        </button>
    )
}

export default IButton;