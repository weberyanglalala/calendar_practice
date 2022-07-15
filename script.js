// variable
let today = new Date()
let queryDate = new Date(today)
let queryYear = queryDate.getFullYear()
let queryMonth = queryDate.getMonth()


// DOM
const currentMonth = document.querySelector('#current-month')
const currentMonthBtn = document.querySelector('#btn-current-month')
const prevMonthBtn = document.querySelector('#btn-prev-month')
const nextMonthBtn = document.querySelector('#btn-next-month')
const calendar = document.querySelector('#calendar')


// window onload

window.onload = function() {
  generateHeader(today)
  generateCalendar()
}

currentMonthBtn.addEventListener('click', function() {
  queryDate = new Date(today)
  queryYear = today.getFullYear()
  queryMonth = today.getMonth()
  changeMonth(queryYear, queryMonth)
  console.log(queryDate)
})
prevMonthBtn.addEventListener('click', function() {
  if(queryMonth === 0) {
    queryMonth = 11
    queryYear--
  } else {
    queryMonth--
  }
  changeMonth(queryYear, queryMonth)
})
nextMonthBtn.addEventListener('click', function() {
  if(queryMonth === 11) {
    queryMonth = 0
    queryYear++
  } else {
    queryMonth++
  }
  changeMonth(queryYear, queryMonth)
})
// function
function generateHeader(date) {
  currentMonth.innerText = switchToMonth(date.getMonth()).toString() + " " + date.getFullYear().toString()
}
function changeMonth(year, month) {
  queryDate = new Date(year, month, 1)
  generateHeader(queryDate)
}
function switchToMonth(num) {
  switch(num) {
    case 0:
      return "January"
    case 1:
      return "February"
    case 2:
      return "March"
    case 3:
      return "April"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "August"
    case 8:
      return "September"
    case 9:
      return "October"
    case 10:
      return "November"
    case 11:
      return "December"
    default:
      break
  }

}

function generateCalendar() {

}