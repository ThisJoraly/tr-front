import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

const OrderAddModal = ({ show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        clientId: '',
        operatorId: '',
        flightId: '',
        orderStartpoint: '',
        orderEndpoint: '',
        orderDispatchDate: '',
        orderDeliveryDate: '',
        orderStatus: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/orders', formData)
            .then(response => {
                onSave(response.data);
                onHide();
            })
            .catch(error => {
                console.error('Error adding order:', error);
            });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clientId">
                        <Form.Label>Client ID</Form.Label>
                        <Form.Control type="text" name="clientId" value={formData.clientId} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="operatorId">
                        <Form.Label>Operator ID</Form.Label>
                        <Form.Control type="text" name="operatorId" value={formData.operatorId} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="flightId">
                        <Form.Label>Flight ID</Form.Label>
                        <Form.Control type="text" name="flightId" value={formData.flightId} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderStartpoint">
                        <Form.Label>Start Point</Form.Label>
                        <Form.Control type="text" name="orderStartpoint" value={formData.orderStartpoint} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderEndpoint">
                        <Form.Label>End Point</Form.Label>
                        <Form.Control type="text" name="orderEndpoint" value={formData.orderEndpoint} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderDispatchDate">
                        <Form.Label>Dispatch Date</Form.Label>
                        <Form.Control type="date" name="orderDispatchDate" value={formData.orderDispatchDate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderDeliveryDate">
                        <Form.Label>Delivery Date</Form.Label>
                        <Form.Control type="date" name="orderDeliveryDate" value={formData.orderDeliveryDate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="orderStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" name="orderStatus" value={formData.orderStatus} onChange={handleChange} required />
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

export default OrderAddModal;
