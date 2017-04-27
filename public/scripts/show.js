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
  const term = $('input[name=walmartSearch]').val();
  $.getJSON(`https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=9nqubvqmveyf99yymdtaunax&query=${term}`, (data) => {
    $('#searchList').empty();
    data.items.map((x,y) => {
      $('#searchList').append(`
        <li>
          <div class="collapsible-header"> 
            <span style="text-align:initial;">
              ${x.name}
            </span>
            <div>
              <span>
                <img src="${x.thumbnailImage}" alt="img"></img>
                <h3 style="display:inline;">$${x.salePrice}</h3> at <a href="${x.productUrl}">WalMart</a>
              </span>
              <span style="float:right; margin-top:8vh;">
                <i class="material-icons">view_stream</i>
              </span>
            </div>
          </div>
          <div class="collapsible-body">
            <button type="" style="margin-right:2vh; margin-top:-3vh;" class="btn bttn" name="searchSubmit"><i class="material-icons">add</i>Add to List</button>
            <button type="" style="margin-right:2vh; margin-top:-3vh;" class="btn bttn" name="searchSubmit">Similar Items</button>
          </div>
        </li>`)
    });
  });
  return false;
});
