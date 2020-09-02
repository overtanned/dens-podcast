
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
          <img src=${podcast_image} class="img-responsive" alt=${podcast_title} />
        </div>
        <div class="podcast_info col-xs-10">
          <h4>${podcast_title}</h4>
          <p>${podcast_author}</p>
          <p>${podcast_desc}</p>
          <a href="#" class="btn btn-playlist" onclick="player(\'${podcast_id}'\)"><i class="far fa-play-circle"></i> Play</a>
        </div>
      </div>
      <div id="playlist-items"></div>
    </div>
    `);  
    })

  }  

function playlistPlayer(episode_id) {
  alert(episode_id)
}