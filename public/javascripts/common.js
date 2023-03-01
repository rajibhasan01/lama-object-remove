let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function dateFormat(dateStr) {
  let date = new Date(dateStr);
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return day + ' ' + month + ', ' + year;
}

jQuery(function ($) {
  $('.sidebar-dropdown > a').click(function () {
    $('.sidebar-submenu').slideUp(200);
    if ($(this).parent().hasClass('active')) {
      $('.sidebar-dropdown').removeClass('active');
      $(this).parent().removeClass('active');
    } else {
      $('.sidebar-dropdown').removeClass('active');
      $(this).next('.sidebar-submenu').slideDown(200);
      $(this).parent().addClass('active');
    }
  });

  $('#close-sidebar').click(function () {
    $('.page-wrapper').removeClass('toggled');
  });
  $('#show-sidebar').click(function () {
    $('.page-wrapper').addClass('toggled');
  });

  var $window = $(window),
    $pageWarper = $('.page-wrapper');
  function resize() {
    if ($window.width() < 1000) {
      return $pageWarper.removeClass('toggled');
    }
    $pageWarper.add('toggled');
  }
  $window.resize(resize).trigger('resize');
});
