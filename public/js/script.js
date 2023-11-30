document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');

    // Function to send a request to the server
    async function sendRequest(url, method, data) {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const result = await sendRequest('/users/login', 'POST', { username, password });
                console.log('Login Success:', result);
                // Redirect to dashboard or another page upon successful login
                window.location.href = '/dashboard';
            } catch (error) {
                console.error('Login Error:', error);
                // Handle login error (e.g., display an error message)
            }
        });
    }

    // Post submission
    if (postForm) {
        postForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const postTitle = document.getElementById('post-title').value;
            const postContent = document.getElementById('post-content').value;

            try {
                const result = await sendRequest('/posts', 'POST', { title: postTitle, content: postContent });
                console.log('Post Submitted:', result);
                // Handle post submission success (e.g., clear form, show success message)
            } catch (error) {
                console.error('Post Submission Error:', error);
                // Handle post submission error (e.g., display an error message)
            }
        });
    }
});
