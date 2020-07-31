'use strict';
//listen for submit
document.querySelector('#loan-form').addEventListener('submit', calculateResults);
//calculate results
function calculateResults(event) {
  event.preventDefault();
  console.log('calculating..');
  //ui variables
  const amount = document.querySelector('#amount');
  const interests = document.querySelector('#interests');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterests = document.querySelector('#total-interests');
  //calculation
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interests.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterests.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }

}

