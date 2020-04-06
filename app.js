import {$, createElement, createTextNode} from '/dom.js';
import{notNullOrEmpty, isValidNumeric, isValidDate} from '/validators.js';
import {Person} from '/person.js';


const createBtn = $('#btnCreate');
const txtFirstName = $('#txtFirstName');
const txtLastName = $('#txtLastName');
const txtDoB = $('#txtDoB');

let err = $('#errors');
let tb = $('#people');

let people = [];
let errors = [];

createBtn.addEventListener('click', addPerson);

function addPerson() {
    // Use ISO date string to avoid the offset causing incorrect day using date control
    let p = new Person(
        txtFirstName.value,
        txtLastName.value,
        new Date(`${txtDoB.value}T00:00:00`)
    );

    if(isValidPerson(p)){
        people.push(p);

        let tr = createElement('tr');
        let tdFirstName = createElement('td');
        let tdLastName = createElement('td');
        let tdAge = createElement('td');

        tdFirstName.innerHTML = p.firstName;
        tdLastName.innerHTML = p.lastName;
        tdAge.innerHTML = p.age();

        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdAge);
        tb.appendChild(tr);
        clearForm();
    } else{
        err.innerHTML = '';

        let ul = createElement('ul');

        errors.forEach(err => {
            let li = createElement('li');
            li.appendChild(createTextNode(err))
            ul.appendChild(li);
        });

        err.appendChild(ul)
    }
   
}

function clearForm() {
    txtFirstName.value = '';
    txtLastName.value = '';
    txtDoB.value=  '';
    err.innerHTML = '';
    txtFirstName.focus();
}

function isValidPerson(person) {
    errors = [];

    if(!notNullOrEmpty(person.firstName))
    errors.push('First name is required.');
    if(!notNullOrEmpty(person.lastName))
    errors.push('Last name is required.');
    if(!isValidDate(person.dateOfBirth))
    errors.push('Birthdate is invalid.');
    if(!isValidNumeric(person.age()))
    errors.push('Age is not valid.');

    return errors.length == 0;

}

const searchMsg = $('#searchMsg');
const searchTable = $('#search');
const txtSearch = $('#txtSearch');
const btn = $('#btnSearch');

btn.addEventListener('click', function(){
    searchMsg.innerHTML = '';
    let query = Person.searchPeople(txtSearch.value.trim().toLowerCase(), people);

    searchMsg.innerHTML = `<p><strong>${query.length}
    </strong> result(s) found for <strong>${txtSearch.value.trim()}
    </strong></p>`;

    searchTable.innerHTML = '';

    query.forEach(p => {
        let tr = createElement('tr');
        let tdFirstName = createElement('td');
        let tdLastName = createElement('td');
        let tdAge = createElement('td');

        tdFirstName.innerHTML = p.firstName;
        tdLastName.innerHTML = p.lastName;
        tdAge.innerHTML = p.age();

        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdAge);

        searchTable.appendChild(tr);
    });

    txtSearch.value = '';
})