import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { User } from '../../models/user';

const Users = () => {

    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [last_page, setLastPage] = useState(0);


    useEffect (() => {
        (
            async () => {
                const {data} = await axios.get(`/users?page=${page}`);
                setUsers(data.data);
                setLastPage(data.meta.last_page);
            }
        )()

    },[page]);


    const del = async (id_person: number) => {
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`/users/${id_person}`);
            
            setUsers(users.sort((a,b) => (a.id_person > b.id_person ? 1 : -1)));
            setUsers(users.filter((u: User) => u.id_person !== id_person));

        }
    }
    
        return (
            <Wrapper>
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>

                <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Celuphone</th>
                        <th>Address</th>
                        <th>Goal</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User)=>{

                            return(
                                <tr key={user.id_person}>
                                    <td>{user.id_person}</td>
                                    <td>{user.name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.celuphone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.goal}</td>
                                    <td>{user.role.name}</td>
                                    <td>{user.active}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to = {`/users/${user.id_person}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        </div>
                                        <div className="btn-group mr-2">
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                            onClick={() => del(user.id_person)}
                                            >Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )

                        })}
                    
                    </tbody>
                </table>
                </div>

                <Paginator page={page} last_page={last_page} pageChanged={setPage}/> 
            </Wrapper>
        );
    
}

export default Users;