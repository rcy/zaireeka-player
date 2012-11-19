$(document).ready(function() {
  $("#player").jPlayer({
    swfPath: "/javascripts/vendor",
    ready: function() {
      console.log('ready this:', $(this));
      // $(this).jPlayer("setMedia", {
      //   mp3: "/sound/Zaireeka/Disc 3/01 Okay I'll Admit That I Really Don't Understand.mp3" 
      // })//.jPlayer("play");
    },
    //    supplied: "mp3"
  })

  $("#player").bind($.jPlayer.event.play, function(event) {
    console.log('play', event);
    return false;
  });
  $("#player").bind($.jPlayer.event.loadstart, function(event) {
    console.log('loadstart', event);
    return false;
  });
  $("#player").bind($.jPlayer.event.progress, function(event) {
    console.log('progress', event);
    return false;
  });
  $("#player").bind($.jPlayer.event.timeupdate, function(event) {
    $("#progress").html($.jPlayer.convertTime(event.jPlayer.status.currentTime));
    return false;
  });

  $("button.play").click(function() {
    play();
  });
  $("button.stop").click(function() {
    stop();
  });

  $("select.disc").change(function() {
    var disc = $(this).context.value;
    var file = media.getTrack(disc, 0);
    $("#player").jPlayer("setMedia", {
      mp3: file
    })
  })

  function play() {
    $("#player").jPlayer("play");
  }
  function stop() {
    $("#player").jPlayer("stop");
  }
})
