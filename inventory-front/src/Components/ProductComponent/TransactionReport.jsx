import React from 'react';
import {useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import {getTransactionsByType} from '../../Services/TransactionService';
import { getRole} from '../../Services/LoginService';

const TransactionReport=()=>{
    const [transactions,setTransactions]=useState([]);
    const [role,setRole]=useState("");
    let navigate=useNavigate();
    let param=useParams();
    const [flag,setFlag]=useState("");

    const setTransactionData=()=>{
      getTransactionsByType(param.pid).then( response => {
         setTransactions(response.data);
         setFlag(param.pid);
         });
     }
 
    useEffect(() => {
      getRole().then( response => {
        setRole(response.data);
       });
     setTransactionData();
    }, []);
 
    const returnBack=()=>{
      if(role==="Admin")
        navigate('/admin-menu');
      else if(role==="Manager")
        navigate('/manager-menu');
    }
 
    return(
    <div className="text-center">
      <div>
        {
          flag==="IN" ? <h3 className="text-center"><u>Stock Purchase Report</u></h3>: <h3 className="text-center"><u>Stock Issue Report</u></h3>
        }    
       </div>
        <div className = "row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th> Transaction Id</th>
                <th>Product Id</th>
                <th>Rate </th>
                <th>Quantity</th>
                <th>Transaction Value</th>
                <th>User Id</th>
                <th>Transaction Date</th>
             </tr>
            </thead>
            <tbody>
             {
               transactions.map((transaction, index) => (
                <tr key = {transaction.transactionId}>
                  <td> {transaction.transactionId} </td>
                  <td> {transaction.productId} </td>
                  <td> {transaction.rate} </td>    
                  <td> {transaction.quantity} </td>
                  <td> {transaction.transactionValue} </td>  
                  <td> {transaction.userId}</td>
                  <td> {transaction.transactionDate}</td>
                </tr>                                        
                 ))
              }                        
            </tbody>
           </table>  
           <div>
            <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-danger">Return</button>
          </div>        
        </div>
      </div>
      );
    }
export default TransactionReport;