document.querySelector('#signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
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
  