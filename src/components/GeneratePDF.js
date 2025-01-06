import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import timesnrcyrmt from '../services/timesnrcyrmt.ttf'; // Путь к вашему шрифту

const GeneratePDF = ({ cars, drivers, startDate, endDate }) => {
    const generate = async () => {
        const doc = new jsPDF();

        // Добавляем шрифт
        doc.addFileToVFS('timesnrcyrmt.ttf', timesnrcyrmt);
        doc.addFont('timesnrcyrmt.ttf', 'Times New Roman', 'normal');

        doc.setFont('Times New Roman');
        doc.setFontSize(12);
        doc.text('Transport company Report', 14, 22);

        // Добавляем таблицу
        const tableColumn = ["Car Number", "Car Model", "Car Brand", "Car Capacity", "Car Mileage", "Car Condition", "Last Maintenance Date", "Driver ID"];
        const tableRows = [];

        cars.forEach(car => {
            const carData = [
                car.carNumber,
                car.carModel,
                car.carBrand,
                car.carCapacity,
                car.carMileage,
                car.carCondition,
                new Date(car.carLastMaintenanceDate).toLocaleDateString('ru-RU'),
                car.driverId
            ];
            tableRows.push(carData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30
        });

        // Сохраняем PDF
        doc.save(`report_${startDate}_to_${endDate}.pdf`);
    };

    return (
        <button className="btn btn-primary" onClick={generate}>Generate PDF</button>
    );
};

export default GeneratePDF;
