let today = new Date()
let queryDate = new Date(today)
let queryYear = queryDate.getFullYear()
let queryMonth = queryDate.getMonth()
let queryCalendar
let recordList = []
let queryTitle
// 
let editTodoTitle = document.querySelector('#editTodoTitle')
let editTodoDate = document.querySelector('#editTodoDate')
let editTodoTime = document.querySelector('#editTodoTime')
let editTodoColor = document.querySelector('#editTodoColor')
// 

const currentMonth = document.querySelector('#current-month')
const currentMonthBtn = document.querySelector('#btn-current-month')
const prevMonthBtn = document.querySelector('#btn-prev-month')
const nextMonthBtn = document.querySelector('#btn-next-month')
const calendar = document.querySelector('#calendar')

let days = document.querySelectorAll('.date-wrap')
let addBtns = document.querySelector('.add-button')

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
  days = []
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
      const col = document.createElement('div')
      col.classList.add("col")
      if (weekday.month == queryMonth + 1) {
        col.innerHTML += `
        <div class="date-wrap border" data-id="${weekday.year}-${weekday.month}-${weekday.day}">
          <div
            class="date-header d-flex justify-content-center justify-content-md-between align-items-center p-2">
            <button class="btn p-0 add-button" data-bs-toggle="modal" data-bs-target="#addNewTodo"><i class="bi bi-plus-square"></i></button>
            <span class="date-header-day current-month">${weekday.day}</span>
          </div>
          <div class="date-body">
          </div>
        </div>`
      } else {
        col.innerHTML += `
        <div class="date-wrap border" data-id="${weekday.year}-${weekday.month}-${weekday.day}">
          <div
            class="date-header d-flex justify-content-center justify-content-md-between align-items-center p-2">
            <button disabled class="btn"></button>
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
  addBtns = document.querySelectorAll('.add-button')
  addBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      addNewTodo(event, btn)
    })
  })
  let todoSubmitBtn = document.querySelector('#todoSubmit')
  todoSubmitBtn.addEventListener('click', function () {
    todoSubmit()
  })
  showDayInfo()
  let showBtns = document.querySelectorAll('[data-bs-target="#showTodo"]')
  showBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      showTodo(event)
    })
  })
}
function showDayInfo() {
  let scheduledDays = []
  for (let key in localStorage) {
    if (parseInt(key[0])) scheduledDays.push(key)
  }
  scheduledDays.forEach(day => {
    if ((Number(day.split("-")[1])) - 1 === queryMonth) {
      let parsedTodos = JSON.parse(localStorage.getItem(String(day))).todoList
      if (parsedTodos) {
        let date = document.querySelector(`[data-id='${day}']`)
        let dateBody = date.querySelector('.date-body')
        parsedTodos.forEach(todo => {
          dateBody.innerHTML += `<button class="btn w-100 text-start" data-bs-toggle="modal" data-bs-target="#showTodo" style="color: ${todo.hexcode};">${todo.title}</button>`
        })
      }
    }
  })
}
function addNewTodo(event, item) {
  event.stopPropagation()

  let todoDate = document.querySelector('#todoDate')
  let todoTime = document.querySelector('#todoTime')
  let todoColor = document.querySelector('#todoColor')
  let todoTitle = document.querySelector('#todoTitle')

  todoDate.value = item.parentElement.parentElement.dataset.id
}
function todoSubmit() {
  let todoDate = document.querySelector('#todoDate')
  let todoTime = document.querySelector('#todoTime')
  let todoColor = document.querySelector('#todoColor')
  let todoTitle = document.querySelector('#todoTitle')

  if (localStorage.getItem(String(todoDate.value))) {
    let parsedTodos = JSON.parse(localStorage.getItem(String(todoDate.value)))
    parsedTodos['todoList'].push({
      "time": `${todoTime.value}`,
      "title": `${todoTitle.value}`,
      "location": "home",
      "hexcode": `${todoColor.value}`
    })
    localStorage.setItem(`${todoDate.value}`, JSON.stringify(parsedTodos))
  }
  else {
    localStorage.setItem(`${todoDate.value}`, JSON.stringify(
      {
        "id": `${todoDate.value}`,
        "todoList": [
          {
            "time": `${todoTime.value}`,
            "title": `${todoTitle.value}`,
            "location": "home",
            "hexcode": `${todoColor.value}`
          }
        ]
      }
    ))
  }


  todoDate.value = ""
  todoTime.value = ""
  todoColor.value = "#ffffff"
  todoTitle.value = ""

  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
}
function showTodo(event) {
  editTodoTitle.value = event.target.innerText
  editTodoDate.value = event.target.parentElement.parentElement.dataset.id
  let dayRecords = JSON.parse(localStorage.getItem(editTodoDate.value))
  editTodoTime.value = dayRecords.todoList.find(todo => todo.title == event.target.innerText).time
  editTodoColor.value = dayRecords.todoList.find(todo => todo.title == event.target.innerText).hexcode

  let date = event.target.parentElement.parentElement.dataset.id
  queryDate = new Date(date.split("-")[0], date.split("-")[1] - 1, date.split("-")[2])
  queryTitle = event.target.innerText
}
function todoEdit() {
  let dayRecords = JSON.parse(localStorage.getItem(`${queryDate.getFullYear()}-${queryDate.getMonth() + 1}-${queryDate.getDate()}`))

  let targetTodo = dayRecords.todoList.find(todo => todo.title === queryTitle)

  targetTodo.title = editTodoTitle.value
  targetTodo.time = editTodoTime.value
  targetTodo.hexcode = editTodoColor.value

  localStorage.setItem(editTodoDate.value, JSON.stringify(dayRecords))
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
}

function removeTodo() {
  let editTodoTitle = document.querySelector('#editTodoTitle')
  let dayRecords = JSON.parse(localStorage.getItem(editTodoDate.value))
  let removeIndex = dayRecords.todoList.indexOf(todo => todo.title == editTodoTitle.value)
  dayRecords.todoList.splice(removeIndex, 1)
  localStorage.setItem(editTodoDate.value, JSON.stringify(dayRecords))
  queryCalendar = generateCalendar(queryYear, queryMonth)
  renderCalendar(queryCalendar)
}