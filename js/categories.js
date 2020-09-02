// if a Category is Clicked
function category(category_id, category_title) {

    // bersihin halaman
    $('#podcast').html(`
        <h3><a href="#" class="back" onclick="backToHomepage()"><i class="fas fa-chevron-left"></i></a> ${category_title}</h3>
        <div id="podcast_category">
            <div class="row row-eq-height">
            </div>
        </div>
    `)

    // ajax call
    $.get( "../data/podcasts.json", function( data ) {

        // filter by category
        var result = data.filter(x => x.category_id === category_id);

        console.log(result)

        $.map(result, function(y, i) {

            var podcast_id = y.podcast_id;
            var podcast_image = y.podcast_image;
            var podcast_title = y.podcast_title;
            var podcast_desc = y.podcast_description.slice(0,50);

            $( "#podcast_category .row" ).append(`
            <div class="channel col-xs-6 col-sm-4 col-md-3 col-lg-2">
            <figure class="overlay imghvr-fade">
              <img src=${podcast_image} class="podcastImg img-responsive" alt="">
              <figcaption>
                <img src="images/icons/play.svg" onclick="player(\'${podcast_id}'\)" class="play-button img-responsive" alt="">
              </figcaption>
            </figure>
            <a class="info" onclick="getPlaylist(\'${podcast_id}'\)">
              <h6>${podcast_title}</h6>
              <p class="hidden-xs">${podcast_desc}</p>
              </a>
          </div>   
            `)

        })
    })
  }
  