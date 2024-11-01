import React, { useState } from 'react';

const DashboardCard = ({ title, description, onClick, rating, showRating }) => {
    const [userRating, setUserRating] = useState(rating || 0); // Armazena a avaliação do usuário
    const [notification, setNotification] = useState('');

    const handleRating = (value) => {
        setUserRating(value);
        setNotification(`Você avaliou ${title} com ${value} estrela${value > 1 ? 's' : ''}.`);
        setTimeout(() => {
            setNotification('');
        }, 3000); // Notificação desaparece após 3 segundos
    };

    return (
        <div className="dashboard-card" onClick={onClick}>
            <h3>{title}</h3>
            <p>{description}</p>
            {showRating && (
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= userRating ? 'filled' : ''}`}
                            onClick={() => handleRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            )}
            {showRating && <p>Avaliação: {userRating} estrela{userRating > 1 ? 's' : ''}</p>}
            {notification && <p className="notification">{notification}</p>}
        </div>
    );
};

export default DashboardCard;
