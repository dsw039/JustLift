const models = require('../models');
const Plan = models.Plan;

const makerPage = (req, res) => {
    return res.render('app');
};

const makePlan = async (req, res) => {
    if(!req.body.name || !req.body.type) {
        return res.status(400).json({ error: 'Both name and type are required!' });
    }

    const planData = {
        name: req.body.name,
        type: req.body.type,
        owner: req.session.account._id,
    };

    try{
        const newPlan = new Plan(planData);
        await newPlan.save();
        return res.status(201).json({name: newPlan.name, type: newPlan.type});
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({error: 'Plan already exists!' });
        }
        return res.status(500).json({error: 'An error occured making plan!' });
    }
}

const getPlans = async (req, res) => {
    try{
        const query = {owner: req.session.account._id};
        const docs = await Plan.find(query).select('name type').lean().exec();

        return res.json({plans: docs});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Error retrieving plans!'});
    }
};

module.exports = {
    makerPage,
    makePlan,
    getPlans,
};