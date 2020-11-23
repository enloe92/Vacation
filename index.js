'use strict';

// put your own value below!
const apiKey = 'L8soRHvo4iHI4DcnDe3ccBzMmSBQMcCs0pfusB6O'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">Visit their website!</a>
      <h4>The Park is Located at:</h4>
      <p>${responseJson.data[i].addresses[0].line1}</p>
      <p>${responseJson.data[i].addresses[0].line2}</p>
      <p>${responseJson.data[i].addresses[0].line3}</p>
      <p>${responseJson.data[i].addresses[0].city}</p>
      <p>${responseJson.data[i].addresses[0].stateCode}</p>
      <p>${responseJson.data[i].addresses[0].postalCode}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(query, limit=10) {
  
  const queryString = `${query}&limit=${limit}&sort=&api_key=${apiKey}`
  
  const url = searchURL + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);