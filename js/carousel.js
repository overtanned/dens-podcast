// owlCarousel
function loadOwlCarousel() {
  $('.owl-carousel').owlCarousel({
    loop:false,
    margin:20,
    nav:true,
    navText : ['<i class="icon ion-ios-arrow-left"></i>','<i class="icon ion-ios-arrow-right"></i>'],
    dots: false,
    padding: 20,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
  })
}