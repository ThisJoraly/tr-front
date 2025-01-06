import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CargoEditModal = ({ show, onHide, cargo, onSave }) => {
    const [formData, setFormData] = useState({
        cargoType: '',
        cargoWeight: '',
        cargoVolume: ''
    });

    useEffect(() => {
        if (cargo) {
            setFormData(cargo);
        }
    }, [cargo]);

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
                <Modal.Title>Edit Cargo</Modal.Title>
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

export default CargoEditModal;
