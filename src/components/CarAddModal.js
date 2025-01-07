import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const CarAddModal = ({ show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        carNumber: '',
        carModel: '',
        carBrand: '',
        carCapacity: '',
        carMileage: '',
        carCondition: '',
        driverId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/cars', formData)
            .then(response => {
                onSave(response.data);
                onHide();
            })
            .catch(error => {
                console.error('Error adding car:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый авто</Modal.Title>
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
                        <Form.Label>Грузоподьемность</Form.Label>
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
                        <Form.Label>ID водителя</Form.Label>
                        <Form.Control type="text" name="driverId" value={formData.driverId} onChange={handleChange} required />
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

export default CarAddModal;
