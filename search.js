// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Swap From and To cities
const swapBtn = document.getElementById("swapBtn")
const fromSelect = document.getElementById("from")
const toSelect = document.getElementById("to")

if (swapBtn && fromSelect && toSelect) {
  swapBtn.addEventListener("click", () => {
    const fromValue = fromSelect.value
    const toValue = toSelect.value

    fromSelect.value = toValue
    toSelect.value = fromValue
  })
}

// Set default dates
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const departureInput = document.getElementById("departure")
const returnInput = document.getElementById("return")

if (departureInput && returnInput) {
  departureInput.value = today.toISOString().split("T")[0]
  returnInput.value = tomorrow.toISOString().split("T")[0]
}

// City names mapping
const cityNames = {
  jakarta: "Jakarta",
  bandung: "Bandung",
  surabaya: "Surabaya",
  yogyakarta: "Yogyakarta",
  semarang: "Semarang",
  malang: "Malang",
  jember: "Jember",
  banyuwangi: "Banyuwangi",
  denpasar: "Denpasar",
  solo: "Solo",
  madiun: "Madiun",
  kediri: "Kediri",
  blitar: "Blitar",
  probolinggo: "Probolinggo",
  pasuruan: "Pasuruan",
}

// Search form submission - SHOW RESULTS ON SAME PAGE
const searchForm = document.getElementById("searchForm")

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const from = fromSelect ? fromSelect.value : ""
    const to = toSelect ? toSelect.value : ""
    const departure = departureInput ? departureInput.value : ""
    const returnDate = returnInput ? returnInput.value : ""

    if (!from || !to || !departure) {
      alert("Mohon lengkapi semua field pencarian!")
      return
    }

    if (from === to) {
      alert("Kota asal dan tujuan tidak boleh sama!")
      return
    }

    // Store search data
    const searchData = {
      from: from,
      to: to,
      fromName: cityNames[from],
      toName: cityNames[to],
      departure: departure,
      return: returnDate,
    }

    // Show loading state
    const searchBtn = document.getElementById("searchBtn")
    if (searchBtn) {
      searchBtn.textContent = "Mencari..."
      searchBtn.disabled = true
    }

    // Show results after loading
    setTimeout(() => {
      showBusResults(searchData)
      searchBtn.textContent = "Cari Bus"
      searchBtn.disabled = false
    }, 1500)
  })
}

// Function to show bus results on same page
function showBusResults(searchData) {
  // Hide hero section
  const heroSection = document.querySelector(".hero-search")
  if (heroSection) {
    heroSection.style.display = "none"
  }

  // Hide popular routes and promo sections
  const popularRoutes = document.querySelector(".popular-routes")
  const promoSection = document.querySelector(".promo-section")
  if (popularRoutes) popularRoutes.style.display = "none"
  if (promoSection) promoSection.style.display = "none"

  // Get footer and move it to the end
  const footer = document.querySelector(".footer")
  let footerHTML = ""
  if (footer) {
    footerHTML = footer.outerHTML
    footer.remove()
  }

  // Create results section with footer at the end
  const resultsHTML = `
    <section class="search-results-section" style="padding: 100px 0 0; background: #f8f9fa; min-height: 100vh;">
      <div class="container">
        <!-- Search Summary -->
        <div class="search-summary" style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="color: #00c4ff; font-size: 2rem; margin-bottom: 0.5rem;">${searchData.fromName} → ${searchData.toName}</h1>
              <p style="color: #666; font-size: 1.1rem;">${new Date(searchData.departure).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
            <button onclick="backToSearch()" style="background: #00c4ff; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">← Ubah Pencarian</button>
          </div>
        </div>

        <!-- Results Layout -->
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem; margin-bottom: 3rem;">
          <!-- Filters Sidebar -->
          <aside style="background: white; border-radius: 12px; padding: 1.5rem; height: fit-content; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-bottom: 1.5rem;">Filter</h3>
            
            <div style="margin-bottom: 2rem;">
              <h4 style="color: #333; margin-bottom: 1rem;">Urutkan</h4>
              <select id="sortResults" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                <option value="price">Harga Terendah</option>
                <option value="departure">Keberangkatan</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>

            <div style="margin-bottom: 2rem;">
              <h4 style="color: #333; margin-bottom: 1rem;">Kelas Bus</h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" value="ekonomi" class="class-filter"> Ekonomi
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" value="bisnis" class="class-filter"> Bisnis
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="checkbox" value="eksekutif" class="class-filter"> Eksekutif
                </label>
              </div>
            </div>
          </aside>

          <!-- Bus Results -->
          <main style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">
              <h2 style="color: #333;">Bus Tersedia</h2>
              <span style="color: #666;" id="busResultCount">5 bus ditemukan</span>
            </div>

            <div id="busResultsList" style="display: flex; flex-direction: column; gap: 1.5rem;">
              <!-- Bus results will be populated here -->
            </div>
          </main>
        </div>
      </div>
    </section>
    ${footerHTML}
  `

  // Replace body content after header
  const header = document.querySelector(".header")
  const bodyContent = document.body.innerHTML
  const headerHTML = header ? header.outerHTML : ""

  // Clear body and add header + results + footer in correct order
  document.body.innerHTML = headerHTML + resultsHTML

  // Populate bus results
  populateBusResults()

  // Add filter functionality
  setupResultsFilters()

  // Scroll to results
  setTimeout(() => {
    const resultsSection = document.querySelector(".search-results-section")
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" })
    }
  }, 100)
}

