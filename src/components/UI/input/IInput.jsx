import React from "react";
import classes from "./IInput.module.css";

const IInput = (props) => {
    return (
        <input className={classes.IInput} {...props} />
    )
}

export default IInput;