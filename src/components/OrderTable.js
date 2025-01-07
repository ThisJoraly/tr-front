import React, { useEffect, useState } from 'react';
import api from '../services/api';
import OrderAddModal from './OrderAddModal';
import OrderEditModal from './OrderEditModal';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        api.get('/orders').then(response => {
            setOrders(response.data);
        });
    }, []);

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        api.delete(`/orders/${id}`).then(() => {
            setOrders(orders.filter(order => order.orderId !== id));
        });
    };

    const handleSave = (updatedOrder) => {
        if (updatedOrder.orderId) {
            api.put(`/orders/${updatedOrder.orderId}`, updatedOrder).then(response => {
                setOrders(orders.map(order => (order.orderId === updatedOrder.orderId ? response.data : order)));
                setShowEditModal(false);
            });
        } else {
            api.post('/orders', updatedOrder).then(response => {
                setOrders([...orders, response.data]);
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

    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = new Date(a[sortConfig.key]);
        const bValue = new Date(b[sortConfig.key]);
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
            <h2>Заказы</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Добавить заказ</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Имя клиента</th>
                    <th>Оператор</th>
                    <th>Стартовая точка</th>
                    <th>Конечная точка</th>
                    <th onClick={() => handleSort('orderDispatchDate')} style={{ cursor: 'pointer' }}>
                        Отправка {sortConfig.key === 'orderDispatchDate' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('orderDeliveryDate')} style={{ cursor: 'pointer' }}>
                        Доставка {sortConfig.key === 'orderDeliveryDate' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {sortedOrders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.clientName}</td>
                        <td>{order.operatorName}</td>
                        <td>{order.orderStartpoint}</td>
                        <td>{order.orderEndpoint}</td>
                        <td>{new Date(order.orderDispatchDate).toLocaleDateString()}</td>
                        <td>{new Date(order.orderDeliveryDate).toLocaleDateString()}</td>
                        <td>{order.orderStatus}</td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(order)}>Изм.</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(order.orderId)}>Удал.</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showAddModal && (
                <OrderAddModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleSave}
                />
            )}
            {showEditModal && (
                <OrderEditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    order={selectedOrder}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default OrderTable;
