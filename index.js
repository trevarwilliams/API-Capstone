'use strict'

const tastedive_search_url = 'https://tastedive.com/api/similar';
const ticketmaster_search_url = 'https://app.ticketmaster.com/discovery/v2/';

function getDataFromTastedive(searchTerm, callback) {
  // https://tastedive.com/read/api
  // https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction
  const query = {
    q: `${searchTerm}`,
    type: 'music',
    info: 0,
    limit: 10,
    k: '324182-APICapst-PHNDXBD6',
    }
  $.getJSON(tastedive_search_url, query, callback);
}

function getDataFromTicketmaster(searchTerm, callback) {
  //Discovery API
  // https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
  // waiting on verification email
  const query = {
  }
  $.getJSON(ticketmaster_search_url, query, callback);
}

function displaySearchData(data) {
  // Create each search result HTML
  const results = data.items.map((item, index) => generateResults(item));
  // Inject results
  $('.search-results')
    .html(results)
    .prop('hidden', false);
}

function generateResults(result) {
// HTML Structure for each search results
  return `
    <div class="results">
    </div>`;
}

function searchSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    // Find input, feed to API
    const queryTarget = $(event.currentTarget).find('#video-search');
    const query = queryTarget.val();
    getDataFromTastedive(query, displaySearchData);
    //Empty search input
    queryTarget.val("");
  });
}

$(searchSubmit);