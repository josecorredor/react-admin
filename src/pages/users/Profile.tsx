import axios from 'axios';
import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../components/Wrapper';
import { User } from '../../models/user';
import { setUser } from '../../redux/actions/setUserAction';

const Profile = (props: {user:User, setUser: (user: User) => void}) => {

    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
        
    useEffect(()=>{
        setName(props.user.name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) =>{
        e.preventDefault();

        const {data} =await axios.put('/users/info', {
            name,
            last_name,
            email
        });

        props.setUser(new User(
            data.id,
            data.name,
            data.last_name,
            data.email,
            data.role 
        ));
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('/users/password', {
            password,
            password_confirm
        })
    }

    return (
        <Wrapper>
            <h3>Account information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First name</label>
                    <input className="form-control"
                    defaultValue={name}
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input className="form-control"
                    defaultValue={last_name}
                    onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control"
                    defaultValue={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h3>Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control"
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password confirm</label>
                    <input type="password" className="form-control"
                    onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
            
        </Wrapper>
    );
};

export default connect(
    (state: { user:User}) => {
    return {
        user: state.user
    };
},
(dispatch: Dispatch<any>) =>  {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

)(Profile);