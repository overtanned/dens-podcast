// Initial Load
$( document ).ready(function() {
  
  getRecommendation();
  getCategories();

});

// Recommendation
function getRecommendation() {
  $.get( "../data/channels.json", function( data ) {
    
    $.map(data, function(x, i) {
      var id = x.id;
      var image = x.image;
      var title = x.title;
      var desc = x.description;

      $( "#recommendation .row" ).append(`
        <div class="channel col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <figure class="overlay imghvr-fade">
            <img src=${image} class="podcastImg img-responsive" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${id}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <h6><a href="#" onclick="getPlaylist(\'${id}'\)">${title}</a></h6>
          <p class="hidden-xs"><a href="/">${desc.slice(0,50)}</a></p>
        </div>    
      `);
    });
    
  });
}

// Categories
function getCategories() {

  $.get( "../data/categories.json", function( data ) {
    $.map(data, function(x, i) {
      var icon = x.icon;
      var title = x.title;

      $( "#categories .row" ).append(`
      <div class="item col-xs-6 col-sm-4 col-lg-2">
      <a href="#" onclick="category(\'${title}'\)" class="menu">
      <i class="icon fa fa-${icon}"></i> ${title}
      </a>
      </div>
      `);
    });
    
  });
}

// if a Category is Clicked
function category(title) {
  $('#podcast')
  .html(`<h3><i class="fas fa-chevron-left" onclick="backToHomepage()"></i> ${title}</h3>`)
}

function backToHomepage() {
  location.reload(true);
}