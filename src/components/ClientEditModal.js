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
                <Modal.Title>Изменить данные клиента</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clientName">
                        <Form.Label>Имя клиента</Form.Label>
                        <Form.Control type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="clientPhone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="text" name="clientPhone" value={formData.clientPhone} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="clientEmail">
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="clientAddress">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control type="text" name="clientAddress" value={formData.clientAddress} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="clientType">
                        <Form.Label>Тип клиента</Form.Label>
                        <Form.Control type="text" name="clientType" value={formData.clientType} onChange={handleChange} required />
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

export default ClientEditModal;
