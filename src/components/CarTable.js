import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CarAddModal from './CarAddModal';
import CarEditModal from './CarEditModal';

const CarTable = () => {
    const [cars, setCars] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        api.get('/cars').then(response => {
            setCars(response.data);
        });
    }, []);

    const handleEdit = (car) => {
        setSelectedCar(car);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        api.delete(`/cars/${id}`).then(() => {
            setCars(cars.filter(car => car.carId !== id));
        });
    };

    const handleSave = (updatedCar) => {
        if (updatedCar.carId) {
            api.put(`/cars/${updatedCar.carId}`, updatedCar).then(response => {
                setCars(cars.map(car => (car.carId === updatedCar.carId ? response.data : car)));
                setShowEditModal(false);
            });
        } else {
            api.post('/cars', updatedCar).then(response => {
                setCars([...cars, response.data]);
                setShowAddModal(false);
            });
        }
    };

    return (
        <div className="container mt-4">
            <h2>Автомобили</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Добавить авто</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Номер авто</th>
                    <th>Модель авто</th>
                    <th>Производитель</th>
                    <th>Грузоподъёмность</th>
                    <th>Пробег</th>
                    <th>Состояние</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {cars.map(car => (
                    <tr key={car.carId}>
                        <td>{car.carNumber}</td>
                        <td>{car.carModel}</td>
                        <td>{car.carBrand}</td>
                        <td>{car.carCapacity} кг</td>
                        <td>{car.carMileage}</td>
                        <td>{car.carCondition}</td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(car)}>Изм.</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(car.carId)}>Удал.</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showAddModal && (
                <CarAddModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleSave}
                />
            )}
            {showEditModal && (
                <CarEditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    car={selectedCar}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default CarTable;
