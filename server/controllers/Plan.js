const models = require('../models');
const Plan = models.Plan;
const Account = models.Account;

let isLift = true;

const makerPage = (req, res) => {
    return res.render('app');
};

const makePlan = async (req, res) => {
    let isLift = true;
    if(!req.body.name || !req.body.type) {
        return res.status(400).json({ error: 'Both name and type are required!' });
        
    }
      if(req.body.type == "1") {
              isLift = true;
            } else if(req.body.type == "2") {
                isLift = false;
            }
    const planData = {
        name: req.body.name,
        type: isLift,
        owner: req.session.account._id,
        //premium: req.session.account.premium
    };

    
    try{
        
        const newPlan = new Plan(planData);
        
        const own = await Account.findById(newPlan.owner);
        //console.log(newPlan.premium);
        console.log(own.premium);
        if(own.lPlanCount > 4 && !own.premium) {
            return res.status(400).json({ error: 'Lift Plan limit reached for free account!' });
        } else if(own.mPlanCount > 2 && !own.premium) {
            return res.status(400).json({ error: 'Meal Plan limit reached for free account!' });
        }
        await newPlan.save();
        if (isLift){
            await Account.findByIdAndUpdate(newPlan.owner,{$inc: {lPlanCount: 1}});
            console.log(own.lPlanCount);
            return res.status(201).json({name: newPlan.name, type: "Exercise"});
        } else {
            await Account.findByIdAndUpdate(newPlan.owner,{$inc: {mPlanCount: 1}});
            console.log(own.lPlanCount);
            return res.status(201).json({name: newPlan.name, type: "Meal"});
        }
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