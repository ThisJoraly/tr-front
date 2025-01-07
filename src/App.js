import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CarTable from './components/CarTable';
import CargoTable from './components/CargoTable';
import ClientTable from './components/ClientTable';
import OrderTable from './components/OrderTable';
import ReportForm from './components/ReportForm';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">

                <Routes>
                    <Route path="/cars" element={<CarTable />} />
                    <Route path="/cargos" element={<CargoTable />} />
                    <Route path="/clients" element={<ClientTable />} />
                    <Route path="/orders" element={<OrderTable />} />
                    <Route path="/reports" element={<ReportForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
