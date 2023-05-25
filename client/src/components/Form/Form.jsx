import React, { useState } from "react";
import Styles from './Form.module.css';
import validation from "./validation";

const {
    container,
    form,
    warning
} = Styles;

export default function Form({login}) {

    const [userData, setUserData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({
        username: '', 
        password: '' 
    })

    const handleInputchange = (e) =>{
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
        setErrors(
            validation({
                ...userData,
                [e.target.name] : e.target.value
            })
        );
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        login(userData);
    }

    return (
        <div className={container}>
            <form className={form} onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type='text'
                    name='username'
                    value={userData.username}
                    onChange={handleInputchange}
                    className={errors.username && warning }
                />

                <label>Password:</label>
                <input
                    type='password'
                    name='password'
                    value={userData.password}
                    onChange={handleInputchange}
                    className={errors.password && warning }
                />
                <button>Login</button>
            </form>
        </div>
    );
 }