import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);

    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {       
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {

        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {

        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
            
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Name project</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">AuthPage</span>
                        <div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter please E-mail" 
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    className="auth-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter please password" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    className="auth-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            LogIn
                        </button>
                        <button 
                            className="btn green darken-2 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};