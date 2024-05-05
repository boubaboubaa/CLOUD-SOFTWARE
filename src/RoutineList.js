import React from 'react';

function RoutineList({ routines }) {
    return (
        <div>
            <h2>Liste des routines</h2>
            <ul>
                {routines.map(routine => (
                    <li key={routine.id}>
                        <h3>{routine.titre}</h3>
                        <p>Niveau d'activité: {routine.niveauActivite}</p>
                        <p>Objectifs: {routine.objectifs}</p>
                        <p>Préférences: {routine.preferences}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoutineList;
