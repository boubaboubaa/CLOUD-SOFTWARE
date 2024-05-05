

import React, { useState, useEffect } from 'react';
import RoutineItem from './RoutineItem'; // Import du composant RoutineItem
import './App.css';

function App() {
  const [signupData, setSignupData] = useState({
    username: '',
    nom: '',
    prenom: '',
    age: 0,
    niveauActivite: 1,
    objectifs: '',
    preferences: '',
    routines: [],
    password: ''
  });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newRoutine, setNewRoutine] = useState({ titre: '', difficulte: '', rep: '', poids: '' });
  const [userRoutines, setUserRoutines] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    if (isLoggedIn && loginData.username) {
      setCurrentUser(loginData.username);
      fetchUserRoutines(loginData.username);
    }
  }, [isLoggedIn, loginData.username]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.text();
      alert(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  const fetchUserRoutines = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/routines/${username}`);
      const routinesData = await response.json();
      setUserRoutines(routinesData);
    } catch (error) {
      console.error('Error fetching user routines:', error);
      alert('An error occurred while fetching user routines');
    }
  };

  const handleAddRoutine = async () => {
    try {
      const response = await fetch(`http://localhost:3001/addroutine/${currentUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoutine)
      });
      const data = await response.text();
      alert(data);
      fetchUserRoutines(currentUser); // Fetch updated user routines after adding new routine
      setNewRoutine({ titre: '', difficulte: '', rep: '', poids: '' }); // Clear input fields after adding routine
    } catch (error) {
      console.error('Error adding routine:', error);
      alert('An error occurred while adding routine');
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    try {
      const response = await fetch(`http://localhost:3001/routines/${currentUser}/${routineId}`, {
        method: 'DELETE'
      });
      const data = await response.text();
      alert(data);
      fetchUserRoutines(currentUser); // Fetch updated user routines after deleting routine
    } catch (error) {
      console.error('Error deleting routine:', error);
      alert('An error occurred while deleting routine');
    }
  };

  const handleUpdateRoutine = async (routineId, updatedRoutine) => {
    try {
      const response = await fetch(`http://localhost:3001/routines/${currentUser}/${routineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRoutine)
      });
      const data = await response.text();
      alert(data);
      fetchUserRoutines(currentUser); // Fetch updated user routines after updating routine
    } catch (error) {
      console.error('Error updating routine:', error);
      alert('An error occurred while updating routine');
    }
  };

  return (
      <div className="App">
        <h1>CertifiedBodybuilders</h1>
        <h4>The place where hypertrophy tracking is made easy!</h4>
        {!isLoggedIn && (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignup}>
                {/* Inputs pour le formulaire de signup */}
                <input type="text" placeholder="Username" value={signupData.username}
                       onChange={(e) => setSignupData({...signupData, username: e.target.value})}/>
                <input type="text" placeholder="Nom" value={signupData.nom}
                       onChange={(e) => setSignupData({...signupData, nom: e.target.value})}/>
                <input type="text" placeholder="Prénom" value={signupData.prenom}
                       onChange={(e) => setSignupData({...signupData, prenom: e.target.value})}/>
                <input type="text" placeholder="Age" value={signupData.age}
                       onChange={(e) => setSignupData({...signupData, age: e.target.value})}/>
                <input type="text" placeholder="Niveau d'activité" value={signupData.niveauActivite}
                       onChange={(e) => setSignupData({...signupData, niveauActivite: e.target.value})}/>
                <input type="text" placeholder="Objectifs" value={signupData.objectifs}
                       onChange={(e) => setSignupData({...signupData, objectifs: e.target.value})}/>
                <input type="text" placeholder="Préférences" value={signupData.preferences}
                       onChange={(e) => setSignupData({...signupData, preferences: e.target.value})}/>
                <input type="password" placeholder="Password" value={signupData.password}
                       onChange={(e) => setSignupData({...signupData, password: e.target.value})}/>
                <button type="submit">Sign Up</button>
              </form>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                {/* Inputs pour le formulaire de login */}
                <input type="text" placeholder="Username" value={loginData.username}
                       onChange={(e) => setLoginData({...loginData, username: e.target.value})}/>
                <input type="password" placeholder="Password" value={loginData.password}
                       onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
                <button type="submit">Login</button>
              </form>
              <h1>WikiMuscle!</h1>
              <a href="https://musclewiki.com/" target="_blank">
                <button>Check Me Out</button>
              </a>

              <h1>Contact Us</h1>
              <div className="features-caption">
                <h3>Phone</h3>
                <p>(90) 277 278 2566</p>
                <p> (78) 267 256 2578</p>

                <h3>Email</h3>
                <p>coach@certifiedb.com</p>
                <p> bouba@certifiedb.com</p>
              </div>
            </>
        )}
        {isLoggedIn && (
            <>
              <h2>Add New Routine</h2>
              {/* Inputs pour le formulaire d'ajout de routine */}
              <input type="text" placeholder="Titre" value={newRoutine.titre} onChange={(e) => setNewRoutine({ ...newRoutine, titre: e.target.value })} />
              <input type="text" placeholder="Difficulté" value={newRoutine.difficulte} onChange={(e) => setNewRoutine({ ...newRoutine, difficulte: e.target.value })} />

              <input type="text" placeholder="Rep" value={newRoutine.rep} onChange={(e) => setNewRoutine({ ...newRoutine, rep: e.target.value })} />
              <input type="text" placeholder="Poids" value={newRoutine.poids} onChange={(e) => setNewRoutine({ ...newRoutine, poids: e.target.value })} />
              <button onClick={handleAddRoutine}>Add Routine</button>
              <h2>Your Routines</h2>
              <ul>
                {userRoutines.map((routine, index) => (
                    <RoutineItem
                        key={index}
                        routine={routine}
                        onDelete={handleDeleteRoutine}
                        onUpdate={handleUpdateRoutine}
                    />
                ))}
              </ul>
            </>
        )}
      </div>
  );
}

export default App;
