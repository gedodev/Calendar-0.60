var selectedDays = [];
var unselectedDays = [];
var chosenWeekDayArray = [];
var currentMonthDays = [];
var daysToWork = [];
var leaveDays = [] //Holidays, sick leave, study leave, etc...

const date = new Date();

const renderCalendar = () => {

  date.setDate(1);

  const monthDays = document.querySelector(".days");
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //If you put 0 or negative values in day, start to go back to the days.
  const prevLastDay = new Date(date.getFullYear(), date.getMonth() , 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 6 - lastDayIndex;
  const months = [
    "January",  
    "February",  
    "March",  
    "April",  
    "May",  
    "June",  
    "July",  
    "August",  
    "September",  
    "October",  
    "November",  
    "December",
  ]

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  //Reset unselectedDays
  unselectedDays.forEach(x=>unselectedDays.splice(unselectedDays.indexOf(x)));

  if(new Date().getMonth() != date.getMonth()){
    document.querySelector(".date p").className = "otherMonth";
  } 


  let days = "";

  // Add the last days of the last month
  for(let x = firstDayIndex; x > 0 ;x--) {
    days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
    //x +=10 ==> x = x + 10
  }

  //Add the days of the current months
  for(let i = 1; i <= lastDay ;i++) {
    if(selectedDays.includes(i)){
      days += `<div class="day-select">${i}</div>`;
    } 
    else if(leaveDays.includes(i)){
      days += `<div class="leave-day">${i}</div>`;
    }
    else if(i === (new Date().getDate()) && (date.getMonth() === new Date().getMonth())){
      days += `<div class="today">${i}</div>`;
      unselectedDays.push(i)
    }
    else {
      days += `<div>${i}</div>`;
      unselectedDays.push(i)
    }
  }

  //Add the first days of the next months
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="next-month">${j}</div>`;
  }


  //Print the days.
  monthDays.innerHTML = days;
  
  //WeekEnd
  currentMonthDays = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"])');
  for(let w = 0; w < currentMonthDays.length; w++){
    let weekEnd = new Date(date.getFullYear(), date.getMonth(), w+1).getDay();
    if((weekEnd == 0 || weekEnd == 6) && (currentMonthDays[w].className == '')){
      currentMonthDays[w].className += 'no-work';
    }
    else if(weekEnd == 0 || weekEnd == 6){
      currentMonthDays[w].className += ' no-work';
    }
  }

  //Add the day-select class and event listener in each day
  daysToWork = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"]');
    
  for(let y = 0; y < daysToWork.length; y++){
    let day = parseInt(daysToWork[y].innerText);  
    daysToWork[y].addEventListener("click", () => {
      if (daysToWork[y].className == ""){
        selectedDays.push(day);
        selectedDays = selectedDays.filter((item, pos) => selectedDays.indexOf(item) == pos);
      }
      else if(daysToWork[y].className == "day-select"){
        leaveDays.push(day);
        selectedDays.splice(selectedDays.indexOf(day),1);
      }
      else if(daysToWork[y].className == "leave-day"){
        leaveDays.splice(leaveDays.indexOf(day),1);
      }
      //.today Cases
      else if(daysToWork[y].className == "today"){
        selectedDays.push(day);
      }
      else if(daysToWork[y].className.includes("day-select")){ 
        leaveDays.push(day);
        selectedDays.splice(selectedDays.indexOf(day),1);
      }
      else if(daysToWork[y].className.includes("leave-day")){ 
        selectedDays.splice(selectedDays.indexOf(day),1);
      }
      renderCalendar();
    });
  }
    
  //Delete the repeated days
  unselectedDays = unselectedDays.filter((item, pos) => unselectedDays.indexOf(item) == pos);
  leaveDays = leaveDays.filter((item, pos) => leaveDays.indexOf(item) == pos);
}


//date = newDate()... so wtf with this function. Ohhh the month could be change ater... xd
const ifMonthEqual = () => { 
  if(new Date().getMonth() === date.getMonth()){
  document.querySelector(".date p").className = ""
} 
}

//The < icon to change month
document.querySelector('.prev').
addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  ifMonthEqual();
  chosenWeekDayArray = [];
  selectedDays = [];
  leaveDays.forEach(x=>leaveDays.splice(leaveDays.indexOf(x)));
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  document.querySelectorAll('.weekDay-leave').forEach(x=>x.className="")
  renderCalendar();
})

//The > icon to change month
document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  chosenWeekDayArray = [];
  selectedDays = [];
  leaveDays.forEach(x=>leaveDays.splice(leaveDays.indexOf(x)));
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  document.querySelectorAll('.weekDay-leave').forEach(x=>x.className="")
  renderCalendar();
})

//To go back to the current month
document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    chosenWeekDayArray = [];
    selectedDays = [];
    leaveDays.forEach(x=>leaveDays.splice(leaveDays.indexOf(x)));
    document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
    document.querySelectorAll('.weekDay-leave').forEach(x=>x.className="")
    renderCalendar();
  }
})

//Select all the days of z weekDay.
const weekDay = document.querySelectorAll('.weekdays div');

for(let z = 0; z < weekDay.length; z++){
    weekDay[z].addEventListener("click", () => {
      if((z == 0) || (z == 6)){
        weekDay[z].className = 'weekend';
      }
      else if(weekDay[z].className == '') {
        weekDay[z].className = 'weekDay-select';
        //Add all the selected days of z weekdays
        selectedDays = selectedDays.concat(unselectedDays.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element).getDay()),
        leaveDays.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element).getDay()));
      } 
      else if (weekDay[z].className == 'weekDay-select') {
        weekDay[z].className = 'weekDay-leave';
        //Add the leave days
        leaveDays = leaveDays.concat(selectedDays.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element).getDay()));
        //Delete the selected days
        selectedDays = selectedDays.filter(element => z !== new Date(date.getFullYear(), date.getMonth(), element).getDay())
      } 
      else if (weekDay[z].className == 'weekDay-leave') {
        weekDay[z].className = '';
        leaveDays = leaveDays.filter(element => z !== new Date(date.getFullYear(), date.getMonth(), element).getDay())
      } 
    renderCalendar();
  })
}

renderCalendar();

//Contador
const counterDays = () => {
  let daysToWorkNumber;
  daysToWorkNumber = Math.round((document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"],[class*="leave-day"])').length)*0.60);
  var daysWorked = document.querySelectorAll('.day-select').length;
  if(daysWorked >= daysToWorkNumber ){
    alert("You are ok! and have " + (daysWorked - daysToWorkNumber)  + " days more")
  }
  else{
    alert("You need " + (daysToWorkNumber - daysWorked) + ' days more' )
  }
}

function firstMessage(){
  alert("Do a click in the name of the day when you go to the office");
}

document.getElementById("counter").addEventListener("click", counterDays)
