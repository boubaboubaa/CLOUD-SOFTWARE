const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    titre: String,
    niveauActivite: Number,
    objectifs: String,
    preferences: String,
    exercices: [{
        nom: String,
        repetitions: Number,
        series: Number,
        poids: Number
    }]
});

const Routine = mongoose.model('Routine', RoutineSchema);
module.exports = Routine;
