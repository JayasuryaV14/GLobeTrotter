// Trip Management JavaScript

// Create Trip function (for backward compatibility)
function createTrip() {
  window.location.href = 'create-trip.html';
}

// Save Trip function (legacy - will be replaced by handleCreateTrip in create-trip.html)
function saveTrip() {
  const inputs = document.querySelectorAll('input');
  const textarea = document.querySelector('textarea');

  const trip = {
    user_id: getUser()?.id || 1,
    name: inputs[0].value,
    start_date: inputs[1].value,
    end_date: inputs[2].value,
    description: textarea.value
  };

  // TODO: Replace with apiRequest when authentication is ready
  fetch(`${API_BASE_URL}/trips/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(trip)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Trip created:', data);
    alert('Trip Saved!');
    window.location.href = 'itinerary-builder.html';
  })
  .catch(err => {
    console.error('Error saving trip:', err);
    alert('Failed to save trip. Please try again.');
  });
}

// Open Trip function (legacy)
function openTrip() {
  window.location.href = 'itinerary-builder.html';
}

// View Itinerary
function viewItinerary(tripId) {
  window.location.href = `itinerary-view.html?tripId=${tripId}`;
}

// View Budget
function viewBudget(tripId) {
  window.location.href = `budget.html?tripId=${tripId}`;
}

// View Timeline
function viewTimeline(tripId) {
  window.location.href = `calendar.html?tripId=${tripId}`;
}

// Edit Trip
function editTrip(tripId) {
  window.location.href = `create-trip.html?edit=${tripId}`;
}

// Delete Trip
async function deleteTrip(tripId) {
  if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
    return;
  }

  try {
    // TODO: Replace with actual API call
    // await apiRequest(`/trips/${tripId}`, { method: 'DELETE' });
    
    alert('Trip deleted successfully!');
    location.reload();
  } catch (error) {
    console.error('Error deleting trip:', error);
    alert('Failed to delete trip. Please try again.');
  }
}

// Duplicate Trip
async function duplicateTrip(tripId) {
  if (!confirm('Create a copy of this trip?')) {
    return;
  }

  try {
    // TODO: Replace with actual API call
    // const response = await apiRequest(`/trips/${tripId}/duplicate`, { method: 'POST' });
    
    alert('Trip duplicated successfully!');
    location.reload();
  } catch (error) {
    console.error('Error duplicating trip:', error);
    alert('Failed to duplicate trip. Please try again.');
  }
}
