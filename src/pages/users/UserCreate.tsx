import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';


const UserCreate = () => {
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [celuphone, setCeluphone] = useState ('');
    const [address, setAddress] = useState('');
    const [goal, setGoal] = useState('');
    const [id_role, setIdRole] = useState('');
    const [active, setActive] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [person_type, setPersonType] = useState('');

    useEffect(() => {
        (
            async () => {
                const{data} = await axios.get('/roles');
                setRoles(data);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/users', {
            name,
            last_name,
            email,
            celuphone,
            address,
            person_type,
            goal,
            id_role,
            active
        });
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to = "/users" />
    }
    
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control" required onChange={e => setName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" required onChange={e => setLastName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Celuphone</label>
                    <input type="number" className="form-control" required onChange={e => setCeluphone(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input className="form-control" required onChange={e => setAddress(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Type</label>
                    <select className="form-control" required onChange={e => setPersonType(e.target.value)}>
                    <option value={''}>Please select an option -</option>
                        <option value={'P'}>Person</option>
                        <option value={'B'}>Bank</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Goal</label>
                    <input type="number" className="form-control" required onChange={e => setGoal(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" required onChange={e => setIdRole(e.target.value)}>
                    <option value={''}>Please select an option -</option>    
                    {roles.map((r: Role)=> {
                        return (
                            <option key={r.id_role} value={r.id_role}>{r.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Active</label>
                    <select className="form-control" required onChange={e => setActive(e.target.value)}>
                    <option value={''}>Please select an option -</option>
                        <option value={'S'}>SI</option>
                        <option value={'N'}>NO</option>
                    </select>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
    );
    
}

export default UserCreate;