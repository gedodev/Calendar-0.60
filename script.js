var currentMonthDays = [];
var daysToWork = [];
var daysToWorkArray = [];

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

  if(new Date().getMonth() != date.getMonth()){
    document.querySelector(".date p").className = "otherMonth";
  } 


  let days = "";

  /* ====== Start Print ====== */

  // Add the last days of the last month
  for(let x = firstDayIndex; x > 0 ;x--) {
    days += `<div class="prev-month">${prevLastDay - x + 1}</div>`;
    //x +=10 ==> x = x + 10
  }

  //Add the days of the current months
  for(let i = 1; i <= lastDay ;i++) {
    if(i === (new Date().getDate()) && (date.getMonth() === new Date().getMonth())){
      days += `<div class="today">${i}</div>`;
    }
    else{
      days += `<div>${i}</div>`;
    }
  }

  //Add the first days of the next months
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="next-month">${j}</div>`;
  }


  //Print
  monthDays.innerHTML = days;

  /* ====== End Print ====== */

  //WeekEnd (It is w-1 in the array because the for, start in 1 and the array start in 0)
  currentMonthDays = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"])');
  for(let w = 0; w < currentMonthDays.length; w++){
    let weekEnd = new Date(date.getFullYear(), date.getMonth(), w + 1).getDay();
    if((weekEnd == 0 || weekEnd == 6) && (currentMonthDays[w].className == '')){
      currentMonthDays[w].className += 'no-work';
    }
    else if(weekEnd == 0 || weekEnd == 6){
      currentMonthDays[w].className += ' no-work';
    }
  }

  //Add the day-select class and event listener in each day
  daysToWork = document.querySelectorAll('.days div:not([class="prev-month"], [class="next-month"], [class*="no-work"])');
    
  for(let y = 0; y < daysToWork.length; y++){
    let day = parseInt(daysToWork[y].innerText);  
    daysToWork[y].addEventListener("click", () => {
      if (daysToWork[y].className == ""){
        daysToWork[y].className = "day-select"
      } 
      else if(daysToWork[y].className == "today"){
        daysToWork[y].className += " day-select"
      }
      else if(daysToWork[y].className.includes("day-select")){ 
        daysToWork[y].className = daysToWork[y].className.replace('day-select', 'leave-day')
      }
      else if(daysToWork[y].className.includes("leave-day")){ 
        daysToWork[y].className = daysToWork[y].className.replace('leave-day', '').trim()
      }
    });
  }
    
  
  daysToWorkArray = Array.from(daysToWork);
}

//Select all the days of z weekDay.
const weekDay = document.querySelectorAll('.weekdays div');
for(let z = 0; z < weekDay.length; z++){
    weekDay[z].addEventListener("click", () => {
      if((z == 0) || (z == 6)){
        weekDay[z].className = 'weekend';
      }
      else if(weekDay[z].className == '') {
        weekDay[z].className = 'weekDay-select';
        //Gives you the days to work in the weekDay column
        daysToWorkArray.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element.innerText).getDay()).forEach(x=>x.className.includes("today") ? x.className += " day-select" : x.className = "day-select")
      } 
      else if (weekDay[z].className == 'weekDay-select') {
        weekDay[z].className = 'weekDay-leave';
        daysToWorkArray.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element.innerText).getDay()).forEach(x=>x.className.includes("today") ? x.className = x.className.replace('day-select', 'leave-day').trim() : x.className = "leave-day")
      } 
      else if (weekDay[z].className == "weekDay-leave") {
        weekDay[z].className = "";
        daysToWorkArray.filter((element) => z == new Date(date.getFullYear(), date.getMonth(), element.innerText).getDay()).forEach(x=>x.className.includes("today") ? x.className = x.className.replace("leave-day", "").trim() : x.className="")
      } 
  })
}

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
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  document.querySelectorAll('.weekDay-leave').forEach(x=>x.className='')
  renderCalendar();
})

//The > icon to change month
document.querySelector('.next').
addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  ifMonthEqual();
  document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
  document.querySelectorAll('.weekDay-leave').forEach(x=>x.className='')
  renderCalendar();
})

//To go back to the current month
document.querySelector(".date p").addEventListener("click", () => {
  if(document.querySelector(".date p").className === "otherMonth"){
    date.setMonth(new Date().getMonth());
    document.querySelector(".date p").className = ""
    document.querySelectorAll('.weekDay-select').forEach(x=>x.className='')
    document.querySelectorAll('.weekDay-leave').forEach(x=>x.className='')
    renderCalendar();
  }
})



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

const arrow = document.getElementById('arrow');

arrow.addEventListener("click",function(){
  if(arrow.innerText=='>'){
  document.querySelector('.guide-container').style.left='0rem';
  arrow.style.left="0rem"
  arrow.innerText='<'
  }
  else{
    document.querySelector('.guide-container').style.left='-35rem';
    arrow.style.left="-35rem"
    arrow.innerText='>'
  }
})



