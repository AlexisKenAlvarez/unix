import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Component
import Cart from '../components/cart'



const PrivateCart = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false)
    Axios.defaults.withCredentials = true
    
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_DBURL}login`).then((response) => {
            if (response.data.loggedIn === true) {
              setLogin(true)
            } else {
                navigate("/login", {replace: true})
            }
          })
    }, [])
    

    if (!login) {
        return (
            <>
            <h1>LOADING...</h1>
            </>
        )
    }

    return (
        <Cart/>
    )
}

export default PrivateCart
