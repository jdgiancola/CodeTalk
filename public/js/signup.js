document.querySelector('#signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#name').value; // Changed variable name to username
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/users', {  // Updated URL to match server route
      method: 'POST',
      body: JSON.stringify({ username, email, password }), // Changed key from name to username
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the login page or profile page
      window.location.href = '/login';
    } else {
      // Handle signup error (e.g., display an error message)
      console.error('Signup failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
