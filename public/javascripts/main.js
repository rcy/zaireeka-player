$(document).ready(function() {
  // setup selections
  // ================
  $.each(media.discs, function(i) {
    $("select.disc").append("<option value="+i+">"+this+"</option>");
  });
  $.each(media.tracks, function(i) {
    $("select.track").append("<option value="+i+">"+this+"</option>");
  });

  // setup player
  // ============
  $("#player").jPlayer({
    swfPath: "/javascripts/vendor",
    ready: function(e) {
      $(this).bind($.jPlayer.event.canplay, function(event) {
        $("button.play").attr('disabled', false);
        $("button.stop").attr('disabled', true);
      });
      $(this).bind($.jPlayer.event.play, function(event) {
        $("button.play").attr('disabled', true);
        $("button.stop").attr('disabled', false);
        return false;
      });
      $(this).bind($.jPlayer.event.pause, function(event) {
        $("button.play").attr('disabled', false);
        $("button.stop").attr('disabled', true);
        return false;
      });
      $(this).bind($.jPlayer.event.timeupdate, function(event) {
        var elapsed = $.jPlayer.convertTime(event.jPlayer.status.currentTime)
        $("#progress .elapsed").text(elapsed);
        return false;
      });
      $(this).bind($.jPlayer.event.progress, function(event) {
        return false;
      });
      $(this).bind($.jPlayer.event.loadeddata, function(event) {
        console.log('loadeddata', event.jPlayer.status);
        return false;
      });
      $(this).bind($.jPlayer.event.durationchange, function(event) {
        var duration = $.jPlayer.convertTime(event.jPlayer.status.duration)
        console.log('durationchange', duration);
        $("#progress .duration").text(duration);
        return false;
      });

      setMedia();
    }
  });

  // ui events
  // =========
  $("button.play").click(function() {
    socket.emit('play');
  });
  $("button.stop").click(function() {
    socket.emit('stop');
  });

  $("select.disc").change(function() {
    setMedia();
  })
  $("select.track").change(function() {
    console.log('broadcasting select',$(this).val());
    socket.emit('track', $(this).val());
  })

  function setMedia() {
    var disc = $("select.disc").val();
    var track = $("select.track").val();
    var file = media.getTrack(disc, track);
    console.log('setmedia', file);
    $("#player").jPlayer("setMedia", { mp3: file })
  }

  // socket connection
  // =================
  socket = io.connect()
  socket.on('play', function() { $("#player").jPlayer("play") });
  socket.on('stop', function() { $("#player").jPlayer("stop") });
  socket.on('track', function(n) { 
    $("select.track").val(n);
    setMedia();
  });
})
