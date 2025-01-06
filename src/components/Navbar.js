import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Грузоперевозки</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cars">Машины</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cargos">Грузы</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/clients">Клиенты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Заказы</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reports">Отчёты</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
