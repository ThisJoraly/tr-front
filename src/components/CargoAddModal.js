import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const CargoAddModal = ({ show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        cargoType: '',
        cargoWeight: '',
        cargoVolume: '',
        orderId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/cargos', formData)
            .then(response => {
                onSave(response.data);
                onHide();
            })
            .catch(error => {
                console.error('Error adding cargo:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый груз</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="cargoType">
                        <Form.Label>Тип груза</Form.Label>
                        <Form.Control type="text" name="cargoType" value={formData.cargoType} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="cargoWeight">
                        <Form.Label>Вес</Form.Label>
                        <Form.Control type="number" name="cargoWeight" value={formData.cargoWeight} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="cargoVolume">
                        <Form.Label>Объём</Form.Label>
                        <Form.Control type="number" name="cargoVolume" value={formData.cargoVolume} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderId">
                        <Form.Label>ID заказа</Form.Label>
                        <Form.Control type="text" name="orderId" value={formData.orderId} onChange={handleChange} required />
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

export default CargoAddModal;
