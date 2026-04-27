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
                <input id="planType" type="text"  name="type" />
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
        return (
            <div key={plan.id} className="plan">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="planName">Name: {plan.name}</h3>
                <h3 className="planType">Type: {plan.type}</h3>
            </div>
        );
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