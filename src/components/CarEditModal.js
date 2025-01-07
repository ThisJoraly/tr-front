import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const CarEditModal = ({ show, onHide, car, onSave }) => {
    const [formData, setFormData] = useState({
        carNumber: '',
        carModel: '',
        carBrand: '',
        carCapacity: '',
        carMileage: '',
        carCondition: '',
        driverId: ''
    });

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        if (car) {
            setFormData(car);
        }
        api.get('/drivers').then(response => {
            setDrivers(response.data);
        });
    }, [car]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/cars/${formData.carId}`, formData)
            .then(response => {
                onSave(response.data);
                onHide();
            })
            .catch(error => {
                console.error('Error editing car:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить авто</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="carNumber">
                        <Form.Label>Номер машины</Form.Label>
                        <Form.Control type="text" name="carNumber" value={formData.carNumber} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="carModel">
                        <Form.Label>Модель</Form.Label>
                        <Form.Control type="text" name="carModel" value={formData.carModel} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="carBrand">
                        <Form.Label>Производитель</Form.Label>
                        <Form.Control type="text" name="carBrand" value={formData.carBrand} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="carCapacity">
                        <Form.Label>Грузоподъёмность</Form.Label>
                        <Form.Control type="number" name="carCapacity" value={formData.carCapacity} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="carMileage">
                        <Form.Label>Пробег</Form.Label>
                        <Form.Control type="number" name="carMileage" value={formData.carMileage} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="carCondition">
                        <Form.Label>Состояние</Form.Label>
                        <Form.Control type="text" name="carCondition" value={formData.carCondition} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="driverId">
                        <Form.Label>Водитель</Form.Label>
                        <Form.Control as="select" name="driverId" value={formData.driverId} onChange={handleChange} required>
                            {drivers.map(driver => (
                                <option key={driver.driverId} value={driver.driverId}>
                                    {driver.driverSurname} {driver.driverName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CarEditModal;
