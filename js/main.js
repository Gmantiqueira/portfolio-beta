$("#menu-toggle").click(function() {
  $(".menu").toggleClass("toggle");
  $(this).toggleClass("close");
  $("span").toggleClass("close");
});

$(".menu a").click(function() {
  if ($(window).width() < 992) {
    $(".menu").toggleClass("toggle");
    $("#menu-toggle").toggleClass("close");
    $("span").toggleClass("close");
  }
});

var $doc = $("html, body");
$(".menu a").click(function() {
  $doc.animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top - 128
    },
    400
  );
  return false;
});
