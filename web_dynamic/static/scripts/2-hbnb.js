document.addEventListener('DOMContentLoaded', function () {
  let $h4 = $('div.amenities h4');

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
  });
});
