//=============================================================================
// StandardModel.js
// -> Exemplifies a standard schema using Mongoose.
//=============================================================================

import mongoose from 'mongoose';

const StandardModel = new mongoose.Schema({

    // 
    // <field_name>: {
    //     type: <type> | String, Number, Object, etc.,
    //     required: true,
    // }
    // 
    // <field_name>: <type> | String, Number, Object, etc.,
    //
    // -------------------------------------------------------
    // Example
    // -------------------------------------------------------
    // 
    // title: {
    //     type: String,
    //     required: true,
    // }
    // 
    // tags: [String]
}, 
{ timestamps: true }, 
);

export default mongoose.model('StandardModel', StandardModel);