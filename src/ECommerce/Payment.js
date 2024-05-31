import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { amount, namebar, email, contact } from './slice';


function Payment(props) {
  const [amount, setAmount] = useState('');
  const username = useSelector((s)=> s.namebar1.value);
  const useremail = useSelector((s)=> s.emailOfUser.value);
  const usercontact = useSelector((s)=> s.contactOfUser.value);
  const amountamount= useSelector((s)=> s.amount.value );

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = document.getElementById("amount").value;
    console.log(value);
    if (value === "") {
      alert("Please enter amount");
    } else {
      var options = {

        key: "rzp_test_7j1HC9SImUvbdo",
        key_secret: "RHvjXFdPUyNfZAyMiKhM9ut0",
        amount: value * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "For testing purpose",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: username,
          email: useremail,
          contact: usercontact
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }

  return (
    <>
    <Header></Header>
    <div className="payment-container" style={{marginTop:"10px"}}>
      <h2 className="payment-title">Razorpay Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="amount"
          placeholder="Enter Amount"
          value={amountamount} // Set the value of the input field to the total prop
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
}

export default Payment;
