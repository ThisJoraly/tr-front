import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Chart } from 'chart.js/auto';

const GeneratePDF = ({ orders, startDate, endDate }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            // Уничтожение старого графика, если он существует
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Фильтрация данных по дате
            const filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.orderDispatchDate);
                return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
            });

            // Группировка данных по дате
            const groupedOrders = filteredOrders.reduce((acc, order) => {
                const date = new Date(order.orderDispatchDate).toLocaleDateString('ru-RU');
                if (!acc[date]) {
                    acc[date] = 0;
                }
                acc[date]++;
                return acc;
            }, {});

            const labels = Object.keys(groupedOrders);
            const data = Object.values(groupedOrders);

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Отправки заказов',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [orders, startDate, endDate]);

    const generate = () => {
        const doc = new jsPDF();

        // Добавление графика в PDF
        const imgData = chartRef.current.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 15, 40, 180, 160);

        // Сохранение PDF
        doc.save(`report_${startDate}_to_${endDate}.pdf`);
    };

    return (
        <div>
            <canvas ref={chartRef} width="600" height="400"></canvas>
            <button className="btn btn-primary" onClick={generate}>Создать PDF</button>
        </div>
    );
};

export default GeneratePDF;
