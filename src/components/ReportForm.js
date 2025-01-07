import React, { useState, useEffect } from 'react';
import GeneratePDF from './GeneratePDF';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportForm = () => {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await api.get('/orders');
                setOrders(ordersResponse.data);
                setLoading(false);

                console.log('Orders:', ordersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Создать PDF отчёт заказов</h1>
            <div className="mb-3">
                <label className="form-label">Начальная дата:</label>
                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Конечная дата:</label>
                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <GeneratePDF
                    orders={orders}
                    startDate={startDate}
                    endDate={endDate}
                />
            )}
        </div>
    );
};

export default ReportForm;
