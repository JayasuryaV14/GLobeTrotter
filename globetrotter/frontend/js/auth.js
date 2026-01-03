// Login Handler
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");
  const loginBtnText = document.getElementById("loginBtnText");
  const loginLoader = document.getElementById("loginLoader");
  const submitButton = event.target.querySelector('button[type="submit"]');

  // Hide error message
  errorMessage.style.display = "none";
  
  // Show loading state
  submitButton.disabled = true;
  loginBtnText.style.display = "none";
  loginLoader.style.display = "inline-block";

  try {
    const response = await authAPI.login(email, password);
    
    // Store token and user data
    setToken(response.token);
    setUser(response.user);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    // Show error message
    errorMessage.textContent = error.message || "Login failed. Please try again.";
    errorMessage.style.display = "block";
    
    // Reset button state
    submitButton.disabled = false;
    loginBtnText.style.display = "inline";
    loginLoader.style.display = "none";
  }
}

// Signup Handler
async function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");
  const signupBtnText = document.getElementById("signupBtnText");
  const signupLoader = document.getElementById("signupLoader");
  const submitButton = event.target.querySelector('button[type="submit"]');

  // Hide error message
  errorMessage.style.display = "none";
  
  // Show loading state
  submitButton.disabled = true;
  signupBtnText.style.display = "none";
  signupLoader.style.display = "inline-block";

  try {
    const response = await authAPI.register(name, email, password);
    
    // Store token and user data
    setToken(response.token);
    setUser(response.user);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    // Show error message
    errorMessage.textContent = error.message || "Registration failed. Please try again.";
    errorMessage.style.display = "block";
    
    // Reset button state
    submitButton.disabled = false;
    signupBtnText.style.display = "inline";
    signupLoader.style.display = "none";
  }
}

// Legacy login function for backwards compatibility (if needed)
function login() {
  handleLogin(event);
}
