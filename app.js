// Load poems from poems.json and render them
fetch('poems.json')
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('quotes-container');

    data.forEach((item) => {
      const quoteDiv = document.createElement('div');
      quoteDiv.classList.add('quote');
      const p = document.createElement('p');
      p.textContent = item.poem;
      quoteDiv.appendChild(p);
      container.appendChild(quoteDiv);
    });
  })
  .catch((err) => console.error('Error loading poems:', err));
