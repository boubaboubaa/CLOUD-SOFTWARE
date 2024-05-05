import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(loginData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={loginData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
            <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;
