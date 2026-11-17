// ART project page: navbar burger + result carousels (no external dependencies).
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.navbar-burger');
  var menu = document.querySelector('.navbar-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  if (window.bulmaCarousel && document.querySelector('.carousel')) {
    var narrow = window.matchMedia('(max-width: 768px)').matches;
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: narrow ? 1 : 2,
      loop: false,
      infinite: false,
      pagination: false,
      autoplay: false
    });
  }

  // Play the result videos only while they are on screen (slides outside the view stay paused).
  var videos = document.querySelectorAll('.results-carousel video');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var p = e.target.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          e.target.pause();
        }
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { io.observe(v); });
  }
});
