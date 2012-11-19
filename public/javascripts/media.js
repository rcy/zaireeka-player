var media = {
  getTrack: function(disc, track) {
    console.log(disc,track);
    return this.base + '/' + this.discs[disc] + '/' + this.tracks[track];
  },
  base: "/sound/Zaireeka",
  discs: ["Disc 1", "Disc 2", "Disc 3", "Disc 4"],
  tracks: [
    "01 Okay I'll Admit That I Really Don't Understand.mp3",
    "02 Riding to Work in the Year 2025 (Your Invisible Now).mp3",
    "03 Thirty-Five Thousand Feet of Despair.mp3",
    "04 A Machine in India.mp3",
    "05 The Train Runs Over the Camel But Is Derailed by the Gnat.mp3",
    "06 How Will We Know- (Futuristic Crashendos).mp3",
    "07 March of the Rotten Vegetables.mp3",
    "08 The Big Ol' Bug Is the New Baby Now.mp3"]
};
