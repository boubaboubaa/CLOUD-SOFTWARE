import React, { useState } from 'react';

function RoutineItem({ routine, onDelete, onUpdate }) {
    const [editedRoutine, setEditedRoutine] = useState({
        titre: routine.titre,
        difficulte: routine.difficulte,

        rep: routine.rep,
        poids: routine.poids
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRoutine({ ...editedRoutine, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(routine.id, editedRoutine);
    };

    return (
        <li>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titre" value={editedRoutine.titre} onChange={handleInputChange} />
                <input type="text" name="difficulte" value={editedRoutine.difficulte} onChange={handleInputChange} />

                <input type="text" name="rep" value={editedRoutine.rep} onChange={handleInputChange} />
                <input type="text" name="poids" value={editedRoutine.poids} onChange={handleInputChange} />
                <button type="submit">Update</button>
            </form>
            <button onClick={() => onDelete(routine.id)}>Delete</button>
        </li>
    );
}

export default RoutineItem;
