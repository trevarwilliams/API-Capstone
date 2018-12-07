'use strict'

function searchSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    // Clear out existing results if any
    $('.js-search-header').html('');
    $('.js-search-results').html('');
    // Get search value
    const queryTarget = $(event.currentTarget).find('#band-search');
    const query = queryTarget.val();
    // Get API info
    getArtistFromLastFM(query, displayArtistData);
    getSimilarFromLastFM(query, displaySimilarData);
    // Clear out search field
    queryTarget.val('');
    //Hide landing page
    $('.landing-page-container').prop('hidden', true);
    // Unhide results container
    $('.search-results').prop('hidden', false);
  });
}

const lastfm_search_url = 'https://ws.audioscrobbler.com/2.0/';
// last.fm key: b555326f947cfc49eb798cc3643beaab

// Find information on the searched artist
function getArtistFromLastFM(searchTerm, callback) {
  const query = {
    artist: `${searchTerm}`,
    autocorrect: 1,
    api_key: 'b555326f947cfc49eb798cc3643beaab',
    method: 'artist.getInfo',
    format: 'json',
  }
  $.getJSON(lastfm_search_url, query, callback);
}

// Find similar artist from searched artist
function getSimilarFromLastFM(searchTerm, callback) {
  const query = {
    artist: `${searchTerm}`,
    autocorrect: 1,
    limit: 20,
    api_key: 'b555326f947cfc49eb798cc3643beaab',
    method: 'artist.getSimilar',
    format: 'json',
  }
  $.getJSON(lastfm_search_url, query, callback);
}

// Generate & inject HTML for searched artist
function displayArtistData(data) {
  try {
    const resultsHeader = `
    <a href="${data.artist.url}" target="_blank">
      <div class="resultsHeader" style="background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${data.artist.image[4][`#text`]}) no-repeat;">
      <span class="band-name">${data.artist.name}</span>
      </div>
    </a>
    <div class="artist-bio">
    <span>${data.artist.bio.summary}</span>
    </div>
    `;
    $('.js-search-header').append(resultsHeader);
  }
  catch (err) {
    const queryTarget = $(event.currentTarget).find('#band-search');
    const query = queryTarget.val();
    const errorMessage = `
    <h2>That artist was not found, please try another!</h2>`
    $('.js-search-header').append(errorMessage);
  }
}

// Set HTML for similar artists
function generateSimilarResults(result) {
  return `
    <a href="${result.url}" target="_blank">
      <div class="similarResults" style="background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${result.image[4][`#text`]}) no-repeat;">
      <span class="band-name">${result.name}</span>
      </div>
    </a>`;
}

// Generate and inject similar artists results
function displaySimilarData(data) {
  // Generates HTML body for similar artists from search
  const result = data.similarartists.artist.map((item, index) => generateSimilarResults(item));
  // Inject search results
  $('.js-search-results').prepend(`<h2>Similar Artists</h2>`);
  $('.js-search-results').append(result);
}

$(searchSubmit);