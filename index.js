'use strict'

function searchSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#band-search');
    const query = queryTarget.val();
    getArtistFromLastFM(query, displayArtistData);
    getSimilarFromLastFM(query, displaySimilarData);
    queryTarget.val("");
  });
}

const lastfm_search_url = 'https://ws.audioscrobbler.com/2.0/';
// last.fm key: b555326f947cfc49eb798cc3643beaab

// Finds information on the searched artist
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

// Finds similar artist from searched artist
function getSimilarFromLastFM(searchTerm, callback) {
  const query = {
    artist: `${searchTerm}`,
    autocorrect: 1,
    limit: 10,
    api_key: 'b555326f947cfc49eb798cc3643beaab',
    method: 'artist.getSimilar',
    format: 'json',
    }
  $.getJSON(lastfm_search_url, query, callback);
}

// Generates & injects HTML for searched artist
function displayArtistData(data) {
   const resultsHeader = `<div class="resultsHeader" style="background-image: url(${data.artist.image[4][`#text`]})">
    <h2><a href="${data.artist.url}" target="_blank">${data.artist.name}</a></h2>
    </div>
    <div class="similarHeader">
    <h2>Similar Artists</h2>
    </div>`;
  $('.search-results').prepend(resultsHeader);
}

function displaySimilarData(data) {
  // Generates HTML body for similar artists from search
  const result = data.similarartists.artist.map((item, index) => generateSimilarResults(item));
  // Inject search results
  $('.search-results')
    .append(result)
    .prop('hidden', false);
}

// Sets HTML for similar artists
function generateSimilarResults(result) {
  return `
    <div class="results" style="background-image: url(${result.image[4][`#text`]})">
    <a href="${result.url}" target="_blank">${result.name}</a><br>
    </div>`;
}

$(searchSubmit);