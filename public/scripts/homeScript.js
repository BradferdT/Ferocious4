

$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: () => {

      } // Callback for Modal close
    }
  );

$('.addIt').click(() => {
  $('#modal1').modal('open');
});

$('#unfin').click(() => {
  $('.false').show();
  $('.true').hide();
});

$('#fin').click(() => {
  $('.true').show();
  $('.false').hide();
});

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};

let dayParse = (aDate) => {
  return (aDate.getYear() + 1900) + '-' + (aDate.getMonth() + 1).pad(2) + '-' + aDate.getDate().
pad(2);
}
