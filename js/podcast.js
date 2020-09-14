// Handle AJAX Calls
var requestCache = {};

LoadDataFromApi = (apiUrl) => {
  if (!requestCache[apiUrl]) {
    requestCache[apiUrl] = $.ajax({
      type: 'GET',
      url: apiUrl,
      dataType: "json"
    });
  }
  return requestCache[apiUrl];
}

// Load Homepage
homepage()

function homepage() {

  // Fade In Animation 
  $('#podcast, #dummy-footer').css('display', 'none');
  $('#podcast, #dummy-footer').fadeIn(1000);
  
  var urlRecommendation = 'data/categories/0.json'
  var urlCategories = 'data/categories/list.json'
  var urlStories = 'data/categories/11.json'
  var urlHorror = 'data/categories/6.json'
  var urlEducation = 'data/categories/4.json'

  $.when(
    LoadDataFromApi(urlRecommendation),
    LoadDataFromApi(urlCategories),
    LoadDataFromApi(urlStories),
    LoadDataFromApi(urlHorror),
    LoadDataFromApi(urlEducation),
    )
    .done(function(recommendation, categories, stories, horror, education){
        //do something
        fetchRecommendation(recommendation)
        fetchCategories(categories)
        fetchStories(stories)
        fetchHorror(horror)
        fetchEducation(education)
    })
    .then(function(){ loadOwlCarousel() })
    .fail(function(){
        //handle errors
    });

    function fetchRecommendation(recommendation) {
      // Get Recommendation
      var category_id = '0';
      var category_name = 'recommendation';
      appendCategory(category_name);
      var podcasts = recommendation[0].data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)
    }

    function fetchCategories(categories) {
      // Get Categories
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
      
      $.map(categories[0].data, function(x, i) {
        var category_id = x.category_id;
        var category_icon = x.category_icon;
        var category_title = x.category_title;
        
        $( "#categories .row" ).append(`
        <div class="item col-xs-6 col-sm-4 col-sm-3 col-lg-2">
        <a href="#" onclick="category(\'${category_id}'\, \'${category_title}'\)" class="menu">
        <i class="icon fa fa-${category_icon}"></i> ${category_title}
        </a>
        </div>
        `);
      })
    }

    function fetchStories(stories) {
      // Get Stories
      var category_id = '11';
      var category_name = 'stories';
      appendCategory(category_name);
      var podcasts = stories[0].data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)
    }

    function fetchHorror(horror) {
      // Get Horror
      var category_id = '6';
      var category_name = 'horror';
      appendCategory(category_name);
      var podcasts = horror[0].data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)
    }

    function fetchEducation(education) {
      // Get Education
      var category_id = '4';
      var category_name = 'education';
      appendCategory(category_name);
      var podcasts = education[0].data.podcasts;
      displayPodcasts(category_id, category_name, podcasts)  
    }
  
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