// Sample bus data
const busResultsData = [
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
  },
]

let currentBusResults = [...busResultsData]

// Populate bus results
function populateBusResults() {
  const busList = document.getElementById("busResultsList")
  if (!busList) return

  busList.innerHTML = ""

  currentBusResults.forEach((bus, index) => {
    const busCard = document.createElement("div")
    busCard.style.cssText =
      "border: 2px solid #f0f0f0; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease; background: white;"

    busCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 style="color: #333; font-size: 1.4rem; margin: 0;">${bus.operator}</h3>
        <span style="background: ${bus.class === "Eksekutif" ? "#00c4ff" : bus.class === "Bisnis" ? "#28a745" : "#ffc107"}; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">${bus.class}</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 0.25rem;">${bus.departureTime}</div>
          <div style="color: #666; font-size: 0.9rem;">${bus.departureLocation}</div>
        </div>
        <div style="text-align: center; color: #666;">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">${bus.duration}</div>
          <div style="font-size: 0.8rem;">Langsung</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 0.25rem;">${bus.arrivalTime}</div>
          <div style="color: #666; font-size: 0.9rem;">${bus.arrivalLocation}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #00c4ff; margin-bottom: 0.25rem;">Rp ${bus.price.toLocaleString("id-ID")}</div>
          <div style="color: #666; font-size: 0.8rem; margin-bottom: 0.5rem;">per orang</div>
          <div style="margin-bottom: 1rem;">⭐ ${bus.rating} • ${bus.facilities.join(" • ")}</div>
          <button onclick="selectBus(${index})" style="background: #00c4ff; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Pilih Kursi</button>
        </div>
      </div>
    `

    // Add hover effects
    busCard.addEventListener("mouseenter", () => {
      busCard.style.borderColor = "#00c4ff"
      busCard.style.transform = "translateY(-5px)"
      busCard.style.boxShadow = "0 10px 30px rgba(0, 196, 255, 0.2)"
    })

    busCard.addEventListener("mouseleave", () => {
      busCard.style.borderColor = "#f0f0f0"
      busCard.style.transform = "translateY(0)"
      busCard.style.boxShadow = "none"
    })

    busList.appendChild(busCard)
  })
}

// Setup filters functionality
function setupResultsFilters() {
  // Sort functionality
  const sortSelect = document.getElementById("sortResults")
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const sortedBuses = [...currentBusResults]

      switch (sortSelect.value) {
        case "price":
          sortedBuses.sort((a, b) => a.price - b.price)
          break
        case "departure":
          sortedBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
          break
        case "rating":
          sortedBuses.sort((a, b) => b.rating - a.rating)
          break
      }

      currentBusResults = sortedBuses
      populateBusResults()
    })
  }

  // Class filter functionality
  const classFilters = document.querySelectorAll(".class-filter")
  classFilters.forEach((filter) => {
    filter.addEventListener("change", applyClassFilters)
  })
}

// Apply class filters
function applyClassFilters() {
  const checkedFilters = Array.from(document.querySelectorAll(".class-filter:checked")).map((cb) => cb.value)

  if (checkedFilters.length === 0) {
    currentBusResults = [...busResultsData]
  } else {
    currentBusResults = busResultsData.filter((bus) =>
      checkedFilters.some((filter) => bus.class.toLowerCase().includes(filter)),
    )
  }

  populateBusResults()

  // Update count
  const countElement = document.getElementById("busResultCount")
  if (countElement) {
    countElement.textContent = `${currentBusResults.length} bus ditemukan`
  }
}

// Back to search function
function backToSearch() {
  // Reload the page to restore original state
  window.location.reload()
}

// Select bus function
function selectBus(index) {
  const bus = currentBusResults[index]
  alert(
    `Anda memilih ${bus.operator} - ${bus.class}\nHarga: Rp ${bus.price.toLocaleString("id-ID")}\n\nFitur pemilihan kursi akan segera tersedia!`,
  )
}

// Popular route selection
function selectRoute(from, to) {
  if (fromSelect && toSelect) {
    fromSelect.value = from
    toSelect.value = to

    // Scroll to search form
    const searchContainer = document.querySelector(".search-container")
    if (searchContainer) {
      searchContainer.scrollIntoView({
        behavior: "smooth",
      })

      // Highlight the form briefly
      searchContainer.style.transform = "scale(1.02)"
      searchContainer.style.boxShadow = "0 20px 50px rgba(0, 196, 255, 0.3)"

      setTimeout(() => {
        searchContainer.style.transform = "scale(1)"
        searchContainer.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.2)"
      }, 1000)
    }
  }
}

// Add loading animation to search form
document.addEventListener("DOMContentLoaded", () => {
  const searchContainer = document.querySelector(".search-container")
  if (searchContainer) {
    searchContainer.style.opacity = "0"
    searchContainer.style.transform = "translateY(30px)"

    setTimeout(() => {
      searchContainer.style.transition = "all 0.8s ease"
      searchContainer.style.opacity = "1"
      searchContainer.style.transform = "translateY(0)"
    }, 500)
  }

  // Add hover effects to route cards
  const routeCards = document.querySelectorAll(".route-card")
  routeCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "white"
      header.style.backdropFilter = "none"
    }
  }
})
