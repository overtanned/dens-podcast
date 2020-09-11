
// Playlist 
function getPlaylist(category_id, category_name, podcast_id) {

    $.get( `../data/categories/${category_id}.json`, function( result ) {

      var podcasts = result.data.podcasts

      var result = podcasts.filter(x => x.id === podcast_id)[0];

      var podcast_title = result.title;
      var podcast_image = result.image;
      var podcast_desc = result.description;
      var podcast_author = result.author;
      
      $('#podcast').html(`
      <div id="playlist">
        <h3 class="category_title"><a href="#" class="category_back" onclick="backToCategory(\'${category_id}'\)"><i class="fas fa-chevron-left"></i></a> ${category_name}</h3>
        <br>
        <div class="row row-eq-height">
          <div class="col-xs-2">
            <img src=${podcast_image} class="podcast-cover-${podcast_id} img-responsive" alt=${podcast_title} />
          </div>
          <div class="podcast_info col-xs-10">
            <h4>${podcast_title}</h4>
            <p>by ${podcast_author}</p>
            <p>${podcast_desc}</p>
            <a href="#" class="btn btn-playlist" onclick="player(\'${podcast_id}'\)"><i class="far fa-play-circle"></i> Play</a>
          </div>
        </div>
        <div id="playlist-items"></div>
      </div>
      `);  
      })

      getEpisodes(podcast_id)

  }  

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
    
// Get Podcast Episodes
function getEpisodes(podcast_id) {

  LoadDataFromApi(`../data/episodes/${podcast_id}.json`)
  .then(function (result) {

  var data = result.data.episodes

  $.map(data, function(y, i) {

    var episode_id = y.id;
    var episode_title = y.title;
    var episode_desc = y.description.slice(0,300);

      $('#playlist-items').append(`
      <div class="episode-${episode_id}" onclick="playlistPlayer(\'${podcast_id}'\,\'${episode_id}'\)">
          <div class="row row-eq-height">
              <div class="vertical-align col-xs-2 col-md-1 nopadding">
                  <img src="images/icons/play.svg" class="play-button img-responsive" alt="">
              </div>
              <div class="col-xs-10 col-md-11 nopadding">
                  <h6 class="title">${episode_title}</h6>
                  <p class="desc hidden-xs">${episode_desc}</p>
              </div>
          </div>
      </div>
      `)
    });
  })

}

// Customized Player for Playlist Page
function playlistPlayer(podcast_id, episode_id) {
  LoadDataFromApi(`../data/episodes/${podcast_id}.json`)
  .then(function (result) {

    var episodes = result.data.episodes
    var episode = episodes.filter(x => x.id === episode_id)[0];
    
    var podcast_image = $(`.podcast-cover-${podcast_id}`).attr('src')
    var episode_file = episode.link;
    var episode_desc = episode.description.slice(0,50);
    var episode_title = episode.title.slice(0,30);

    $( "#player" ).show().html(`
    <div class="container-fluid">
      <div class="row row-eq-height">
        <div class="col-md-1">
          <img src=${podcast_image} class="img-responsive" alt="">
        </div>
        <div class="col-md-2">
          <h6>${episode_title}</h6>
          <p>${episode_desc}</p>
        </div>
        <div id="player-container"class="col-md-6 text-center">
          <audio id="podcast-player" ontimeupdate="initProgressBar()">
            <source src=${episode_file} type="audio/mp3">
          </audio>
  
          <div class="player-controls"> 
            <img src="../images/icons/pause.svg" class="pause" onclick="pause()" alt="">
            <img src="../images/icons/play.svg" class="play" onclick="play()" alt="">
            <div class="clearfix"></div>
  
            <div class="row">
              <div class="col-xs-2 text-right">
                <small id="start-time"></small>
              </div>
              <div class="col-xs-8">
                <span id="seek-obj-container">
                  <progress id="seek-obj" value="0" max="1"></progress>
                </span>
              </div>
              <div class="col-xs-2 text-left">
                <small id="end-time"></small>
              </div>
            </div>
            
          </div>
        </div>
        <div id="volume" class="col-md-3">
          <div class="row">
            <div class="col-xs-2 text-right">
              <img src="images/icons/volume-down.svg" class="volumeDown" onclick="volumeDown()" alt="">
            </div>
            <div class="col-xs-8">
              <progress id="volume-slider" value="" max="1"></progress>
            </div>
            <div class="col-xs-2 text-left">
            <img src="images/icons/volume-up.svg" class="volumeUp" onclick="volumeUp()" alt="">
            </div>
          </div>
      </div>
    </div>
    </div>`);    
  
    stopAllAudio(); // stop all other audio before playing a new one
    play();


  })
}

function backToCategory(category_id) {

  // bersihin halaman
  $('#podcast').empty()
  category(category_id)

}  