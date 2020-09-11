homepage()

function homepage() {
    
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
  LoadDataFromApi('../data/categories/0.json')
    .then(function getRecommendation(result) {

      var category_id = '0';
      var category_name = 'recommendation';
      appendCategory(category_name);

      var podcasts = result.data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)
    
    })

    // Get Categories
    LoadDataFromApi('../data/categories/list.json')
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
    LoadDataFromApi('../data/categories/11.json')
    .then(function getStories(result) {

      var category_id = '11';
      var category_name = 'stories';
      appendCategory(category_name);

      var podcasts = result.data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)
        
    })

      // Get Education
      LoadDataFromApi('../data/categories/4.json')
      .then(function getStories(result) {
    
        var category_id = '4';
        var category_name = 'education';
        appendCategory(category_name);

        var podcasts = result.data.podcasts;
        displayPodcasts(category_id, category_name, podcasts)
          
      })

      // Get Horror
      LoadDataFromApi('../data/categories/6.json')
      .then(function getStories(result) {

        var category_id = '6';
        var category_name = 'horror';
        appendCategory(category_name);

        var podcasts = result.data.podcasts;
        displayPodcasts(category_id, category_name, podcasts)
            
      })
    
    // Call Owl Carousel after All AJAX data Loaded
    .then(function(){ loadOwlCarousel() })

    // Append Category Div
    function appendCategory(category) {
      $( "#podcast" ).append(`
      <div id=${category}>
        <h3 class="category_title">${category}</h3>
        <br>
        <div class="owl-carousel owl-theme">
        </div>
      </div>
    `)
    }

    // Display Podcasts by Category
    function displayPodcasts(category_id, category_name, podcasts) {

      $.map(podcasts, function(x, i) {

        var podcast_id = x.id;
        var podcast_image = x.image;
        var podcast_title = x.title;
        var podcast_desc = x.description.slice(0,50);

        $( `#${category_name} .owl-carousel` ).append(`
          <div class="channel-${podcast_id}">
            <figure class="overlay imghvr-fade">
              <img src=${podcast_image} class="podcast-cover-${podcast_id}" alt="">
              <figcaption>
                <img src="images/icons/play.svg" onclick="player(\'${podcast_id}'\)" class="play-button img-responsive" alt="">
              </figcaption>
            </figure>
            <a class="info" onclick="getPlaylist(\'${category_id}'\,\'${category_name}'\,\'${podcast_id}'\)">
              <h6>${podcast_title}</h6>
              <p class="hidden-xs">${podcast_desc}</p>
              </a>
          </div>    
        `);
      });
          
    }

}