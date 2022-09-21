import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../features/registerSlice";


const RegEmail = () => {
    const dispatch = useDispatch();
    const err = useSelector((state) => state.errSlice.value);
    const regEmail = useSelector((state) => state.updateRegister.email);

    const emailref = useRef();

    const updateEmail = () => {
        const myEmail = emailref.current.value;
        dispatch(setEmail({value: myEmail}))
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
                <input type="text" value={regEmail.value} className='email-input input-box' name='email-input' ref={emailref} onChange={updateEmail} style={err.msg === '' ? {border: "1px solid ##626A79"} : {border: "1px solid #EA2525"}}></input>
            </div>
        </>
    )
}

export default RegEmail;