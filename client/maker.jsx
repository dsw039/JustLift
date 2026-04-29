const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// lift plan added
const handlePlan = (e, onPlanAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#planName').value;
    //not age
    const type = e.target.querySelector('#planType').value;

    if(!name || !type) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name,type}, onPlanAdded);
    return false;
}

const PlanForm = (props) => {
    return(
        <form id="planForm"
            onSubmit={(e) => handlePlan(e, props.triggerReload)}
            name="planForm"
            action="/maker"
            method="POST"
            className="planForm"
            >
                <label htmlFor="name">Name: </label>
                <input id="planName" type="text" name="name" placeholder="Plan Name" />
                <label htmlFor="type">Type: </label>
                <select id="planType"  name="type">
                    <option value="1">Lift Plan</option>
                    <option value="2">Meal Plan</option>
                </select>
                <input className="makePlanSubmit" type="submit" value="Make Plan" />
            </form>
    );
};

const PlanList = (props) => {
    const [plans, setPlans] = useState(props.plans);

    useEffect(() => {
        const loadPlansFromServer = async () => {
            const response = await fetch('/getPlans');
            const data = await response.json();
            setPlans(data.plans);
        };
        loadPlansFromServer();
    }, [props.reloadPlans]);

    if(plans.length === 0) {
        return (
            <div className="plansList">
                <h3 className="emptyPlan">No Plans Yet!</h3>
            </div>
        );
    }

    //Will add an if statement(if planType = weight display a dumbell if planType = food display a plate)
    const planNodes = plans.map(plan => {
        if(plan.type == true) 
            return (
            <div key={plan.id} className="liftPlan">
                <img src="/assets/img/lPlan-logo.png" alt="Just-Lift" className="planFace" />
                <h3 className="planName">Name: {plan.name}</h3>
               <h3 className="planType">Type: Lift</h3>
            </div>
        ); else {
            return (
            <div key={plan.id} className="mealPlan">
                <img src="/assets/img/mPlan-logo.png" alt="Just-Lift" className="planFace" />
                <h3 className="planName">Name: {plan.name}</h3>
               <h3 className="planType">Type: Meal</h3>
            </div>
            );
        }

        
    });

    return (
        <div className="planList">
            {planNodes}
        </div>
    );
};

const App = () => {
    const[reloadPlans, setReloadPlans] = useState(false);

    return (
        <div>
            <div id="makePlan">
                <PlanForm triggerReload={() => setReloadPlans(!reloadPlans)} />
            </div>
            <div id="plans">
                <PlanList plans={[]} reloadPlans={reloadPlans} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;