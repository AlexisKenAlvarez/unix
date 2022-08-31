import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRegister } from "../features/registerSlice";

import Show from '../images/login/show.svg'
import Hide from '../images/login/hide.svg'

const RegPass = () => {
    const dispatch = useDispatch();
    const updateReg = useSelector((state) => state.updateRegister.value);
    const passref = useRef();

    const [shown, setShown] = useState(false);

    const setPass = () => {
        const myPass = passref.current.value;
        dispatch(updateRegister({email: updateReg.email, password: myPass}))
    }
    
    const passRef = () => {
        passref.current.focus();
    }

    useEffect(() => {
        passref.current.focus()
    }, [])

    const handleToggle = () => {
        setShown(!shown)
    }

    return (
        <>
            <div className='register-password-wrapper'>
                <p className='password-label primary' onClick={passRef}>Password:</p>
                <input autoFocus type={shown ? "text" : "password"} className='password-input input-box' name='password-input' ref={passref} onChange={setPass}></input>
                <img alt="Toggle password" src={shown ? Show : Hide} className="togglePassword" onClick={handleToggle} style={shown ? {top: "4.3rem"} : {top: '4.7rem'}}></img>
            </div>
        </>
    )
}

export default RegPass;