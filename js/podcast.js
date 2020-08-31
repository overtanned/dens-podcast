$( document ).ready(function() {
  
  // Open Playlist
  $('#podcast .overlay').click(function() {
    alert( "Overlay di click" );
  });
  
  // Open Player
  $('#podcast .play-button').click(function(e) {
    e.stopPropagation();
    alert( "Play button di click" );        
  });
  
  
});