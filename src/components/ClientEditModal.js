import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ClientEditModal = ({ show, onHide, client, onSave }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientAddress: '',
        clientType: ''
    });

    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clientName">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="clientPhone">
                        <Form.Label>Client Phone</Form.Label>
                        <Form.Control type="text" name="clientPhone" value={formData.clientPhone} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="clientEmail">
                        <Form.Label>Client Email</Form.Label>
                        <Form.Control type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="clientAddress">
                        <Form.Label>Client Address</Form.Label>
                        <Form.Control type="text" name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="clientType">
                        <Form.Label>Client Type</Form.Label>
                        <Form.Control type="text" name="clientType" value={formData.clientType} onChange={handleChange} required />
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

export default ClientEditModal;
