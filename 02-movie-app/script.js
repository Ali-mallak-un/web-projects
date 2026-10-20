// --- DOM Elements ---
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const movieGrid = document.getElementById('movieGrid');
const loader = document.getElementById('loader');
const message = document.getElementById('message');
const themeToggle = document.getElementById('themeToggle');
const genreFilters = document.getElementById('genreFilters');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// Modal Elements
const movieModal = document.getElementById('movieModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// --- State ---
let allShows = [];
let currentPage = 1;
const itemsPerPage = 20;
let currentGenre = 'all';

// --- Theme Logic ---
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// --- Fetching Data ---
async function fetchShows(url) {
  loader.classList.remove('hidden');
  message.classList.add('hidden');
  movieGrid.innerHTML = '';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    // Handle different API response formats
    if (url.includes('/search/shows')) {
      allShows = data.map(item => item.show);
    } else {
      allShows = data;
    }
    
    currentPage = 1;
    renderShows();
  } catch (error) {
    message.textContent = 'Failed to fetch data. Please try again.';
    message.classList.remove('hidden');
  } finally {
    loader.classList.add('hidden');
  }
}

// --- Helper: Strip HTML Tags ---
function stripHtml(html) {
  if (!html) return 'No description available.';
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

// --- Rendering Logic ---
function renderShows() {
  // 1. Filter by Genre
  let filteredShows = allShows;
  if (currentGenre !== 'all') {
    filteredShows = allShows.filter(show => 
      show.genres && show.genres.includes(currentGenre)
    );
  }

  // 2. Handle Empty State
  if (filteredShows.length === 0) {
    movieGrid.innerHTML = '';
    message.textContent = 'No shows found for this search/filter.';
    message.classList.remove('hidden');
    updatePagination(0);
    return;
  }
  message.classList.add('hidden');

  // 3. Pagination Slicing
  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedShows = filteredShows.slice(startIndex, endIndex);

  // 4. Render Cards
  movieGrid.innerHTML = paginatedShows.map(show => {
    const image = show.image ? show.image.medium : 'https://placehold.co/210x295/333/fff?text=No+Image';
    const rating = show.rating && show.rating.average ? `⭐ ${show.rating.average}` : '⭐ N/A';
    const year = show.premiered ? show.premiered.substring(0, 4) : 'N/A';
    
    // Get up to 2 genres for the card
    const genresHtml = show.genres && show.genres.length > 0 
      ? show.genres.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join('') 
      : '';
    
    return `
      <div class="movie-card" data-id="${show.id}">
        <div class="movie-image-wrapper">
          <img src="${image}" alt="${show.name}" loading="lazy" />
        </div>
        <div class="movie-info">
          <h3>${show.name}</h3>
          <div class="movie-meta">
            <span>${year}</span>
            <span class="movie-rating">${rating}</span>
          </div>
          <div class="movie-genres">
            ${genresHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  updatePagination(totalPages);
}

function updatePagination(totalPages) {
  pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// --- Modal Logic ---
function openModal(show) {
  const image = show.image ? show.image.original : 'https://placehold.co/400x600/333/fff?text=No+Image';
  const rating = show.rating && show.rating.average ? show.rating.average : 'N/A';
  const status = show.status || 'Unknown';
  const language = show.language || 'Unknown';
  const summary = stripHtml(show.summary);
  
  // Format the new professional modal layout
  modalBody.innerHTML = `
    <div class="modal-inner">
      <img class="modal-image" src="${image}" alt="${show.name}" />
      <div class="modal-details">
        <h2>${show.name}</h2>
        
        <div class="modal-badges">
          <span class="badge rating">⭐ ${rating}</span>
          <span class="badge status">${status}</span>
          <span class="badge">${language}</span>
        </div>
        
        <p class="modal-summary">${summary}</p>
        
        <div class="movie-genres">
          ${show.genres.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
  
  movieModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModalHandler() {
  movieModal.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
}

// --- Event Listeners ---

// 1. Search Form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetchShows(`https://api.tvmaze.com/search/shows?q=${query}`);
  }
});

// 2. Genre Filters
genreFilters.addEventListener('click', (e) => {
  if (e.target.classList.contains('genre-btn')) {
    document.querySelectorAll('.genre-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentGenre = e.target.dataset.genre;
    currentPage = 1;
    renderShows();
  }
});

// 3. Pagination
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderShows();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  renderShows();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Open Modal (Event Delegation)
movieGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.movie-card');
  if (!card) return;
  
  const showId = parseInt(card.dataset.id);
  const show = allShows.find(s => s.id === showId);
  
  if (show) {
    openModal(show);
  }
});

// 5. Close Modal
closeModal.addEventListener('click', closeModalHandler);
modalBackdrop.addEventListener('click', closeModalHandler);

// 6. Close Modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !movieModal.classList.contains('hidden')) {
    closeModalHandler();
  }
});

// --- Initial Load ---
fetchShows('https://api.tvmaze.com/shows?page=0');