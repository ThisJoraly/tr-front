import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalForm = ({ show, onHide, car, cargo, client, order, onSave }) => {
    const [formData, setFormData] = useState({
        carNumber: '',
        carModel: '',
        carBrand: '',
        carCapacity: '',
        carMileage: '',
        carCondition: ''
    });

    useEffect(() => {
        if (car) {
            setFormData(car);
        } else if (cargo) {
            setFormData(cargo);
        } else if (client) {
            setFormData(client);
        } else if (order) {
            setFormData(order);
        } else {
            setFormData({
                carNumber: '',
                carModel: '',
                carBrand: '',
                carCapacity: '',
                carMileage: '',
                carCondition: ''
            });
        }
    }, [car, cargo, client, order]);

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
                <Modal.Title>{car ? 'Edit Car' : cargo ? 'Edit Cargo' : client ? 'Edit Client' : order ? 'Edit Order' : 'Add New Car'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {car && (
                        <>
                            <Form.Group controlId="carNumber">
                                <Form.Label>Car Number</Form.Label>
                                <Form.Control type="text" name="carNumber" value={formData.carNumber} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="carModel">
                                <Form.Label>Car Model</Form.Label>
                                <Form.Control type="text" name="carModel" value={formData.carModel} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="carBrand">
                                <Form.Label>Car Brand</Form.Label>
                                <Form.Control type="text" name="carBrand" value={formData.carBrand} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="carCapacity">
                                <Form.Label>Car Capacity</Form.Label>
                                <Form.Control type="number" name="carCapacity" value={formData.carCapacity} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="carMileage">
                                <Form.Label>Car Mileage</Form.Label>
                                <Form.Control type="number" name="carMileage" value={formData.carMileage} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="carCondition">
                                <Form.Label>Car Condition</Form.Label>
                                <Form.Control type="text" name="carCondition" value={formData.carCondition} onChange={handleChange} required />
                            </Form.Group>
                        </>
                    )}
                    {cargo && (
                        <>
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
                        </>
                    )}
                    {client && (
                        <>
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
                        </>
                    )}
                    {order && (
                        <>
                            <Form.Group controlId="clientId">
                                <Form.Label>Client</Form.Label>
                                <Form.Control as="select" name="clientId" value={formData.clientId} onChange={handleChange}>
                                    {/* Options for clients */}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="operatorId">
                                <Form.Label>Operator</Form.Label>
                                <Form.Control as="select" name="operatorId" value={formData.operatorId} onChange={handleChange}>
                                    {/* Options for operators */}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="flightId">
                                <Form.Label>Flight</Form.Label>
                                <Form.Control as="select" name="flightId" value={formData.flightId} onChange={handleChange}>
                                    {/* Options for flights */}
                                </Form.Control>
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
                        </>
                    )}
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

export default ModalForm;
