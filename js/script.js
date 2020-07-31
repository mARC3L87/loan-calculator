'use strict';
//listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(event){
  event.preventDefault();
  //hide results
  document.querySelector('#results').style.display = 'none';
  //show loader
  document.querySelector('img').style.display = 'block';
  setTimeout(calculateResults, 2000);
});
//calculate results
function calculateResults() {
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
    //show results
    document.querySelector('#results').style.display = 'block';
    //hide loader
    document.querySelector('img').style.display = 'none';
  } else {
    showError('Please check your numbers');
    //hide loader
    document.querySelector('img').style.display = 'none';
  }

}
//show error
function showError(error) {
  //create a div
  const errorDiv = document.createElement('div');
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //add class
  errorDiv.className = 'alert alert-danger';
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  //insert error above heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}
//clear error
function clearError() {
  document.querySelector('.alert').remove();
}
