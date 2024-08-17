let totalPrice = 0

const createPassengerCard = (firstName, lastName, age) => {
  const passangerInfo = document.getElementById("passangerInfo")
  const cardNumber = passangerInfo.children.length + 1

  let ageCategory = "Minor"
  if (age >= 18 && age <= 60) {
    ageCategory = "Adult"
  } else if (age > 60) {
    ageCategory = "Senior"
  }
  let templatePassengerCard = `<div class="pinfoCard">
    <div class="nameWrapper">
        <div class="infoFirstName">${firstName}</div>
        <div class="infoLastName">${lastName}</div>
    </div>
    <div class="infoAgeType">${ageCategory}</div>
    <button class="delete" onclick="removePassenger(${cardNumber})">
        <i class="fa-solid fa-trash-can"></i>
    </button>
</div>`
  return templatePassengerCard
}

function removePassenger(cardNumber) {
  const passangerInfo = document.getElementById("passangerInfo")
  const del_item = passangerInfo.children[cardNumber - 1]
  passangerInfo.removeChild(del_item)
}

function showNotificationBox(message) {
  document.getElementById("notificationBox").textContent = message
  notificationBox.classList.add("show")

  setInterval(() => {
    document.getElementById("notificationBox").textContent = ""
    notificationBox.classList.remove("show")
  }, 3000)
}

document.getElementById("addPsngr").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const age = document.getElementById("age").value
  if (firstName === "" || lastName === "" || age === "") {
    showNotificationBox("Please enter all passenger details")
    return
  }

  const passangerInfo = document.getElementById("passangerInfo")

  const passengerCard = document.createElement("div")
  passengerCard.innerHTML = createPassengerCard(firstName, lastName, age)
  passangerInfo.appendChild(passengerCard)
})

document.getElementById("btnPriceQuote").addEventListener("click", () => {
  const departDate = document.getElementById("departDate")?.value
  const depart = document.getElementById("depart").value
  const arrive = document.getElementById("arrive").value
  const travelClass = document.querySelectorAll('input[name="travelClass"]')
  const arrayTravelClass = Array.from(travelClass).filter(cb => cb.checked)
  const selectTravelClass = arrayTravelClass[0]?.value
  const passangerInfo = document.getElementById("passangerInfo")
  const passengerCount = passangerInfo.children.length

  if (departDate === "") {
    showNotificationBox("Please select the date.")
    return
  } else if (depart === "" || arrive === "") {
    showNotificationBox("Please select source and destination cities.")
    return
  } else if (depart === arrive) {
    showNotificationBox("Source and destination cannot be same.")
    return
  } else if (selectTravelClass === "") {
    showNotificationBox("Please select ticket class.")
    return
  } else if (passengerCount === 0) {
    showNotificationBox("Please add at least one passenger.")
    return
  }

  document.getElementById("quotedDate").innerHTML = departDate
  document.getElementById("quotedDepart").innerHTML = depart
  document.getElementById("quotedArrival").innerHTML = arrive
  document.getElementById("quotedClass").innerHTML = selectTravelClass

  let ticketPrice = 500
  if (selectTravelClass == "First") {
    document.getElementById("quotedClassPrice").innerHTML = 500
  } else if (selectTravelClass == "Business") {
    document.getElementById("quotedClassPrice").innerHTML = 400
    ticketPrice = 400
  } else if (selectTravelClass == "Economy") {
    document.getElementById("quotedClassPrice").innerHTML = 250
    ticketPrice = 250
  }
  document.getElementById("quotedPassengers").innerHTML = passengerCount
  document.getElementById("quotedPrice").innerHTML =
    ticketPrice * passengerCount

  totalPrice = ticketPrice * passengerCount
  document.getElementById("quotedTotalPrice").innerHTML = totalPrice
})

document.getElementById("applyCoupon").addEventListener("click", () => {
  const coupon = document.getElementById("coupon").value
  if (coupon.toUpperCase() == "Final50".toUpperCase()) {
    totalPrice = totalPrice / 2
    document.getElementById("quotedTotalPrice").innerHTML = totalPrice
    showNotificationBox("Coupon Applied Successfully.")
  } else if (coupon == "") {
    showNotificationBox("Coupon Not Applied.")
  } else {
    showNotificationBox("Invalid Coupon.")
  }
})
document.addEventListener("DOMContentLoaded", function () {
  const lightMode = document.getElementById("lightMode");
  const darkMode = document.getElementById("darkMode");

  // Load the saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
    if (savedTheme === "dark") {
      darkMode.checked = true;
    } else {
      lightMode.checked = true;
    }
  }

  // Add event listeners for theme change
  lightMode.addEventListener("change", () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  });

  darkMode.addEventListener("change", () => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  });
});