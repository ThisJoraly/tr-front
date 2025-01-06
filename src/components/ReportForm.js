import React, { useState, useEffect } from 'react';
import GeneratePDF from './GeneratePDF';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportForm = () => {
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        api.get('/cars').then(response => {
            setCars(response.data);
        });

        api.get('/drivers').then(response => {
            setDrivers(response.data);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Сгенерировать PDF Отчёт</h1>
            <div className="mb-3">
                <label className="form-label">Начальная дата:</label>
                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Конечная дата:</label>
                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <GeneratePDF cars={cars} drivers={drivers} startDate={startDate} endDate={endDate} />
        </div>
    );
};

export default ReportForm;
