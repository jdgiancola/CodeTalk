const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/posts', { // Updated URL
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/posts/${id}`, { // Updated URL
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload(); // This will refresh the page to reflect the changes
    } else {
      alert('Failed to delete post');
    }
  }
};

const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('#comment-text').value.trim();
  const post_id = event.target.getAttribute('data-post-id'); // Adjust as needed to get the correct post ID

  if (comment_text && post_id) {
    const response = await fetch('/comments', { // Updated URL
      method: 'POST',
      body: JSON.stringify({ comment_text, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
.querySelectorAll('.new-comment-form') // Adjust selector if needed
.forEach(form => form.addEventListener('submit', newCommentFormHandler));

document
.querySelector('.new-post-form')
.addEventListener('submit', newPostFormHandler);

document
.querySelector('.post-list') // Ensure your HTML has a container with this class
.addEventListener('click', delButtonHandler);
