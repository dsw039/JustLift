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
        type: Number,
        min: 0,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
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