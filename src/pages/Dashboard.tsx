import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import BarChart from '../Charts/BarChart';
import BarChartDebt from '../Charts/BarChartDebt';
import axios from 'axios';
import DoughnutChart from '../Charts/DoughnutChart';
import DoughnutChartKind from '../Charts/DoughnutChartKind';
import ChartLine from '../Charts/ChartLine';
import BarChartIncomes from '../Charts/BarChartIncomes';

const Dashboard = () => {
    
    const [incomes, setIncomes] = useState<any[]>([]);
    const [expenses, setExpenses] = useState<any[]>([]);
    const [iniDebt, setInitDebt] = useState<any[]>([]);
    const [curDebt, setCurDebt] = useState<any[]>([]);
    const [bank, setBank] = useState<any[]>([]);
    const [week, setWeek] = useState<any[]>([]);

    const fetchSaving = async () => {
        try {
            const res5 = await axios.get('/chartWeek');
            setWeek(res5.data);

            const res = await axios.get('/chartBank');
            setBank(res.data);

            const res2 = await axios.get('/chartCurrentDebt');
            setCurDebt(res2.data);

            const res3 = await axios.get('/chartInitialDebt');
            setInitDebt(res3.data);

            const res6 = await axios.get('/chartIncomesW');
            setIncomes(res6.data);

            const res4 = await axios.get('/chartOutcomesW');
            setExpenses(res4.data);


          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {fetchSaving();}, []);
        
    return (
        <Wrapper>
           <div className="d-flex"><h4>Accounting for {week.map((x) => x.name)} From {week.map((x) => x.date_s)} to {week.map((x) => x.date_f)}</h4></div>
                <div className="row justify-content-center">
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Incomes</div>
                            <div className="card-body">
                                <h5 className="card-title">{incomes.map((x) => x.incomesw)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Expenses</div>
                            <div className="card-body">
                                <h5 className="card-title">{expenses.map((x) => x.expensesw)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Initial Debt</div>
                            <div className="card-body">
                                <h5 className="card-title">{iniDebt.map((x) => x.iniDeb)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Current Debt</div>
                            <div className="card-body">
                                <h5 className="card-title">{curDebt.map((x) => x.curDeb)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Last balance</div>
                            <div className="card-body">
                                <h5 className="card-title">{bank.map((x) => x.ant)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 card rounded border-0">
                        <div className="card text-center bg-white mt-2 mb-2">
                            <div className="card-header">Current balance</div>
                            <div className="card-body">
                                <h5 className="card-title">{bank.map((x) => x.cur)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 card rounded border-0">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Savings</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><BarChart /></div>
                            </div>
                        </div> 
                    </div>
                    <div className="col-6 card rounded border-0">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Financial obligation</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><BarChartDebt /></div>
                            </div>
                        </div> 
                    </div>     
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 card rounded border-0">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Incomes vs Outcomes</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><ChartLine /></div>
                            </div>
                        </div> 
                    </div>   
                    <div className="col-6 card rounded border-0">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Incomes</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><BarChartIncomes /></div>
                            </div>
                        </div> 
                    </div>  
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 card rounded border-0">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Expense classification</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><DoughnutChartKind /></div>
                            </div>
                        </div> 
                    </div>
                    <div className="col-6 card rounded border-0 style='height: 8rem'">
                        <div className="card text-center bg-light mb-2">
                            <div className="card-header">Expenses per Week</div>
                            <div className="card-body">
                                <div className="card rounded bg-white "><DoughnutChart /></div>
                            </div>
                        </div> 
                    </div>     
                </div>
        </Wrapper>
    )   
}

export default Dashboard;