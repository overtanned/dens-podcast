
// Playlist 
function getPlaylist(podcast_id) {
    $.get( "../data/podcasts.json", function( data ) {
      var result = data.filter(x => x.podcast_id === podcast_id);
      var podcast_category = result[0].podcast_category;
      var podcast_title = result[0].podcast_title;
      var podcast_image = result[0].podcast_image;
      var podcast_desc = result[0].podcast_description;
      var podcast_author = result[0].podcast_author;
      var podcast_playlist = result[0].podcast_playlist;

      $.map(podcast_playlist, function(y, i) {
        var episode_id = y.episode_id;
        var episode_file = y.episode_file;
        var episode_title = y.episode_title;
        var episode_desc = y.episode_description.slice(0,300);

        $( document ).ajaxStop(function() {
          $('#playlist-items').append(`
          <div class="episode-${episode_id}" onclick="playlistPlayer(\'${episode_id}'\)">
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
      
    $('#podcast').html(`
    <div id="playlist">
      <h3>${podcast_category}</h3>
      <br>
      <div class="row row-eq-height">
        <div class="col-xs-2">
          <img id="podcast_cover" src=${podcast_image} class="img-responsive" alt=${podcast_title} />
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

  }  

// Customized Player for Playlist Page
function playlistPlayer(episode_id) {
  LoadDataFromApi('../data/podcasts.json')
  .then(function (data) {

    var episode = [];

    data.forEach(function(e) {
      episode = episode.concat(e.podcast_playlist.filter(function(c) {
          return (c.episode_id === episode_id);
      }));
    });
    
    var podcast_image = $('#podcast_cover').attr('src');
    var episode_file = episode[0].episode_file;
    var episode_desc = episode[0].episode_description.slice(0,50);
    var episode_title = episode[0].episode_title.slice(0,30);

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