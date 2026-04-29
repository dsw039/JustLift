const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');


const handlePayment = (e) => {
    e.preventDefault();
    helper.hideError();

    const cardInfo = e.target.querySelector('#card').value;

    if(!cardInfo) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {cardInfo});

    return false;
}


const PaymentWindow = (props) => {
    return (
        <form id="paymentForm"
            name="paymentForm"
            onSubmit={handlePayment}
            action=" /payment"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="Card"> Card Info: </label>
            <input id="card" type="number" name="card" placeholder="Just Type Zero" />
            <input className="formSubmit" type="submit" value="Pay now(not really)" />
        </form>
    );
};

const init = () => {

    const root = createRoot(document.getElementById('content'));

    root.render(<PaymentWindow />);
};

window.onload = init;