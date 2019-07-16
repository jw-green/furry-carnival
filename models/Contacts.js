import mongoose from 'mongoose';

const Contacts = new mongoose.Schema({

}, {
    email_address: String,
    timestamps: true
}, );

export default mongoose.model('Contacts', Contacts);