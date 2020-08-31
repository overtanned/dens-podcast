// Initial Load
$( document ).ready(function() {
  
  getRecommendation();
  getCategories();
  getStories();

});

// Recommendation
function getRecommendation() {
  $.get( "../data/recommendations.json", function( data ) {
    
    $.map(data, function(x, i) {
      var image = x.image;
      var title = x.title;
      var desc = x.description;
      var url = x.url;
      $( "#recommendation .row" ).append(`
        <div class="channel col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <figure class="overlay imghvr-fade">
            <img src=${image} class="podcastImg img-responsive" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${image}'\, \'${title}'\, \'${desc}'\, \'${url}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <h6><a href="/">${title}</a></h6>
          <p class="hidden-xs"><a href="/">${desc.slice(0,50)}</a></p>
        </div>    
      `);
    });
    
  });
}

// Player
function player(image, title, desc, url) {

  $( "body" ).append(`<div id="player">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1">
        <img src=${image} class="img-responsive" alt="">
      </div>
      <div class="col-md-2">
        <h6>${title}</h6>
        <p>${desc.slice(0,50)}</p>
      </div>
      <div class="col-md-6">
        <audio id="podcastPlayer" src=${url}></audio>
        <div> 
          <img src="images/icons/pause.svg" class="pause img-responsive" onclick="document.getElementById('podcastPlayer').pause();" alt="">
          <div id="currentTime">00:00</div>
          <div id="duration">00:00</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <img src="images/icons/volume-down.svg" class="volumeDown img-responsive" onclick="document.getElementById('podcastPlayer').volume += 0.1;" alt="">
          <img src="images/icons/volume-up.svg" class="volumeUp img-responsive" onclick="document.getElementById('podcastPlayer').volume -= 0.1;" alt="">
        </div>
        </div>
    </div>
  </div>
  </div>`);    

  var podcast = document.getElementById("podcastPlayer");
  var currentTime = document.getElementById('currentTime');
  var duration = document.getElementById('duration');
  podcast.play();

  // audio timer/currentime
  var update = setInterval(function() {
    var mins = Math.floor(podcast.currentTime / 60);
    var secs = Math.floor(podcast.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    currentTime.innerHTML = mins + ':' + secs;
  }, 10);

  // audio duration
  podcast.onloadedmetadata = function() {
    console.log(podcast.duration);
  };

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
  $('#recommendation, #stories, #categories').remove();
  $('#podcast').html(`<h3><a href="" onclick="backToHomepage()"><i class="fas fa-chevron-left"></i></a> ${title}</h3>`)
}

function backToHomepage() {
  $('#recommendation, #stories, #categories').html();
}

// Stories
function getStories() {
  $.get( "../data/stories.json", function( data ) {
    
    $.map(data, function(x, i) {
      var image = x.image;
      var title = x.title;
      var desc = x.description;
      var url = x.url;
      $( "#stories .row" ).append(`
        <div class="channel col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <figure class="overlay imghvr-fade">
            <img src=${image} class="podcastImg img-responsive" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${image}'\, \'${title}'\, \'${desc}'\, \'${url}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <h6><a href="/">${title}</a></h6>
          <p class="hidden-xs"><a href="/">${desc.slice(0,50)}</a></p>
        </div>    
      `);
    });
    
  });
}