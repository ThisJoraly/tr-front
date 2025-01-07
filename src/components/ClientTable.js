import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ClientAddModal from './ClientAddModal';
import ClientEditModal from './ClientEditModal';

const ClientTable = () => {
    const [clients, setClients] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        api.get('/clients').then(response => {
            setClients(response.data);
        });
    }, []);

    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        api.delete(`/clients/${id}`).then(() => {
            setClients(clients.filter(client => client.clientId !== id));
        });
    };

    const handleSave = (updatedClient) => {
        if (updatedClient.clientId) {
            api.put(`/clients/${updatedClient.clientId}`, updatedClient).then(response => {
                setClients(clients.map(client => (client.clientId === updatedClient.clientId ? response.data : client)));
                setShowEditModal(false);
            });
        } else {
            api.post('/clients', updatedClient).then(response => {
                setClients([...clients, response.data]);
                setShowAddModal(false);
            });
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedClients = [...clients].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="container mt-4">
            <h2>Клиенты</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Добавить клиента</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Имя клиента</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Адрес</th>
                    <th onClick={() => handleSort('clientType')} style={{ cursor: 'pointer' }}>
                        Тип клиента {sortConfig.key === 'clientType' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {sortedClients.map(client => (
                    <tr key={client.clientId}>
                        <td>{client.clientName}</td>
                        <td>{client.clientPhone}</td>
                        <td>{client.clientEmail}</td>
                        <td>{client.clientAddress}</td>
                        <td>{client.clientType}</td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(client)}>Изм.</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(client.clientId)}>Удал.</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showAddModal && (
                <ClientAddModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleSave}
                />
            )}
            {showEditModal && (
                <ClientEditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    client={selectedClient}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default ClientTable;
