const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    type: {
        //True/1 means the type is exercise while False/0 means the type is meal
        type: Boolean,
        default: 1,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    /*isPremium: {
        type: mongoose.Schema.Premium,
        ref: 'Account'
    },*/
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

PlanSchema.statics.toApi = (doc) => ({
    name: doc.name,
    type: doc.type,
});

const PlanModel = mongoose.model('Plan', PlanSchema);
module.exports = PlanModel;