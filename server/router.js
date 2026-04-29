const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/getPlans', mid.requiresLogin, controllers.Plan.getPlans);
    
    app.get('/login', mid.requiresSecure, mid.requiresLogout,  controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

    app.get('/logout', mid.requiresSecure, mid.requiresLogin, controllers.Account.logout);

   // app.post('/planType', mid.requiresLogin, controllers.Type.typePage);
   // app.post('/planType', mid.requiresLogin, controllers.Type.chooseType);

   app.get('/payment', mid.requiresLogin, controllers.Payment.paymentPage);
   app.post('/payment', mid.requiresLogin, controllers.Payment.goPremium);

    app.get('/maker', mid.requiresLogin, controllers.Plan.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Plan.makePlan);
    
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;