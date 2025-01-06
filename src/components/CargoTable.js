import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CargoAddModal from './CargoAddModal';
import CargoEditModal from './CargoEditModal';

const CargoTable = () => {
    const [cargos, setCargos] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState(null);

    useEffect(() => {
        api.get('/cargos').then(response => {
            setCargos(response.data);
        });
    }, []);

    const handleEdit = (cargo) => {
        setSelectedCargo(cargo);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        api.delete(`/cargos/${id}`).then(() => {
            setCargos(cargos.filter(cargo => cargo.cargoId !== id));
        });
    };

    const handleSave = (updatedCargo) => {
        if (updatedCargo.cargoId) {
            api.put(`/cargos/${updatedCargo.cargoId}`, updatedCargo).then(response => {
                setCargos(cargos.map(cargo => (cargo.cargoId === updatedCargo.cargoId ? response.data : cargo)));
                setShowEditModal(false);
            });
        } else {
            api.post('/cargos', updatedCargo).then(response => {
                setCargos([...cargos, response.data]);
                setShowAddModal(false);
            });
        }
    };

    return (
        <div className="container mt-4">
            <h2>Грузы</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Добавить груз</button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Тип груза</th>
                    <th>Вес груза</th>
                    <th>Объём груза</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {cargos.map(cargo => (
                    <tr key={cargo.cargoId}>
                        <td>{cargo.cargoType}</td>
                        <td>{cargo.cargoWeight}</td>
                        <td>{cargo.cargoVolume}</td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(cargo)}>Изм.</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cargo.cargoId)}>Удал.</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showAddModal && (
                <CargoAddModal
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleSave}
                />
            )}
            {showEditModal && (
                <CargoEditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    cargo={selectedCargo}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default CargoTable;
