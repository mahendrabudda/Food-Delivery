import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const url = import.meta.env.VITE_BACKEND_URL;

    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try {

            const response = await axios.post(
                `${url}/api/user/login`,
                data
            )


            if (response.data.success) {

                localStorage.setItem(
                    "token",
                    response.data.token
                )

                toast.success("Login Success")

                navigate('/add')
                window.location.reload();
            }

            else {
                toast.error(response.data.message)
            }

        }

        catch (error) {
            console.log(error)
            toast.error("Server Error")
        }
    }

    return (

        <div className='login'>

            <form
                className='login-container'
                onSubmit={onSubmitHandler}
            >

                <h2>Admin Login</h2>

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                />

                <button type='submit'>
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login