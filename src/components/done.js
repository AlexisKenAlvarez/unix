import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateRegister } from "../features/registerSlice";

const Done = () => {

    const updateReg = useSelector((state) => state.updateRegister.value)
    const password = updateReg.password
    const email = updateReg.email
    
    const [shown, setShown] = useState(false);

    const togglePassword = () => {
        setShown(!shown);
    }


    return (

        
        <>
            <div className="reg-done-wrapper primary">
                <div className="done-email-div">
                    <p className="email-label-done">Email: </p>
                    <p className="done-email">{email}</p>
                </div>

                <div className="done-password-div">
                    <p className="password-label-done">Password: </p>
                    <input type={shown ? "text" : "password"} name="password-done" className="done-password" disabled={true} value={password}></input>
                </div>
                
                <p className="done-show" onClick={togglePassword}>Show password</p>
            </div>
        </>
    )
}

export default Done;