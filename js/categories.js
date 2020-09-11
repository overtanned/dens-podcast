  function category(category_id) {

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

    LoadDataFromApi(`../data/subcategories/${category_id}.json`)
    .then(function (result) {

      var data = result.data;
      var category_name = data.category_parent_name;

      // bersihin halaman
      $('#podcast').html(`
          <h3><a href="#" class="category_back" onclick="backToHomepage()"><i class="fas fa-chevron-left"></i></a> ${category_name}</h3>
          <div id="podcast_category"></div>
      `)

      // Group Podcasts by Subcategories
      var subcategories = data.contents;
   
      // Map Each Subcategories
      $.map(subcategories, function(x, i) {

        var subcategory_id = x.category_id;
        var subcategory_name = x.category_name.toLowerCase();

        $('#podcast_category').append(`
          <hr>
          <h4 class="subcategory_title">${subcategory_name}</h4>
          <div class="podcast_subcategory_${subcategory_id}">
            <div class="owl-carousel owl-theme"></div>
          </div>
        `)

        // Map each Podcasts by Subcategories
        $.map(x.podcasts, function(y, i) {
          var podcast_id = y.id;
          var podcast_image = y.image;
          var podcast_title = y.title;
          var podcast_desc = y.description.slice(0,50);

          $( `.podcast_subcategory_${subcategory_id} .owl-carousel` ).append(`
          <div class="channel-${podcast_id}">
          <figure class="overlay imghvr-fade">
            <img src=${podcast_image} class="podcast-cover-${podcast_id}" alt="">
            <figcaption>
              <img src="images/icons/play.svg" onclick="player(\'${podcast_id}'\)" class="play-button img-responsive" alt="">
            </figcaption>
          </figure>
          <a class="info" onclick="getPlaylist(\'${category_id}'\,\'${category_name}'\,\'${podcast_id}'\)">
            <h6>${podcast_title}</h6>
            <p class="hidden-xs">${podcast_desc}</p>
            </a>
        </div>                  
          `);
        })

      })
    })
    .then(function(){ loadOwlCarousel() })
    .fail(function(){ alert('Belom ada isi contentnya ya') })
  }

  function backToHomepage() {

    // bersihin halaman
    $('#podcast').empty()
    homepage()

  }  