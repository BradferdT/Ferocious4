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

$('#itemAddBtn').click(() => {
  $('#modal1').modal('open');
});

$('#walSearch').submit(() => {
  $.getJSON(`https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=9nqubvqmveyf99yymdtaunax&query=apples`, (data) => {
    data.items.map((x,y) => {
      $('#searchList').append(`
        <li>
          <div class="collapsible-header">
            ${JSON.stringify(x)}
          </div>
        </li>`)
    });
  });
  return false;
});
