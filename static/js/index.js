// ART project page: navbar burger + rows of result animations (no external dependencies).
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.navbar-burger');
  var menu = document.querySelector('.navbar-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  // Rows of animations: the layout is pure CSS; the buttons scroll a row by one item.
  document.querySelectorAll('.anim-row').forEach(function (row) {
    var track = row.querySelector('.anim-track');
    var prev = row.querySelector('.anim-prev');
    var next = row.querySelector('.anim-next');
    if (!track || !prev || !next) { return; }
    function step() {
      var item = track.querySelector('.item');
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.hidden = track.scrollLeft <= 2;
      next.hidden = track.scrollLeft >= max - 2;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

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
