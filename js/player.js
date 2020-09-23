// Player
function player(podcast_id) {

    $.get( `data/episodes/${podcast_id}.json`, function( result ) {

    var newest_episode = result.data.episodes[0]

    var title = newest_episode.title.slice(0,30);
    // var image = 'images/noimage.jpg';
    var image = $(`.podcast-cover-${podcast_id}`).attr('src')
    var desc = newest_episode.description.slice(0,50);
    var link = newest_episode.link;

    console.log(link)

  $( "#player" ).show().html(`
  <div class="container-fluid">
    <div class="row row-eq-height">
      <div class="col-xs-3 col-sm-2 col-md-1">
        <img src=${image} class="img-responsive" alt="">
      </div>
      <div class="hidden-xs hidden-sm col-md-2">
        <h6>${title}</h6>
        <p>${desc}</p>
      </div>
      <div id="player-container"class="col-xs-9 col-sm-8 col-md-6 text-center">
        <audio id="podcast-player" src=${link} type="audio/mp3" ontimeupdate="initProgressBar()" preload="metadata" autoplay>
        </audio>

        <div class="player-controls"> 
          <img src="images/icons/pause.svg" class="pause" onclick="pause()" alt="">
          <img src="images/icons/play.svg" class="play" onclick="play()" alt="">
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
      <div id="volume" class="hidden-xs col-sm-2 col-md-3">
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

  function initProgressBar() {
    var player = document.getElementById('podcast-player');
    var length = player.duration
    var current_time = player.currentTime;
  
    // calculate total length of value
    var totalLength = calculateTotalValue(length);
    document.getElementById("end-time").innerHTML = totalLength;

    // Fix NaN:NaN on total duration
    var podcast = document.getElementById("podcast-player");
      podcast.onloadedmetadata = function() {
      document.getElementById("end-time").innerHTML = '0:00';
    };
  
    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    document.getElementById("start-time").innerHTML = currentTime;
  
    var progressbar = document.getElementById('seek-obj');
    var calc = (player.currentTime / player.duration);

    if (isNaN(calc)) {
      return;
    }

    progressbar.value = calc;
    progressbar.addEventListener("click", seek);
  
    // if (player.currentTime == player.duration) {
    //   document.getElementById('play-btn').className = "";
    // }
  
    function seek(event) {
      var percent = event.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  };

  function pause() {
    var podcast = document.getElementById("podcast-player");
    podcast.pause();
    $('.pause').hide();
    $('.play').show();
  }
  
  function play() {
    var podcast = document.getElementById("podcast-player");
    podcast.play();

    // set volume to 50%
    podcast.volume = 0.5;

    var currentVolume = podcast.volume;
    $('#volume-slider').val(currentVolume);
    
    $('.play').hide();
    $('.pause').show();
  }

  function stopAllAudio() {
    var allAudios = document.querySelectorAll('audio');
      allAudios.forEach(function(audio){
          audio.pause();
      });
  }  

  function volumeUp() {
    var podcast = document.getElementById("podcast-player");
    podcast.volume += 0.1;
    volumeBar()
  }

  function volumeDown() {
    var podcast = document.getElementById("podcast-player");
    podcast.volume -= 0.1;
    volumeBar()
  }

  function volumeBar() {
    var podcast = document.getElementById("podcast-player");
    var currentVolume = podcast.volume;
    $('#volume-slider').val( function() {
        return currentVolume;
    });
  }
  
  function calculateTotalValue(duration) {

    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;

  }
  
  function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
      current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  
    return current_time;
  }