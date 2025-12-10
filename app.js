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

    // Circle number badge
    const num = document.createElement('div');
    num.textContent = poemsData.indexOf(item) + 1;

    Object.assign(num.style, {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#ff7bbf',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px auto',
      fontSize: '18px',
      fontWeight: 'bold',
      textShadow: '0 0 5px rgba(255, 255, 255, 0.6)',
      boxShadow: '0 0 10px rgba(255, 0, 150, 0.4)',
    });

    // Poem text
    const p = document.createElement('p');
    p.textContent = item.poem;

    quoteDiv.appendChild(num);
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
