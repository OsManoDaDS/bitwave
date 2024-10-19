import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Curso 1', inscritos: 40, completados: 24 },
    { name: 'Curso 2', inscritos: 30, completados: 13 },
    { name: 'Curso 3', inscritos: 20, completados: 8 },
];

const StatisticsChart = () => {
    return (
        <div className="chart-container">
            <h3 className="statistics-header">Estatísticas de Cursos</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inscritos" fill="#007bff" />
                    <Bar dataKey="completados" fill="#2c2c54" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatisticsChart;
