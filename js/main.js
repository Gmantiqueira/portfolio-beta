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

$(document).scroll(function() {
  $(".logo-fill-white").each(function() {
    var sectionHeight = $(this).height();
    var sectionOffset = $(this).offset().top - 200;
    var sectionOffsetBottom = sectionOffset + sectionHeight;

    if (scroll_pos > sectionOffset && scroll_pos < sectionOffsetBottom) {
      $(".logo").addClass("white");
      $(".logo").removeClass("dark");
      $(".menu-toggle span").addClass("white");
      $(".menu-toggle span").removeClass("dark");
    }
  });

  $(".logo-fill-dark").each(function() {
    var sectionHeight = $(this).height();
    var sectionOffset = $(this).offset().top - 200;
    var sectionOffsetBottom = sectionOffset + sectionHeight;

    if (scroll_pos > sectionOffset && scroll_pos < sectionOffsetBottom) {
      $(".logo-letter").addClass("blue");
      $(".logo-letter").removeClass("white");
    }
  });
});

var $doc = $("html, body");
$(".menu a").click(function() {
  $doc.animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top - 80
    },
    400
  );
  return false;
});
