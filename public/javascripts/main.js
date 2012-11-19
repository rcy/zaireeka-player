$(document).ready(function() {
  // setup player
  // ============
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
    var current = $.jPlayer.convertTime(event.jPlayer.status.currentTime);
    var duration = $.jPlayer.convertTime(event.jPlayer.status.duration);
    $("#progress").text(current+'/'+duration);
    return false;
  });

  $("button.play").click(function() {
    socket.emit('play');
  });
  $("button.stop").click(function() {
    socket.emit('stop');
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

  // socket connection
  // =================
  socket = io.connect()
  socket.on('play', play);
  socket.on('stop', stop);

})
