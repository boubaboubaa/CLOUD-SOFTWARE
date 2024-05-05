import React, { useState } from 'react';

function SignupForm({ onSignup }) {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        username: '',
        age: 0,
        niveauActivite: 0,
        objectifs: '',
        preferences: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(userData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nom" value={userData.nom} onChange={handleChange} placeholder="Nom" />
            <input type="text" name="prenom" value={userData.prenom} onChange={handleChange} placeholder="Prénom" />
            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
            <input type="number" name="age" value={userData.age} onChange={handleChange} placeholder="Âge" />
            <input type="number" name="niveauActivite" value={userData.niveauActivite} onChange={handleChange} placeholder="Niveau d'activité" />
            <input type="text" name="objectifs" value={userData.objectifs} onChange={handleChange} placeholder="Objectifs" />
            <input type="text" name="preferences" value={userData.preferences} onChange={handleChange} placeholder="Préférences" />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Mot de passe" />
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default SignupForm;
