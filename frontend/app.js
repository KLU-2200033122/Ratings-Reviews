const USER_ID = localStorage.getItem("user_id");

async function loadProducts() {
  const res = await fetch('https://ratings-reviews-g0hm.onrender.com');
  const products = await res.json();
  const container = document.getElementById('products');

  container.innerHTML = ''; // Clear old content

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';

    const imageName = p.name.toLowerCase().replace(/\s/g, '-') + '.jpg';

    div.innerHTML = `
      <img src="images/${imageName}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      ${USER_ID ? `
        <form onsubmit="submitReview(event, '${p._id}')">
          <input type="number" name="rating" min="1" max="5" placeholder="Rating" required />
          <input type="text" name="review" placeholder="Write a review" />
          <button type="submit">Submit</button>
        </form>
      ` : '<p><em>Please log in to leave a review.</em></p>'}
      <div id="reviews-${p._id}" class="reviews-section"></div>
    `;

    container.appendChild(div);
    loadReviews(p._id);
  });
}

async function submitReview(event, productId) {
  event.preventDefault();
  const form = event.target;
  const rating = form.rating.value;
  const review = form.review.value;

  const response = await fetch(`https://ratings-reviews-g0hm.onrender.com`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: USER_ID,
      rating,
      review
    })
  });

  if (response.ok) {
    alert('Review submitted!');
    form.reset();
    loadReviews(productId);
  } else {
    const error = await response.text();
    alert('Error: ' + error);
  }
}

async function loadReviews(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}/reviews`);
  const reviews = await res.json();
  const container = document.getElementById(`reviews-${productId}`);
  container.innerHTML = reviews.map(r =>
    `<p><strong>${r.user.name}</strong>: ${r.review} (${r.rating}/5)</p>`
  ).join('');
}

loadProducts();
