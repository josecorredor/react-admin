import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Classification } from '../../models/classification';
import { Tx_type } from '../../models/tx_type';
import { User } from '../../models/user';
import { Week } from '../../models/week';



const ExpensesEdit = (props:any) => {
    let {id_expenses} = useParams();
    const [detail, setDetail] = useState('');
    const [value, setValue] = useState('');
    const [id_classification, setIdClassification] = useState ('');
    const [classification, setClassification] = useState ([]);
    const [id_week, setIdWeek] = useState('');
    const [week, setWeek] = useState([]);
    const [id_person, setIdPerson] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [id_tx_type, setIdTxType] = useState('');
    const [tx_type, setTxType] = useState([]);
    const [redirect, setRedirect] = useState(false);
    
    const getUsers = async () => {
        const {data} = await axios.get('/users');
        setUsers(data.data);
    }


    const getExpenses = async () => {
                
        const response = await axios.get('/c_weeks');
        setWeek(response.data);

        const response2 = await axios.get('/tx_types');
        setTxType(response2.data);

        const response4 = await axios.get('/classifications');
        setClassification(response4.data);

        const {data} = await axios.get(`/expenses/${id_expenses}`);

        setDetail(data.detail);
        setValue(data.value);
        setIdPerson(data.user.id_person);
        setIdClassification(data.classification.id_classification);
        setIdWeek(data.week.id_week);
        setIdTxType(data.tx_type.id_tx_type);
    }


    useEffect(() =>  {getExpenses(); getUsers();}, [id_expenses]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`/expenses/${id_expenses}`, {
            detail,
            value,
            id_classification,
            id_week,
            id_person,
            id_tx_type
        });
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to = "/expenses" />
    }
    
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Week</label>
                    <select className="form-control" required 
                    value={id_week}
                    onChange={e => setIdWeek(e.target.value)}>
                    <option value={''}>Please select an option -</option>    
                    {week.map((w: Week)=> {
                        return (
                            <option key={w.id_week} value={w.id_week}>{w.name} from {w.date_s} to {w.date_s}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Classification</label>
                    <select className="form-control" required 
                    value={id_classification}
                    onChange={e => setIdClassification(e.target.value)}>
                    <option value={''}>Please select an option -</option>    
                    {classification.map((c: Classification)=> {
                        return (
                            <option key={c.id_classification} value={c.id_classification}>{c.type} - {c.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <input className="form-control" required 
                    defaultValue={detail}
                    onChange={e => setDetail(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label>Subclassification</label>
                    <select className="form-control" required 
                    value={id_tx_type}
                    onChange={e => setIdTxType(e.target.value)}>
                    <option value={''}>Please select an option -</option>    
                    {tx_type.map((tx: Tx_type)=> {
                        return (
                            <option key={tx.id_tx_type} value={tx.id_tx_type}>{tx.desc_tx_type}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label>User</label>
                    <select className="form-control" required 
                    value={id_person}
                    onChange={e => setIdPerson(e.target.value)}>
                    <option value={''}>Please select an option -</option>    
                    {users.map((u: User)=> {
                        return (
                            <option key={u.id_person} value={u.id_person}>{u.name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Total</label>
                    <input type="number" className="form-control" required 
                    defaultValue={value}
                    onChange={e => setValue(e.target.value)}></input>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
    );
    
}

export default ExpensesEdit;