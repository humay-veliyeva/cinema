const container = document.querySelector(".container")
const select = document.getElementById("movie")
const amount = document.getElementById("amount")
const count = document.getElementById("count")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
  if(e.target.classList.contains('seat') && !e.target.classList.contains("reserved")) {
    e.target.classList.toggle('selected')
    calculateTotal()
  }
})

select.addEventListener('change', function(e) {
  calculateTotal()
})

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected")
  let selecedSeatCount = selectedSeats.length;

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function(seat) {
    selectedSeatsArr.push(seat)
  })

  seats.forEach(function(seat) {
    seatsArr.push(seat)
  })

  // [1, 2, 3]
  let selecedSeatIndexs = selectedSeatsArr.map(function(seat) {
    return seatsArr.indexOf(seat)
  })

  count.innerText = selecedSeatCount
  amount.innerText = selecedSeatCount * select.value

  saveToLocalStorage(selecedSeatIndexs)
}

// localstorage
function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

  if(selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function(seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs))
}