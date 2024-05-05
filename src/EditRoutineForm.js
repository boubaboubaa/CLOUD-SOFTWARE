
import React, { useState } from 'react';

function EditRoutineForm({ routine, onEditRoutine }) {
    const [editedRoutine, setEditedRoutine] = useState({ ...routine });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRoutine({ ...editedRoutine, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditRoutine(editedRoutine);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="titre" value={editedRoutine.titre} onChange={handleChange} placeholder="Titre" />
            <input type="number" name="niveauActivite" value={editedRoutine.niveauActivite} onChange={handleChange} placeholder="Niveau d'activité" />
            <input type="text" name="objectifs" value={editedRoutine.objectifs} onChange={handleChange} placeholder="Objectifs" />
            <input type="text" name="preferences" value={editedRoutine.preferences} onChange={handleChange} placeholder="Préférences" />
            <button type="submit">Enregistrer les modifications</button>
        </form>
    );
}

export default EditRoutineForm;
