// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Sample bus data
const busData = [
  {
    operator: "Satyatama Blue Fire",
    class: "Eksekutif",
    departureTime: "18:00",
    arrivalTime: "10:00+1",
    departureLocation: "Terminal Arjosari",
    arrivalLocation: "Terminal Priok",
    duration: "16j 0m",
    price: 510000,
    rating: 4.8,
    facilities: ["AC", "WiFi", "Snack", "Entertainment"],
    timeCategory: "malam",
  },
  {
    operator: "Satyatama The Dynamic",
    class: "Bisnis",
    departureTime: "19:00",
    arrivalTime: "09:00+1",
    departureLocation: "Terminal Brawijaya",
    arrivalLocation: "Terminal Leuwipanjang",
    duration: "14j 0m",
    price: 470000,
    rating: 4.7,
    facilities: ["AC", "WiFi", "Meal", "Reclining Seat"],
    timeCategory: "malam",
  },
  {
    operator: "Satyatama Melasti Sunset",
    class: "Eksekutif",
    departureTime: "15:00",
    arrivalTime: "15:00+1",
    departureLocation: "Terminal Ubung",
    arrivalLocation: "Terminal Leuwipanjang",
    duration: "24j 0m",
    price: 850000,
    rating: 4.9,
    facilities: ["AC", "WiFi", "Premium Meal", "Sleeper Seat"],
    timeCategory: "siang",
  },
  {
    operator: "Satyatama Express",
    class: "Ekonomi",
    departureTime: "20:00",
    arrivalTime: "08:00+1",
    departureLocation: "Terminal Purabaya",
    arrivalLocation: "Terminal Kampung Rambutan",
    duration: "12j 0m",
    price: 350000,
    rating: 4.5,
    facilities: ["AC", "Snack"],
    timeCategory: "malam",
  },
  {
    operator: "Satyatama Luxury",
    class: "Eksekutif",
    departureTime: "07:00",
    arrivalTime: "21:00",
    departureLocation: "Terminal Giwangan",
    arrivalLocation: "Terminal Kalideres",
    duration: "14j 0m",
    price: 520000,
    rating: 4.8,
    facilities: ["AC", "WiFi", "Premium Meal", "Entertainment", "Blanket"],
    timeCategory: "pagi",
  },
]

let filteredBuses = [...busData]

// Load search data and display
document.addEventListener("DOMContentLoaded", () => {
  const searchData = JSON.parse(localStorage.getItem("busSearchData"))

  if (searchData) {
    // Update route display
    const routeDisplay = document.getElementById("routeDisplay")
    const dateDisplay = document.getElementById("dateDisplay")

    if (routeDisplay) {
      routeDisplay.textContent = `${searchData.fromName} → ${searchData.toName}`
    }

    // Format and display date
    if (dateDisplay && searchData.departure) {
      const departureDate = new Date(searchData.departure)
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      dateDisplay.textContent = departureDate.toLocaleDateString("id-ID", options)
    }
  }

  // Display initial bus results
  displayBusResults(filteredBuses)
  updateBusCount(filteredBuses.length)
})

// Display bus results
function displayBusResults(buses) {
  const busList = document.getElementById("busList")
  if (!busList) return

  busList.innerHTML = ""

  buses.forEach((bus, index) => {
    const busCard = document.createElement("div")
    busCard.className = "bus-card"

    busCard.innerHTML = `
      <div class="bus-header">
        <div class="bus-operator">${bus.operator}</div>
        <div class="bus-class">${bus.class}</div>
      </div>
      <div class="bus-details">
        <div class="bus-time">
          <div class="time">${bus.departureTime}</div>
          <div class="location">${bus.departureLocation}</div>
        </div>
        <div class="bus-duration">
          <div class="duration">${bus.duration}</div>
          <div>Langsung</div>
        </div>
        <div class="bus-time">
          <div class="time">${bus.arrivalTime}</div>
          <div class="location">${bus.arrivalLocation}</div>
        </div>
        <div class="bus-facilities">
          <div class="rating">⭐ ${bus.rating}</div>
          <div class="facilities">${bus.facilities.join(" • ")}</div>
        </div>
        <div class="bus-price">
          <div class="price-amount">Rp ${bus.price.toLocaleString("id-ID")}</div>
          <div class="price-per">per orang</div>
          <button class="book-btn" onclick="bookBus(${index})">Pilih Kursi</button>
        </div>
      </div>
    `

    busList.appendChild(busCard)
  })
}

// Update bus count
function updateBusCount(count) {
  const busCount = document.getElementById("busCount")
  if (busCount) {
    busCount.textContent = count
  }
}

// Book bus function
function bookBus(index) {
  const bus = filteredBuses[index]
  alert(
    `Anda memilih ${bus.operator} - ${bus.class}\nHarga: Rp ${bus.price.toLocaleString("id-ID")}\n\nFitur pemilihan kursi akan segera tersedia!`,
  )
}

// Sort functionality
const sortBy = document.getElementById("sortBy")
if (sortBy) {
  sortBy.addEventListener("change", () => {
    const sortedBuses = [...filteredBuses]

    switch (sortBy.value) {
      case "price":
        sortedBuses.sort((a, b) => a.price - b.price)
        break
      case "departure":
        sortedBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
        break
      case "duration":
        sortedBuses.sort((a, b) => {
          const aDuration = Number.parseInt(a.duration.split("j")[0])
          const bDuration = Number.parseInt(b.duration.split("j")[0])
          return aDuration - bDuration
        })
        break
      case "rating":
        sortedBuses.sort((a, b) => b.rating - a.rating)
        break
    }

    displayBusResults(sortedBuses)
  })
}

// Filter functionality
function applyFilters() {
  let filtered = [...busData]

  // Class filter
  const classFilters = Array.from(
    document.querySelectorAll(
      'input[type="checkbox"][value="ekonomi"], input[type="checkbox"][value="bisnis"], input[type="checkbox"][value="eksekutif"]',
    ),
  )
    .filter((cb) => cb.checked)
    .map((cb) => cb.value)

  if (classFilters.length > 0) {
    filtered = filtered.filter((bus) => classFilters.some((cls) => bus.class.toLowerCase().includes(cls)))
  }

  // Time filter
  const timeFilters = Array.from(
    document.querySelectorAll(
      'input[type="checkbox"][value="pagi"], input[type="checkbox"][value="siang"], input[type="checkbox"][value="malam"], input[type="checkbox"][value="dini"]',
    ),
  )
    .filter((cb) => cb.checked)
    .map((cb) => cb.value)

  if (timeFilters.length > 0) {
    filtered = filtered.filter((bus) => timeFilters.includes(bus.timeCategory))
  }

  // Price filter
  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    const maxPrice = Number.parseInt(priceRange.value)
    filtered = filtered.filter((bus) => bus.price <= maxPrice)
  }

  filteredBuses = filtered
  displayBusResults(filteredBuses)
  updateBusCount(filteredBuses.length)
}

// Add event listeners to all filter checkboxes
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters)
  })

  // Price range filter
  const priceRange = document.getElementById("priceRange")
  const maxPriceDisplay = document.getElementById("maxPrice")

  if (priceRange && maxPriceDisplay) {
    priceRange.addEventListener("input", () => {
      const value = Number.parseInt(priceRange.value)
      maxPriceDisplay.textContent = `Rp ${value.toLocaleString("id-ID")}`
      applyFilters()
    })
  }
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 196, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#00c4ff"
      header.style.backdropFilter = "none"
    }
  }
})
