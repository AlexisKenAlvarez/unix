import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRegister } from "../features/registerSlice";


const RegEmail = () => {
    const dispatch = useDispatch();
    const updateReg = useSelector((state) => state.updateRegister.value);
    const emailref = useRef();

    const setEmail = () => {
        const myEmail = emailref.current.value;
        dispatch(updateRegister({email: myEmail, password: updateReg.password}))
    }

    const emailRef = () => {
        emailref.current.focus();
    }

    useEffect(() => {
        emailref.current.focus()
    }, [])

    return (
        <>
            <div className='register-email-wrapper'>
                <p className='email-label primary' onClick={emailRef}>Email:</p>
                <input type="text" className='email-input input-box' name='email-input' ref={emailref} onChange={setEmail}></input>
            </div>
        </>
    )
}

export default RegEmail;