const User = require('../models/user');
const Routine = require('../models/routine');

// obtain details
exports.getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate('routines');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// add a routine
exports.addRoutine = async (req, res) => {
    try {
        const { titre, niveauActivite, objectifs, preferences, exercices } = req.body;
        const routine = new Routine({ titre, niveauActivite, objectifs, preferences, exercices });
        await routine.save();
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.routines.push(routine);
        await user.save();
        res.status(201).json({ message: 'Routine ajoutée avec succès', routine });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// update a routine
exports.updateRoutine = async (req, res) => {
    try {
        const { routineId } = req.params; // checking url's parameters
        const { titre, niveauActivite, objectifs, preferences, exercices } = req.body;
        const routine = await Routine.findByIdAndUpdate(routineId, {
            titre, niveauActivite, objectifs, preferences, exercices
        }, { new: true });
        if (!routine) {
            return res.status(404).json({ message: 'Routine non trouvée' });
        }
        res.status(200).json({ message: 'Routine mise à jour avec succès', routine });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};

// delete a routine
exports.deleteRoutine = async (req, res) => {
    try {
        const { routineId } = req.params;
        const routine = await Routine.findByIdAndRemove(routineId);
        if (!routine) {
            return res.status(404).json({ message: 'Routine non trouvée' });
        }
        res.status(200).json({ message: 'Routine supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error: error.message });
    }
};
