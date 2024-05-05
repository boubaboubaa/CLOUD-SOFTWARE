import React, { useState } from 'react';

function AddRoutineForm({ onAddRoutine }) {
    const [routineData, setRoutineData] = useState({ titre: '', niveauActivite: 0, objectifs: '', preferences: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoutineData({ ...routineData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddRoutine(routineData);
        setRoutineData({ titre: '', niveauActivite: 0, objectifs: '', preferences: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="titre" value={routineData.titre} onChange={handleChange} placeholder="Titre" />
            <input type="number" name="niveauActivite" value={routineData.niveauActivite} onChange={handleChange} placeholder="Niveau d'activité" />
            <input type="text" name="objectifs" value={routineData.objectifs} onChange={handleChange} placeholder="Objectifs" />
            <input type="text" name="preferences" value={routineData.preferences} onChange={handleChange} placeholder="Préférences" />
            <button type="submit">Ajouter Routine</button>
        </form>
    );
}

export default AddRoutineForm;
