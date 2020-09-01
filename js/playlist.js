
// Playlist 
function getPlaylist(id) {
    $.get( "../data/channels.json", function( data ) {
      var result = data.filter(x => x.id === id);
      var title = result[0].title;
      var image = result[0].image;
      var desc = result[0].description;
      var author = result[0].author;
      
    $('#podcast').html(`
    <div id="playlist">
      <h3>${title}</h3>
      <br>
      <div class="row row-eq-height">
        <div class="col-xs-2">
          <img src=${image} class="img-responsive" alt=${title} />
        </div>
        <div class="col-xs-10">
          <h4>${title}</h4>
          <p>${author}</p>
          <p>${desc}</p>
          <a href="#" class="btn btn-default" onclick="player(\'${id}'\)">Play</a>
        </div>
      </div>
      <div id="playlist-items"></div>
    </div>
    `);  
    })

    playlistItems(id);

  }  


  // Playlist Items
  function playlistItems(id) {
      
    $.get( "../data/playlist.json", function( data ) {
        var result = data.filter(y => y.id === id);
        var playlist = result[0].playlist;

        $.map(playlist, function(y, i) {
            var id = y.id;
            var title = y.title;
            var desc = y.description;
    
            $('#playlist-items').append(`
                <div class="playlist-item-${id}" onclick="player(\'${id}'\)">
                    <div class="row row-eq-height">
                        <div class="vertical-align col-xs-2 col-md-1">
                            <img src="images/icons/play.svg" class="play-button img-responsive" alt="">
                        </div>
                        <div class="col-xs-10 col-md-11">
                            <h6 class="title">${title}</h6>
                            <p class="desc">${desc.slice(0,300)}</p>
                        </div>
                    </div>
                </div>
            `)
          })
    })
  }