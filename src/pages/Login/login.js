import React, { useState } from "react";
import './index.css';
import api from '../../services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

export default function Login( {history} ){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/login',{
            user,
            password
        });
        
        const userExist = response.data.user_exist;
        const isValid = response.data.logged_in;

        if(isValid){
            history.push('/main');
            localStorage.setItem('user',response.data.user);
        }else{
            if(userExist){
                return handleError();
            }
            if(!userExist){
                return handleUserError();
            }
        } 
    }

    function handleError(){
        toast.error('Senha incorreta', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,className: css({
                background: '#E71E28',
                color:'#FFF',
              }),
        });
    }

    function handleUserError(){
        toast.error('Usuário não existe', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,className: css({
                background: '#E71E28',
                color:'#FFF',
              }),
        });
    }

    return (
        <main>
            <ToastContainer />
            <div className="login-box">
                <strong>ENTRAR</strong>
                    <div className="form-login">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="user">Usuário</label>
                            <input 
                            name="user" 
                            id="user" 
                            required
                            value={user} 
                            onChange={event => setUser(event.target.value)}
                            /> 

                            <label htmlFor="pwd">Senha</label>
                            <input 
                            type="password" 
                            name="password" 
                            id="paspword"
                            required
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            />

                            <button type="submit">Efetuar Login</button>
                    </form>
                </div>
            </div>
        </main>
    );
}