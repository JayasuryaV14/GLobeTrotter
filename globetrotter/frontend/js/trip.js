function saveTrip(){
  const inputs = document.querySelectorAll("input");
  const textarea = document.querySelector("textarea");

  const trip = {
    user_id: 1,
    name: inputs[0].value,
    start_date: inputs[1].value,
    end_date: inputs[2].value,
    description: textarea.value
  };

  fetch("http://localhost:5000/api/trips/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(trip)
  })
  .then(res => res.json())
  .then(data => {
    console.log("API RESPONSE:", data);
    alert("Trip Saved!");
  })
  .catch(err => console.error("FETCH ERROR:", err));
}
