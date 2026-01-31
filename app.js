let poemsData = []; // global for filtering

fetch('poems.json')
  .then((res) => res.json())
  .then((data) => {
    poemsData = data;

    // set count ONCE on load
    const counter = document.getElementById('poems-count');
    if (counter) {
      counter.textContent = `✦ ${data.length} Поэм ✦`;
    }

    renderPoems(data); // initial render of all
  })
  .catch((err) => console.error('Error loading poems:', err));

// Render function that prints poems to the page
function renderPoems(list) {
  const container = document.getElementById('quotes-container');

  // remove old poems but keep header + input
  Array.from(container.querySelectorAll('.quote')).forEach((q) => q.remove());

  list.forEach((item) => {
    const quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote');

    const numWrapper = document.createElement('div');
    numWrapper.classList.add('num-wrapper');

    const num = document.createElement('div');
    num.classList.add('num-badge');

    const idx = poemsData.findIndex((p) => p.poem === item.poem);
    num.textContent = idx >= 0 ? idx + 1 : '';

    numWrapper.appendChild(num);
    quoteDiv.appendChild(numWrapper);

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
    renderPoems(poemsData);
  } else {
    const index = parseInt(value, 10) - 1;

    if (!isNaN(index) && poemsData[index]) {
      renderPoems([poemsData[index]]);
    } else {
      renderPoems([]);
    }
  }
});
