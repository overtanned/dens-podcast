// if a Category is Clicked
function category(category_id, category_title) {

    // bersihin halaman
    $('#podcast').html(`
        <h3><a href="#" class="category_back" onclick="backToHomepage()"><i class="fas fa-chevron-left"></i></a> ${category_title}</h3>
        <div id="podcast_category"></div>
    `)

    getCategory(category_id)
  }

  function getCategory(category_id) {
    LoadDataFromApi('../data/podcasts.json')
    .then(function (data) {

      // Filter Podcasts by Category
      var category = data.filter(x => x.category_id === category_id)

      // Group Podcasts by Subcategories
      var subcategories = _.groupBy(category, function(d){return d.podcast_subcategory});

      // Map Each Subcategories
      $.map(subcategories, function(y, i) {

        var subcategory = i.toLowerCase()

        $('#podcast_category').append(`
          <hr>
          <h4 class="subcategory_title">${subcategory}</h4>
          <div class="podcast_subcategory_${subcategory}">
            <div class="owl-carousel owl-theme"></div>
          </div>
        `)

        // Map each Podcasts by Subcategories
        $.map(y, function(x, i) {
          var podcast_id = x.podcast_id;
          var podcast_image = x.podcast_image;
          var podcast_title = x.podcast_title;
          var podcast_desc = x.podcast_description.slice(0,50);

          $( `.podcast_subcategory_${subcategory} .owl-carousel` ).append(`
          <div class="channel-${podcast_id}">
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
        })

      })
    })

    .then(function(){ loadOwlCarousel() })

  }

  function backToHomepage() {
    location.reload(true);
  }  