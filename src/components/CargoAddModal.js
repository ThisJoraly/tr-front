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
                <Modal.Title>Add New Cargo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="cargoType">
                        <Form.Label>Cargo Type</Form.Label>
                        <Form.Control type="text" name="cargoType" value={formData.cargoType} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="cargoWeight">
                        <Form.Label>Cargo Weight</Form.Label>
                        <Form.Control type="number" name="cargoWeight" value={formData.cargoWeight} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="cargoVolume">
                        <Form.Label>Cargo Volume</Form.Label>
                        <Form.Control type="number" name="cargoVolume" value={formData.cargoVolume} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderId">
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control type="text" name="orderId" value={formData.orderId} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CargoAddModal;
