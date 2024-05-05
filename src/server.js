
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());
app.use(cors()); // Activer CORS pour toutes les routes

// Chemin d'accès au répertoire des utilisateurs
const usersDirectory = path.join(__dirname, 'data', 'users');

// Vérifier si le répertoire des utilisateurs existe, sinon le créer
if (!fs.existsSync(usersDirectory)) {
    fs.mkdirSync(usersDirectory, { recursive: true });
}
app.post('/signup', (req, res) => {
    const userData = req.body;
    const { username } = userData;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (fs.existsSync(userFilePath)) {
        return res.status(400).send('Nom d\'utilisateur déjà utilisé');
    }

    try {
        // Ajouter le tableau tasks avec une valeur initiale vide
        userData.tasks = [];
        // Stocker les données utilisateur dans un fichier individuel
        fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));
        res.send('Inscription réussie');
    } catch (error) {
        console.error('Erreur lors de la création du fichier utilisateur:', error);
        res.status(500).send('Erreur lors de l\'inscription');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        if (userData.password === password) {
            res.send('Connexion réussie');
        } else {
            res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier utilisateur:', error);
        res.status(500).send('Erreur lors de la connexion');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérifier si le fichier utilisateur existe
    if (!fs.existsSync(`./data/users/${username}.json`)) {
        return res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Charger les données utilisateur depuis le fichier
    const userData = JSON.parse(fs.readFileSync(`./data/users/${username}.json`, 'utf8'));

    // Vérifier les informations de connexion
    if (userData.password === password) {
        res.send('Connexion réussie');
    } else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
});

// Routes pour les routines
app.get('/routines/:username', (req, res) => {
    const { username } = req.params;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(404).send('Utilisateur non trouvé');
    }

    try {
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        const userRoutines = userData.routines;
        res.json(userRoutines);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier utilisateur:', error);
        res.status(500).send('Erreur lors de la récupération des routines de l\'utilisateur');
    }
});

app.post('/addroutine/:username', (req, res) => {
    const { username } = req.params;
    const routineData = req.body;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(404).send('Utilisateur non trouvé');
    }

    try {
        // Charger les données utilisateur depuis le fichier
        const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

        // Générer un ID unique pour la routine
        const routineId = Date.now().toString();

        // Ajouter l'ID à la routine
        const routineWithId = { id: routineId, ...routineData };

        // Ajouter la routine à l'utilisateur
        userData.routines.push(routineWithId);

        // Écrire les données utilisateur mises à jour dans le fichier
        fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

        res.send('Routine ajoutée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la routine:', error);
        res.status(500).send('Erreur lors de l\'ajout de la routine');
    }
});

app.put('/routines/:username/:id', (req, res) => {
    const { username, id } = req.params;
    const updatedRoutine = req.body;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(404).send('Utilisateur non trouvé');
    }

    try {
        // Charger les données utilisateur depuis le fichier
        let userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

        // Recherche de la routine à mettre à jour dans les routines de l'utilisateur
        const index = userData.routines.findIndex(routine => routine.id === id);

        if (index !== -1) {
            // Mise à jour de la routine
            userData.routines[index] = { id, ...updatedRoutine };

            // Écrire les données utilisateur mises à jour dans le fichier
            fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

            res.send('Routine mise à jour avec succès');
        } else {
            res.status(404).send('Routine non trouvée');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la routine:', error);
        res.status(500).send('Erreur lors de la mise à jour de la routine');
    }
});

app.delete('/routines/:username/:id', (req, res) => {
    const { username, id } = req.params;
    const userFilePath = path.join(usersDirectory, `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(404).send('Utilisateur non trouvé');
    }

    try {
        // Charger les données utilisateur depuis le fichier
        let userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

        // Filtrer les routines de l'utilisateur pour exclure celle à supprimer
        userData.routines = userData.routines.filter(routine => routine.id !== id);

        // Écrire les données utilisateur mises à jour dans le fichier
        fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));

        res.send('Routine supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de la routine:', error);
        res.status(500).send('Erreur lors de la suppression de la routine');
    }
});


app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
