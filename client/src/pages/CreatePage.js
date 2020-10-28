import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const { request, loading } = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const generateHandler = async () => {
        try {
            const data = await request('/api/link/generate', 'POST', { from: link }, { 
                Authorization: `Bearer ${auth.token}` 
            });
            
            history.push(`/detail/${data.link._id}`);
        } catch (e) {console.log(`catch ${e.message}`)}
    }

    const pressHandler = async event => {
        if(event.key === "Enter") {
            generateHandler();
        }
    }

    return (
        <div className="row">
            <h1>CreatePage</h1>
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="link" 
                        type="text" 
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
                <div className="card-action">
                    <button 
                        className="btn yellow darken-4" 
                        style={{marginRight: 10}}
                        onClick={generateHandler}
                        disabled={loading}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};