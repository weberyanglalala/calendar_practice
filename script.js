let today = new Date()
let queryDate = new Date(today)
let queryYear = queryDate.getFullYear()
let queryMonth = queryDate.getMonth()
let queryCalendar

const currentMonth = document.querySelector('#current-month')
const currentMonthBtn = document.querySelector('#btn-current-month')
const prevMonthBtn = document.querySelector('#btn-prev-month')
const nextMonthBtn = document.querySelector('#btn-next-month')
const calendar = document.querySelector('#calendar')
const days = document.querySelectorAll('.date-wrap')

window.onload = function () {
  generateHeader(today)
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
}

currentMonthBtn.addEventListener('click', function () {
  queryDate = new Date(today)
  queryYear = today.getFullYear()
  queryMonth = today.getMonth()
  changeMonth(queryYear, queryMonth)
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
})
prevMonthBtn.addEventListener('click', function () {
  if (queryMonth === 0) {
    queryMonth = 11
    queryYear--
  } else {
    queryMonth--
  }
  changeMonth(queryYear, queryMonth)
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
})
nextMonthBtn.addEventListener('click', function () {
  if (queryMonth === 11) {
    queryMonth = 0
    queryYear++
  } else {
    queryMonth++
  }
  changeMonth(queryYear, queryMonth)
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
})

function generateHeader(date) {
  currentMonth.innerText = switchToMonth(date.getMonth()).toString() + " " + date.getFullYear().toString()
}
function changeMonth(year, month) {
  queryDate = new Date(year, month, 1)
  generateHeader(queryDate)
}
function switchToMonth(num) {
  switch (num) {
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
function switchToWeekday(num) {
  switch (num) {
    case 0:
      return "Sunday"
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
    default:
      console.log("Week Day error")
      break
  }
}
function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  let days = []
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      year: lastDay.getFullYear(),
      month: lastDay.getMonth() + 1,
      day: i,
      weekday: switchToWeekday(new Date(year, month, i).getDay())
    })
  }

  let lastMonthDate = new Date(year, month, 0)
  let lastMonthDay = new Date(year, month, 0).getDate()
  let lastMonthDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  for (let i = 1; i <= lastMonthDays; i++) {
    days.unshift({
      year: lastMonthDate.getFullYear(),
      month: lastMonthDate.getMonth() + 1,
      day: lastMonthDay,
      weekday: switchToWeekday(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth(), lastMonthDay).getDay())
    })
    lastMonthDay--
  }

  let nextMonthDate = new Date(year, month + 1, 1)
  let nextMonthDay = new Date(year, month + 1, 1).getDate()
  let nextMonthDays = lastDay.getDay() == 0 ? 0 : 7 - lastDay.getDay()
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      year: nextMonthDate.getFullYear(),
      month: nextMonthDate.getMonth() + 1,
      day: nextMonthDay,
      weekday: switchToWeekday(new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDay).getDay())
    })
    nextMonthDay++
  }
  return days
}
function renderCalendar(days) {
  calendar.innerHTML = ""
  const arr = days.map(day => day)
  do {
    const week = arr.splice(0, 7)
    const row = document.createElement('div')
    row.classList.add("row", "g-0")
    week.forEach(weekday => {
      console.log(weekday.month)
      const col = document.createElement('div')
      col.classList.add("col")
      if (weekday.month == queryMonth + 1) {
        col.innerHTML += `
        <div class="date-wrap border">
          <div
            class="date-header d-flex justify-content-center justify-content-md-between align-items-center p-2">
            <button class="btn p-0 add-button"><i class="bi bi-plus-square"></i></button>
            <span class="date-header-day current-month">${weekday.day}</span>
          </div>
          <div class="date-body">
          </div>
        </div>`
      } else {
        col.innerHTML += `
        <div class="date-wrap border">
          <div
            class="date-header d-flex justify-content-center justify-content-md-between align-items-center p-2">
            <button class="btn p-0 add-button"><i class="bi bi-plus-square"></i></button>
            <span class="date-header-day">${weekday.day}</span>
          </div>
          <div class="date-body">
          </div>
        </div>`
      }

      row.appendChild(col)
    })
    calendar.appendChild(row)
  } while (arr.length !== 0)
}