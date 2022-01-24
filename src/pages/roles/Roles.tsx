import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('/roles');
                setRoles(data);
            }
        )();
    }, []);

    const del = async (id_role:number) => {
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`/roles/${id_role}`);

            setRoles(roles.filter((u: Role) => u.id_role !== id_role));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                    <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {roles.map((role: Role) =>  {
                                return (
                                    <tr key={role.id_role}>
                                        <td>{role.id_role}</td>
                                        <td>{role.name}</td>
                                        <td width="10%">
                                            <div className="btn-group mr-2">
                                                <Link to = {`/roles/${role.id_role}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            </div>
                                            <div className="btn-group mr-2">
                                                <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => del(role.id_role)}
                                                >Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                                
                            }
                        
                        </tbody>
                    </table>
                </div>
        </Wrapper>
    );
};

export default Roles;