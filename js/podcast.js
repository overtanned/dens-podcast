// Handle Ajax Call
var requestCache = {};

function LoadDataFromApi(apiUrl) {
  if (!requestCache[apiUrl]) {
    requestCache[apiUrl] = $.ajax({
        type: 'GET',
        url: apiUrl,
        dataType: "json"
    });
  }

  return requestCache[apiUrl];
}

// Get Recommendation
LoadDataFromApi('../data/podcasts.json')
  .then(function getRecommendation(data) {

    $( "#podcast" ).append(`
      <div id="recommendation">
        <h3>Recommendation</h3>
        <br>
        <div class="owl-carousel owl-theme">
        </div>
      </div>
    `)

    $.map(data.slice(0,10), function(x, i) {
      var podcast_id = x.podcast_id;
      var podcast_category = x.podcast_category;
      var podcast_image = x.podcast_image;
      var podcast_title = x.podcast_title;
      var podcast_desc = x.podcast_description.slice(0,50);

      $( `#recommendation .owl-carousel` ).append(`
        <div class="channel-${podcast_id}">
          <figure class="overlay imghvr-fade">
            <img src=${podcast_image} class="podcastImg" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${podcast_id}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <a class="info" onclick="getPlaylist(\'${podcast_id}'\)">
            <h6>${podcast_title}</h6>
            <p class="hidden-xs">${podcast_desc}</p>
            </a>
        </div>    
      `);
    }); 
  
  })

  // Get Categories
  LoadDataFromApi('../data/categories.json')
  .then(function getCategories(result) {

    $("#recommendation").after(`
    <div id="categories">
      <hr>
      <h3>Categories</h3>
      <br>
      <div class="row row-eq-height">
      </div>
    <hr>
    </div>
    `)

    $.map(result.data, function(x, i) {
      var category_id = x.category_id;
      var category_icon = x.category_icon;
      var category_title = x.category_title;

      $( "#categories .row" ).append(`
      <div class="item col-xs-6 col-sm-4 col-lg-2">
      <a href="#" onclick="category(\'${category_id}'\, \'${category_title}'\)" class="menu">
      <i class="icon fa fa-${category_icon}"></i> ${category_title}
      </a>
      </div>
      `);
    });
  })

  // Get Stories
  LoadDataFromApi('../data/podcasts.json')
  .then(function getStories(data) {

    $( "#podcast" ).append(`
      <div id="stories">
        <h3>Stories</h3>
        <br>
        <div class="owl-carousel owl-theme">
        </div>
      </div>
    `)

      var filter = data.filter(x => x.category_id === '11');
      displayPodcasts(filter)      
      
  })

    // Get Education
    LoadDataFromApi('../data/podcasts.json')
    .then(function getStories(data) {
  
      $( "#podcast" ).append(`
        <div id="education">
          <h3>Education</h3>
          <br>
          <div class="owl-carousel owl-theme">
          </div>
        </div>
      `)
  
        var data = data.filter(x => x.category_id === '4');
        displayPodcasts(data)      
        
    })

    // Get Horror
    LoadDataFromApi('../data/podcasts.json')
    .then(function getStories(data) {
  
      $( "#podcast" ).append(`
        <div id="horror">
          <h3>Horror</h3>
          <br>
          <div class="owl-carousel owl-theme">
          </div>
        </div>
      `)
  
        var filter = data.filter(x => x.category_id === '6');
        displayPodcasts(filter)        
    })
  
  // Call Owl Carousel after All AJAX data Loaded
  .then(function(){ loadOwlCarousel() })

  // Display Podcasts by Filter
  function displayPodcasts(filter) {
    $.map(filter, function(x, i) {
      var podcast_id = x.podcast_id;
      var podcast_category = x.podcast_category.toLowerCase();
      var podcast_image = x.podcast_image;
      var podcast_title = x.podcast_title;
      var podcast_desc = x.podcast_description.slice(0,50);

      $( `#${podcast_category} .owl-carousel` ).append(`
        <div class="channel-${podcast_id}">
          <figure class="overlay imghvr-fade">
            <img src=${podcast_image} class="podcastImg" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${podcast_id}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <a class="info" onclick="getPlaylist(\'${podcast_id}'\)">
            <h6>${podcast_title}</h6>
            <p class="hidden-xs">${podcast_desc}</p>
            </a>
        </div>    
      `);
    });
  }