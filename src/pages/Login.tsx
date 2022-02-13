import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../Login.css';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);
    const[hidden, setHidden] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        (async() => {
            let apiRes = null;
            try {
                const {data}= await axios.post('/login', {
                    email,
                    password
                });
                setRedirect(true);
            } catch (err:any) {
                setHidden(true);
                apiRes = err.response.data.message;
                const element: HTMLElement = document.getElementById('messageForm') as HTMLElement
                element.innerHTML = apiRes;
                
              } finally {
                //setHidden(true);
                console.log(apiRes); 
              }
            })();
    }

    if (redirect){
        return <Navigate to={'/'}/>;
    }

    return (
        <main className="form-signin">
            <div className="row justify-content-center align-items-center vh-100">
                <div className='col-sm-3 bg-white'>
            <form onSubmit={submit}>
                <h1 className="titleRegister">Sign In</h1>
                <div className="form-floating">
                <input type="email" className="form-control" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="floatingPassword">Email</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" required  onChange={e => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="m3 w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                {hidden ? <div id='messInfor' className="messInfo">
                    <div id='messageForm' className="alert alert-primary" role="alert"></div>
                </div>:null}
                <p className="copy">&copy; 2021</p>
            </form>
            </div>
            </div>
        </main>
    )
};
    


export default Login;