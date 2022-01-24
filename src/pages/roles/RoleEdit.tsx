import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';

const RoleEdit = () => {

    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    let {id_role} = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('/permissions');
                setPermissions(response.data);

                const {data} = await axios.get(`/roles/${id_role}`);
                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id_permission));
            }
        )();
    }, []);

    const check = (id_permission: number) => {

        if(selected.some(s => s === id_permission)){
            setSelected(selected.filter(s => s !== id_permission));
            return;
        }
        setSelected([...selected, id_permission]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`/roles/${id_role}`, {
            name,
            permissions: selected
        });
        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to="/roles" />;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" 
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-3 mt-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return(
                                <div className="form-check form-check-inline col-3" key={p.id_permission}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.id_permission}
                                        checked={selected.some(s => s === p.id_permission)}
                                        onChange={() => check(p.id_permission)}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleEdit;