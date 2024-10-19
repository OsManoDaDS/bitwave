import React from 'react';
import '../pages/Dashboard/styles.css';

const DashboardCard = ({ title, description, onClick }) => {
    return (
        <div className="dashboard-card" onClick={onClick}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default DashboardCard;
