let poemsData = []; // global for filtering

fetch('poems.json')
  .then((res) => res.json())
  .then((data) => {
    poemsData = data;
    renderPoems(data); // initial render of all
  })
  .catch((err) => console.error('Error loading poems:', err));

// Render function that prints poems to the page
function renderPoems(list) {
  const container = document.getElementById('quotes-container');

  // remove old poems but keep header + input
  container.querySelectorAll('.quote').forEach((q) => q.remove());

  list.forEach((item) => {
    const quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote');

    const p = document.createElement('p');
    p.textContent = item.poem;

    quoteDiv.appendChild(p);
    container.appendChild(quoteDiv);
  });
}

// Input listener
document.getElementById('poemInput').addEventListener('input', (e) => {
  const value = e.target.value;

  if (value === '') {
    // Input cleared → show all
    renderPoems(poemsData);
  } else {
    const index = parseInt(value) - 1; // user enters 1-based index

    if (!isNaN(index) && poemsData[index]) {
      renderPoems([poemsData[index]]);
    } else {
      // If number is invalid → show none
      renderPoems([]);
    }
  }
});
