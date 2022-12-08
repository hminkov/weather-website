// const { response } = require("express")

//This is client side JS that needs to run into the browser 
console.log('Client side javascript file is loaded!')

//to make HTTP request from client side JavaScript we will use Fetch API
//Fetch API
//Fetch is not part of JavaScript. It is a browser based API which we can use in all modern browsers, but its
//not accessible in nodeJS. The code we write here will not be usable in node backend script.

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     }) 
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;
    //.then() --> promises
    fetch('http://localhost:3003/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        }) 
    })
})