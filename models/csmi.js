import mongoose from 'mongoose';

const Csmi = new mongoose.Schema({

}, {
    timestamps: true
}, );

export default mongoose.model('Csmi', Csmi);