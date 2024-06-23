import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './passwordprotection.css'; // Create a CSS file for styling

const PasswordProtection = ({ children, correctPassword, onPasswordCorrect }) => {
    const [password, setPassword] = useState('');

    const handlePasswordSubmit = () => {
        if (password === correctPassword) {
            onPasswordCorrect();
        } else {
            alert('Mot de passe incorrecte. Veuillez retaper votre mot de passe.');
            setPassword('');
        }
    };

    return (
        <div className="password-protection-container">
            <div className="password-protection-content">
                <p>Cette page est sécurisé par un mot de passe.</p>
                <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='button' onClick={handlePasswordSubmit}>Soumettre</button>
                {children}
            </div>
        </div>
    );
};

PasswordProtection.propTypes = {
    children: PropTypes.node,
    correctPassword: PropTypes.string.isRequired,
    onPasswordCorrect: PropTypes.func.isRequired,
};
export default PasswordProtection;
