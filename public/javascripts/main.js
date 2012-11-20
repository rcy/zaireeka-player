$(document).ready(function() {
  // setup selections
  // ================
  $.each(media.discs, function(i) {
    $("select.disc").append("<option value="+i+">"+this+"</option>");
  });
  $.each(media.tracks, function(i) {
    $("select.track").append("<option value="+i+">"+this+"</option>");
  });

  // enable all controls except stop, not currently playing
  function enableControls() {
    $("button.play").attr('disabled', false);
    $("select").attr('disabled', false);
    $("button.stop").attr('disabled', true);
  }
  // disable all controls except stop, currently playing
  function disableControls() {
    $("button.play").attr('disabled', true);
    $("select").attr('disabled', true);
    $("button.stop").attr('disabled', false);
  }

  // setup player
  // ============
  $("#player").jPlayer({
    swfPath: "/javascripts/vendor",
    ready: function(e) {
      $(this).bind($.jPlayer.event.canplay, function(event) {
        enableControls();
      });
      $(this).bind($.jPlayer.event.play, function(event) {
        disableControls();
        return false;
      });
      $(this).bind($.jPlayer.event.pause, function(event) {
        enableControls();
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
