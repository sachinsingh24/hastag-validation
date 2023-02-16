/** @format */

'use strict';

//variables

const username = document.getElementById('username');
const email = document.getElementById('email');
const number = document.getElementById('number');
const dob = document.getElementById('dob');
const UserArr = [username, email, number, dob];
const validate = document.querySelectorAll('small');
let form = document.querySelector('#myForm');
let tableBody = document.querySelector('#myList');

// functions
let inputVal = [];
let users = [];
// report InputNames as error or success
const ShowMsg = (input, InputName, error) => {
  let formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = InputName;
  if (error == 1) {
    formControl.className = 'form-control error-1';
  } else if (error == 2) {
    formControl.className = 'form-control error';
  } else {
    formControl.className = 'form-control succuss';
  }
};

// place first letter as caplital of id name
const InputName = (input) => {
  const errorMsg = input.id.replace(/-p/, 'P');
  return errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
};

// check username value is satisfied or not
const checkUsername = (input, min, max) => {
  if (input.value.length < min) {
    ShowMsg(
      input,
      `${InputName(
        input
      )} Must be atleast ${min} characters maximum ${min} characters`,
      1
    );
  } else if (input.value.length > max) {
    ShowMsg(
      input,
      `${InputName(input)} should not be more then ${max} Charecters`,
      1
    );
  } else {
    ShowMsg(input, '✔', 0);
  }
};

// check user email is valid or not
const checkEmail = (input) => {
  const email_Id =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email_Id.test(String(input.value).toLowerCase().trim())) {
    ShowMsg(input, '✔', 0);
  } else {
    ShowMsg(input, `${InputName(input)} is not Valid`, 1);
  }
};

// check user phone Number is satisfied or not
const checkNumber = (input) => {
  const check = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (input.value.match(check)) {
    ShowMsg(input, '✔', 0);
  } else {
    ShowMsg(input, `${InputName(input)} must be 10 Digit`, 1);
  }
};

// check Date Of Birth must be 18 or older to use this site
const checkDob = () => {
  const dateOfBirth = new Date(dob.value); // replace with actual date of birth
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  if (dateOfBirth <= eighteenYearsAgo) {
    // Person is 18 years or older
    ShowMsg(dob, '✔', 0);
  } else {
    // Person is younger than 18
    ShowMsg(dob, `You must be 18 or older to use this site`, 1);
  }
};

// check user input is given or not
const checkRequired = (inputArr) => {
  let inputVal = [];
  inputArr.forEach((Arr) => {
    let formControl = Arr.parentElement;
    const validate = formControl.querySelector('small');
    if (Arr.value == '') {
      ShowMsg(Arr, `${InputName(Arr)} is required`, 2);
    }
    if (validate.innerText == '✔') {
      inputVal.push(Arr.value);
    }
  });
  if (inputVal.length == 4) {
    const userData = {
      name: inputVal[0],
      email: inputVal[1],
      phone: inputVal[2],
      date: inputVal[3],
    };
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    form.reset();
    inputVal.splice(0, inputVal.length);
    listInvoke();
  }
};

const listInvoke = () => {

while (tableBody.firstChild) {
  tableBody.removeChild(tableBody.firstChild);
  }
  const data = JSON.parse(localStorage.getItem('users'));
  console.log(data);
  data.forEach((obj) => {
    const row = document.createElement('tr');
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      const td = document.createElement('td');
      const text = document.createTextNode(obj[key]);
      td.appendChild(text);
      row.appendChild(td);
    });
    // tableBody.replaceChild(row,row);
    tableBody.appendChild(row);

  });
};

// Event-listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkUsername(username, 3, 20);
  checkEmail(email);
  checkNumber(number);
  checkDob(dob);
  checkRequired(UserArr);
});

