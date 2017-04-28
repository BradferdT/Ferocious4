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
//$('.incomplete').hide();
$('#itemAddBtn').click(() => {
  $('#modal1').modal('open');
});

// $.getJSON(`/main/info/${listId}/lists`, (listContent) => {
//   listContent = listContent.rows;
//   listContent.map((x) => {
//      if (x.completed) {
//        $('.mainList').append(
//       `<li class="listContent">
//         <div class="collapsible-header"><i class="material-icons">check</i>${x.item_name}</div>
//         <div class="collapsible-body">
//           <span>
//             <img src=https://cors-anywhere.herokuapp.com/${ x.thumbnail_image} alt="img"></img>
//             <h3 style="display:inline;">${x.sale_price}</h3> at <a href=${x.product_url}>WalMart</a>
//           </span>
//         </div>
//       </li>`);
//      } else {
//        $('.mainList').append(
//       `<li class="listContent incomplete">
//         <div class="collapsible-header"><i class="material-icons">schedule</i>${x.item_name}</div>
//         <div class="collapsible-body">
//           <span>
//             <img src=https://cors-anywhere.herokuapp.com/${ x.thumbnail_image} alt="img"></img>
//             <h3 style="display:inline;">${x.sale_price}</h3> at <a href=${x.product_url}>WalMart</a>
//           </span>
//         </div>
//       </li>`);
//      }
//    });
//
// });

$.getJSON(`https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=9nqubvqmveyf99yymdtaunax&query=Food/Snacks, Cookies & Chips/Fruit Cups & Fruit Sauces`, (data) => {
  $('#searchList').empty();
  data.items.map((x,y) => {
    $('#searchList').append(`
      <li>
        <div class="collapsible-header active activate">
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
          <form action="/main/content/add" method="post">
            <input type="text" name="list_id" value="${+listId}" hidden>
            <input type="text" name="walmart_id" value="${x.itemId}" hidden>
            <input type="text" name="item_name" value="${x.name}" hidden>
            <input type="text" name="category_path" value="${x.categoryPath}" hidden>
            <input type="text" name="sale_price" value="${x.salePrice}" hidden>
            <input type="text" name="description" value="${null}" hidden>
            <input type="text" name="thumbnail_image" value="${x.thumbnailImage}" hidden>
            <input type="text" name="medium_image" value="${x.mediumImage}" hidden>
            <input type="text" name="large_image" value="${x.largeImage}" hidden>
            <input type="text" name="product_url" value="${x.productUrl}" hidden>
            <input type="text" name="customer_rating" value="${x.customerRating}" hidden>
            <input type="text" name="available_online" value="${x.availableOnline}" hidden>
            <button type="submit" style="margin-right:2vh; margin-top:-3vh;" class="btn bttn"><i class="material-icons">add</i>Add to List</button>
          </form>
        </div>
      </li>`);
  });
  $('#searchList').append(`
      <li>
        <div class="collapsible-header active activate">
          <span style="text-align:initial;">
            Cant find what you're looking for? Add a custom item! Then press enter.
          </span>
          <div>
            <form action="/main/content/add" method="post">
                <input type="text" name="list_id" value="${+listId}" hidden>
                <input type="text" name="walmart_id" value="0" hidden>
                <input type="text" name="item_name" placeholder="Item Name" required>
                <input type="text" name="category_path" value="null" hidden>
                <input type="number" step="0.01" name="sale_price" placeholder="Expected Price" required><br>
                <input type="text" name="description" value="${null}" hidden>
                <input type="text" name="thumbnail_image" value="null" hidden>
                <input type="text" name="medium_image" value="null" hidden>
                <input type="text" name="large_image" value="null" hidden>
                <input type="text" name="product_url" value="#" hidden>
                <input type="text" name="customer_rating" value="null" hidden>
                <input type="text" name="available_online" value="false" hidden>
                <input type="submit" hidden>
              </form>
        </div>
      </li>`);
});

$('.activate').collapsible('open', 0);

$('#walSearch').submit(() => {
  const term = $('input[name=walmartSearch]').val();
  $.getJSON(`https://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=9nqubvqmveyf99yymdtaunax&query=${term}`, (data) => {
    $('#searchList').empty();
    if (data.items){
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
            <form action="/main/content/add" method="post">
              <input type="text" name="list_id" value="${+listId}" hidden>
              <input type="text" name="walmart_id" value="${x.itemId}" hidden>
              <input type="text" name="item_name" value="${x.name}" hidden>
              <input type="text" name="category_path" value="${x.categoryPath}" hidden>
              <input type="text" name="sale_price" value="${x.salePrice}" hidden>
              <input type="text" name="description" value="${x.description ? x.description : null}" hidden>
              <input type="text" name="thumbnail_image" value="${x.thumbnailImage}" hidden>
              <input type="text" name="medium_image" value="${x.mediumImage}" hidden>
              <input type="text" name="large_image" value="${x.largeImage}" hidden>
              <input type="text" name="product_url" value="${x.productUrl}" hidden>
              <input type="text" name="customer_rating" value="${x.customerRating}" hidden>
              <input type="text" name="available_online" value="${x.availableOnline}" hidden>
              <button type="submit" style="margin-right:2vh; margin-top:-3vh;" class="btn bttn"><i class="material-icons">add</i>Add to List</button>
            </form>
          </div>
        </li>`);
    });
  }
    $('#searchList').append(`
        <li>
          <div class="collapsible-header active activate">
            <span style="text-align:initial;">
              Cant find what you're looking for? Add a custom item! Then press enter.
            </span>
            <div>
              <form action="/main/content/add" method="post">
                  <input type="text" name="list_id" value="${+listId}" hidden>
                  <input type="text" name="walmart_id" value="0" hidden>
                  <input type="text" name="item_name" placeholder="Item Name" required>
                  <input type="text" name="category_path" value="null" hidden>
                  <input type="number" step="0.01" name="sale_price" placeholder="Expected Price" required><br>
                  <input type="text" name="description" value="${null}" hidden>
                  <input type="text" name="thumbnail_image" value="null" hidden>
                  <input type="text" name="medium_image" value="null" hidden>
                  <input type="text" name="large_image" value="null" hidden>
                  <input type="text" name="product_url" value="#" hidden>
                  <input type="text" name="customer_rating" value="null" hidden>
                  <input type="text" name="available_online" value="false" hidden>
                  <input type="submit" hidden>
                </form>
          </div>
        </li>`);
  });
  return false;
});
