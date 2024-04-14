const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    age: { type: Number, required: true },
    niveauActivite: { type: Number, required: true },
    objectifs: { type: String, required: true },
    preferences: { type: String, required: true },
    routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
    password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
