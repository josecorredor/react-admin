import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Expense } from '../../models/expense';

const Expenses = () => {

    const [expenses, setExpenses] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [last_page, setLastPage] = useState(0);


    useEffect (() => {
        (
            async () => {
                const {data} = await axios.get(`/expenses?page=${page}`);
                setExpenses(data.data);
                setLastPage(data.meta.last_page);
            }
        )()

    },[page]);


    const del = async (id_expenses: number) => {
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`/expenses/${id_expenses}`);
            
            setExpenses(expenses.sort((a,b) => (a.id_expenses > b.id_expenses ? 1 : -1)));
            setExpenses(expenses.filter((e: Expense) => e.id_expenses !== id_expenses));

        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/expenses/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>

            <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Week</th>
                    <th>Classification</th>
                    <th>Description</th>
                    <th>Subclassification</th>
                    <th>User</th>
                    <th>Value</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {expenses.map((expense: Expense)=>{

                        return(
                            <tr key={expense.id_expenses}>
                                <td>{expense.id_expenses}</td>
                                <td>{expense.week.name} from {expense.week.date_s} to {expense.week.date_f}</td>
                                <td>{expense.classification.name}</td>
                                <td>{expense.detail}</td>
                                <td>{expense.tx_type.desc_tx_type} - {expense.classification.TYPE_E}</td>
                                <td>{expense.user.name} {expense.user.last_name}</td>
                                <td>{expense.value}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to = {`/expenses/${expense.id_expenses}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => del(expense.id_expenses)}
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
};

export default Expenses;