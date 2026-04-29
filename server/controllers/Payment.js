const models = require('../models');
const Account = models.Account;

const paymentPage = (req,res) => {
    return res.render('payment');
}

const goPremium = async (req,res) => {
    cardInfo = `${req.body.card}`;
    accountID = req.session.account._id;
    const account = await Account.findById(accountID);

    if(!cardInfo){
        return res.status(400).json({ error: 'Card Number required!' });
    } else if (cardInfo){
        await Account.findByIdAndUpdate(accountID, {premium: true});
        return res.json({ redirect: '/maker' });
    }
}

module.exports = {
    paymentPage,
    goPremium,
};
