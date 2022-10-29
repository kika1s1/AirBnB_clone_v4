document.addEventListener('DOMContentLoaded', function () {
  let displayObjects = {};
  let $h4 = $('div.amenities h4');

  $('input').each(function (idx, ele) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');

    // load dictionary
    displayObjects[id] = {name: name, checked: false};

    // set change method on checkboxes
    $(ele).change(function () {
      let delimiter = '<span class="delim">, </span>';
      $('h4 span.delim').remove();

      if (this.checked) {
        console.log('checked');
        displayObjects[id]['checked'] = true;
        $h4.append('<span id=' + id + '>' + name + '</span>');
      } else {
        console.log('unchecked');
        displayObjects[id]['checked'] = false;
        $('span#' + id).remove();
      }

      let length = $('h4 > span').length;
      console.log($('h4 > span').length);
      $('div.amenities h4 span').each(function (idx, ele) {
        if (idx < length - 1) {
          $(this).append(delimiter);
        }
      });
    });
  });
});
