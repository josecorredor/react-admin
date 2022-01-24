import React, { Component, SyntheticEvent } from 'react';
import '../Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Register extends Component {
    name = '';
    last_name = '';
    email = '';
    celuphone = '';
    address = '';
    password = '';
    password_confirm = '';
    person_type = 'P';
    goal = 0;
    active = 'S';
    state = {
        redirect: false
    };

    submit = async(e: SyntheticEvent) =>{
        e.preventDefault();
        
        const response = await axios.post('/register',{
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            celuphone: this.celuphone,
            address: this.address,
            password: this.password,
            password_confirm: this.password_confirm,
            person_type: 'P',
            goal: '0',
            active: 'S',
        });
        this.setState({
            redirect: true
        });
    }

    render() {
        if(this.state.redirect){
            return <Navigate to={'/login'}/>;
        }

        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    {/* <img className="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                    <h1 className="titleRegister">Register</h1>

                    <div className="form-floating">
                    <input className="form-control" placeholder="First Name" required onChange={e => this.name = e.target.value}/>
                    <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" placeholder="Last Name" required onChange={e => this.last_name = e.target.value}/>
                    <label htmlFor="floatingPassword">Last Name</label>
                    </div>
                    <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email" required onChange={e => this.email = e.target.value}/>
                    <label htmlFor="floatingPassword">Email</label>
                    </div>
                    <div className="form-floating">
                    <input type="number" className="form-control" placeholder="Celuphone" required onChange={e => this.celuphone = e.target.value}/>
                    <label htmlFor="floatingPassword">Celuphone</label>
                    </div>
                    <div className="form-floating">
                    <input className="form-control" placeholder="Address" required onChange={e => this.address = e.target.value}/>
                    <label htmlFor="floatingPassword">Address</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" required onChange={e => this.password = e.target.value}/>
                    <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password Confirm" required onChange={e => this.password_confirm = e.target.value}/>
                    <label htmlFor="floatingPassword">Password Confirm</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    <p className="copy">&copy; 2021</p>
                </form>
            </main>
        );
    }
}

export default Register;