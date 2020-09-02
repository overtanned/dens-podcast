// Initial Load
$( document ).ready(function() {
  getRecommendation();
  getCategories();
});

// Wait until AJAX finishes loading Data
$( document ).ajaxStop(function() {
  loadOwlCarousel();
});


// Recommendation
function getRecommendation() {
  $.get( "../data/podcasts.json", function( data ) {
    
    $.map(data, function(x, i) {
      var podcast_id = x.podcast_id;
      var podcast_image = x.podcast_image;
      var podcast_title = x.podcast_title;
      var podcast_desc = x.podcast_description.slice(0,50);

      $( "#recommendation .owl-carousel" ).append(`
        <div class="channel">
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
    
  });
}

// owlCarousel
function loadOwlCarousel() {
  $('.owl-carousel').owlCarousel({
    loop:false,
    margin:20,
    nav:true,
    navText : ['<i class="icon ion-ios-arrow-left"></i>','<i class="icon ion-ios-arrow-right"></i>'],
    dots: false,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
  })
}


// Categories
function getCategories() {

  $.get( "../data/categories.json", function( data ) {
    $.map(data, function(x, i) {
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
    
  });
}

function backToHomepage() {
  location.reload(true);
}