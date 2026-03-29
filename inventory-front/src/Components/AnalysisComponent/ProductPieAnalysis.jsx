import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getProductWiseTotalSale } from '../../Services/TransactionService';
import '../../DisplayView.css';
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPieAnalysis = () => {
    let navigate = useNavigate();
    const [productSale, setProductSale] = useState([]);

    const setProductSaleData = () => {
        getProductWiseTotalSale().then((response) => {
            setProductSale(response.data);
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    };

    useEffect(() => {
        setProductSaleData();
    }, []);

    const chartData = {
        labels: productSale.map((p) => p.productName),
        datasets: [
            {
                data: productSale.map((p) => p.totalSaleValue),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    const returnBack = () => {
        navigate('/admin-menu');
    }


    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Product Sale Analysis Dashboard</h2>

            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px', alignItems: 'start'}}>
                    <div>
                        <h3 style={{color: '#2c3e50', fontWeight: '700', fontSize: '18px', marginBottom: '20px'}}>Product Sales Summary</h3>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Sales Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSale.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.productName}</td>
                                        <td>₹{Number(p.totalSaleValue).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <h3 style={{color: '#2c3e50', fontWeight: '700', fontSize: '18px', marginBottom: '20px', textAlign: 'center'}}>Sales Distribution</h3>
                        <div style={{width: '100%', maxWidth: '300px'}}>
                            <Pie data={chartData} options={{responsive: true, maintainAspectRatio: true}}/>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => returnBack()} className="return-btn">Return to Dashboard</button>
        </div>
    );


};

export default ProductPieAnalysis;