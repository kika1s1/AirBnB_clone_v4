document.addEventListener('DOMContentLoaded', function () {
  let $h4 = $('div.amenities h4');

  function compare (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
    return 0;
  }

  $('input').each(function (idx, ele) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');

    // set change method on checkboxes
    $(ele).change(function () {
      let delimiter = '<span class="delim">, </span>';
      $('h4 span.delim').remove();

      if (this.checked) {
        $h4.append('<span id=' + id + '>' + name + '</span>');
      } else {
        $('span#' + id).remove();
      }

      // add delimeter
      let length = $('h4 > span').length;
      $('div.amenities h4 span').each(function (idx, ele) {
        if (idx < length - 1) {
          $(this).append(delimiter);
        }
      });
    });
  });
  $(function () {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (data) {
        let $apiStatus = $('DIV#api_status');
        if (data.status === 'OK') {
          $apiStatus.addClass('available');
        } else {
          $apiStatus.removeClass('available');
        }
      }
    });

    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      success: function (data) {
        data.sort(compare);
        $.ajax({
          type: 'GET',
          url: 'http://0.0.0.0:5001/api/v1/users/',
          success: function (users) {
            let userDict = {};
            $(users).each(function (index, user) {
              userDict[user.id] = user;
            });
            $(data).each(function (index, place) {
              $('SECTION.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + 'Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + 'Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + 'Bathroom</div></div><div class="user"><strong>Owner: </strong>' + userDict[place.user_id].first_name + ' ' + userDict[place.user_id].last_name + '</div><div class="description">' + place.description + '</div></article>');
            });
          }
        });
      }
    });
  });
});
