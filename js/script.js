
function date() {

    var now = new Date();
 
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dates = [' ', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st', '32nd'];
 
    month = now.getMonth();
    day = now.getDate();
    year = now.getFullYear();
 
    document.getElementById('monthday').innerHTML = 'Days Counted in ' + months[month] + ' ' + dates[day] + ''+ ', ' + year;
 
};
 
date();

const displayTotal = document.getElementById('total');
const form = document.getElementById('form');
const firstDateInput = document.getElementById('firstDateInput');
const secondDateInput = document.getElementById('secondDateInput');
const daysInput = document.getElementById('daysInput');
const addBtn = document.getElementById('addBtn');
const tbodyTable = document.getElementById('tbodyTable');

const displayAllDatesOnScreen = [
    
];

let allDatesDisplayed = displayAllDatesOnScreen;

// Get all datas and display on the DOM
function addToTable(e) {
    e.preventDefault();

    const dateOne = new Date(firstDateInput.value);
    let day1 = dateOne.getUTCDate();
    let month1 = dateOne.getUTCMonth() + 1;
    let year1 = dateOne.getUTCFullYear();

    const dateTwo = new Date(secondDateInput.value);
    let day2 = dateTwo.getUTCDate();
    let month2 = dateTwo.getUTCMonth() + 1;
    let year2 = dateTwo.getUTCFullYear();

    if (day1 < 10 ) {
        day1 = '0' + day1;
    }
  
    if (month1 < 10) {
        month1 = '0' + month1;
    }
  
    if (day2 < 10 ) {
        day2 = '0' + day2;
    }
  
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    if (firstDateInput.value.trim() === '' || secondDateInput.value.trim() === '') {
        alert('Choose your Date')
    } else {
        const addDatesToTable = {
            id: generateID(),
            date1: `${day1}/${month1}/${year1}`,
            date2: `${day2}/${month2}/${year2}`,
            totalDays: +daysInput.value,
        };

        allDatesDisplayed.push(addDatesToTable);

        addAllDatesDisplayed(addDatesToTable);

        updateDays();

        firstDateInput.value = '';
        secondDateInput.value = '';
        daysInput.value = '';
    }

}

// Calculate how many days there are between two dates and display on input number
function differenceDaysDate() {
    let dateFromInput1 = new Date(firstDateInput.value);
    let dateFromInput2 = new Date(secondDateInput.value);
    let resultDaysDate = parseInt((dateFromInput2 - dateFromInput1) / (24 * 3600 * 1000) + 1);
    return resultDaysDate;
}

function rangeDays() {
    if (secondDateInput) {
        daysInput.value = differenceDaysDate();    
    }
}


// Generate an ID for each row from the table
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// Add allDatesDisplayed's datas on the table
function addAllDatesDisplayed(bodyDate) {
    
    const item = document.createElement('tr');

    item.innerHTML = `
        <td><span class="firstdate">${bodyDate.date1}</span></td>
        <td><span class="secondDate">${bodyDate.date2}</span></td>
        <td><span class="rangeDays">${bodyDate.totalDays}</span></td>
        <td><a class="btn-floating btn-large waves-effect waves-light red" id="addBtn" onclick="deleteRowTable(${bodyDate.id})"><i class="material-icons">delete</i></a></td>
    `;

    tbodyTable.appendChild(item);
}

// Delete the row from the table
function deleteRowTable(id) {
    allDatesDisplayed = allDatesDisplayed.filter(bodyDate => bodyDate.id !== id);

    init();
}

// Updated the total of days calculated
function updateDays() {
    
    const allDays = allDatesDisplayed.map(bodyDate => bodyDate.totalDays);
    // const addingAllDays = allDays.reduce((accumulator, item) => (accumulator += item));
    const addingAllDays = allDays.reduce((accumulator, item) => (accumulator += item), 0);
    displayTotal.innerHTML = `${addingAllDays} Days`;
  
}

// Display the datas after click the button (a)
addBtn.addEventListener('click', addToTable);

// Initialization function
function init() {
    tbodyTable.innerHTML = '';

    allDatesDisplayed.forEach(addAllDatesDisplayed);
    updateDays();
}

init();
