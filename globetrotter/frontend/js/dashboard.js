// Dashboard JavaScript

// Load user data and trips when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Check authentication
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return;
  }

  loadUserData();
  loadTrips();
  loadStats();
});

// Load user data
function loadUserData() {
  const user = getUser();
  if (user && user.name) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = user.name;
    }
  } else {
    // Fetch user data from API
    authAPI.getCurrentUser()
      .then(response => {
        setUser(response.user);
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
          userNameElement.textContent = response.user.name;
        }
      })
      .catch(error => {
        console.error('Error loading user:', error);
        // Redirect to login if token is invalid
        if (error.message.includes('token') || error.message.includes('401')) {
          logout();
        }
      });
  }
}

// Load trips
async function loadTrips() {
  try {
    // TODO: Replace with actual API call when trips API is ready
    // const response = await apiRequest('/trips');
    // const trips = response.trips || [];
    
    // For now, show sample data
    const tripsGrid = document.getElementById('tripsGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Sample trip data
    const sampleTrips = [
      {
        id: 1,
        name: 'Europe Adventure',
        startDate: '2024-01-15',
        endDate: '2024-01-22',
        cities: 3,
        budget: 75000,
        description: 'Explore the beauty of European cities including Paris, London, and Rome.',
        status: 'Upcoming'
      }
    ];

    if (sampleTrips.length === 0) {
      if (tripsGrid) tripsGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      // Trips are already in HTML as sample data
      // In production, you would dynamically generate trip cards here
    }
  } catch (error) {
    console.error('Error loading trips:', error);
  }
}

// Load statistics
function loadStats() {
  // TODO: Replace with actual API call when stats API is ready
  // For now, use sample data
  const stats = {
    totalTrips: 1,
    totalCities: 3,
    totalBudget: 75000,
    upcomingTrips: 1
  };

  const totalTripsEl = document.getElementById('totalTrips');
  const totalCitiesEl = document.getElementById('totalCities');
  const totalBudgetEl = document.getElementById('totalBudget');
  const upcomingTripsEl = document.getElementById('upcomingTrips');

  if (totalTripsEl) totalTripsEl.textContent = stats.totalTrips;
  if (totalCitiesEl) totalCitiesEl.textContent = stats.totalCities;
  if (totalBudgetEl) totalBudgetEl.textContent = `₹${stats.totalBudget.toLocaleString()}`;
  if (upcomingTripsEl) upcomingTripsEl.textContent = stats.upcomingTrips;
}

// Navigation functions
function createTrip() {
  window.location.href = 'create-trip.html';
}

function buildItinerary() {
  window.location.href = 'itinerary-builder.html';
}

function buildTripItinerary(tripId) {
  window.location.href = `itinerary-builder.html?tripId=${tripId}`;
}

function viewItinerary(tripId) {
  window.location.href = `itinerary-view.html?tripId=${tripId}`;
}

function viewBudget(tripId) {
  window.location.href = `budget.html?tripId=${tripId}`;
}

function viewTimeline(tripId) {
  window.location.href = `calendar.html?tripId=${tripId}`;
}

function viewAdventure(adventureType) {
  // Create a new trip based on the adventure template
  alert(`Creating ${adventureType} adventure! Redirecting to trip creation...`);
  window.location.href = 'create-trip.html?template=' + adventureType;
}

function viewAllItineraries() {
  window.location.href = 'my-trips.html?view=itinerary';
}

function viewAllBudgets() {
  window.location.href = 'my-trips.html?view=budget';
}

function viewAllTimelines() {
  window.location.href = 'my-trips.html?view=timeline';
}

// Logout function (from api.js)
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    removeToken();
    window.location.href = 'index.html';
  }
}
