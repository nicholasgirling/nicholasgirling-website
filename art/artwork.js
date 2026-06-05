(function () {
  var slug = window.ARTWORK_SLUG;
  if (!slug || !window.SERIES_DATA) return;

  var currentSeries = null;
  var currentIndex  = -1;

  for (var i = 0; i < SERIES_DATA.length; i++) {
    var s = SERIES_DATA[i];
    for (var j = 0; j < s.artworks.length; j++) {
      if (s.artworks[j].slug === slug) {
        currentSeries = s;
        currentIndex  = j;
        break;
      }
    }
    if (currentSeries) break;
  }

  if (!currentSeries) return;

  var artworks    = currentSeries.artworks;
  var prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  var nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;
  var otherSeries = SERIES_DATA.filter(function (s) {
    return s.id !== currentSeries.id && s.artworks.length > 0;
  });

  // ── Subnav ─────────────────────────────────────────────────────────────────
  var subnavEl = document.getElementById('artwork-subnav');
  if (subnavEl) {
    var h = '';
    h += '<div class="artwork-subnav-inner container">';

    h += '<a href="../index.html' + currentSeries.homeAnchor + '" class="subnav-back">';
    h += '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
    h += ' ' + currentSeries.title + '</a>';

    h += '<div class="subnav-arrows">';
    if (prevArtwork) {
      h += '<a href="' + prevArtwork.slug + '.html" class="subnav-arrow" title="' + prevArtwork.title + '">';
      h += '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
      h += '<span class="subnav-arrow-label">Prev</span></a>';
    } else {
      h += '<span class="subnav-arrow subnav-arrow--disabled">';
      h += '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
      h += '<span class="subnav-arrow-label">Prev</span></span>';
    }

    h += '<span class="subnav-position">' + (currentIndex + 1) + ' / ' + artworks.length + '</span>';

    if (nextArtwork) {
      h += '<a href="' + nextArtwork.slug + '.html" class="subnav-arrow subnav-arrow--next" title="' + nextArtwork.title + '">';
      h += '<span class="subnav-arrow-label">Next</span>';
      h += '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></a>';
    } else {
      h += '<span class="subnav-arrow subnav-arrow--next subnav-arrow--disabled">';
      h += '<span class="subnav-arrow-label">Next</span>';
      h += '<svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></span>';
    }

    h += '</div></div>';
    subnavEl.innerHTML = h;
  }

  // ── Series footer ───────────────────────────────────────────────────────────
  var footerEl = document.getElementById('series-nav-footer');
  if (footerEl) {
    var f = '';
    f += '<div class="series-nav-inner container">';
    f += '<div class="series-nav-track">';

    if (prevArtwork) {
      f += '<a href="' + prevArtwork.slug + '.html" class="series-nav-item series-nav-item--prev">';
      f += '<span class="series-nav-dir">← Previous</span>';
      f += '<span class="series-nav-name">' + prevArtwork.title + '</span>';
      f += '</a>';
    } else {
      f += '<span class="series-nav-item series-nav-item--empty"></span>';
    }

    f += '<div class="series-nav-mid">';
    f += '<span class="series-nav-counter">' + (currentIndex + 1) + ' of ' + artworks.length + '</span>';
    f += '<span class="series-nav-series-name">' + currentSeries.title + '</span>';
    f += '</div>';

    if (nextArtwork) {
      f += '<a href="' + nextArtwork.slug + '.html" class="series-nav-item series-nav-item--next">';
      f += '<span class="series-nav-dir">Next →</span>';
      f += '<span class="series-nav-name">' + nextArtwork.title + '</span>';
      f += '</a>';
    } else {
      f += '<span class="series-nav-item series-nav-item--empty"></span>';
    }

    f += '</div>';

    if (otherSeries.length > 0) {
      f += '<div class="series-other">';
      f += '<span class="series-other-label">Other collections</span>';
      f += '<div class="series-other-links">';
      otherSeries.forEach(function (s) {
        f += '<a href="../index.html' + s.homeAnchor + '" class="series-other-link">' + s.title + '</a>';
      });
      f += '</div></div>';
    }

    f += '</div>';
    footerEl.innerHTML = f;
  }

  // ── Accordion smooth open/close ─────────────────────────────────────────────
  document.querySelectorAll('.accordion').forEach(function (details) {
    var summary = details.querySelector('summary');
    var body    = details.querySelector('.accordion-body');
    if (!summary || !body) return;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (details.open) {
        body.style.maxHeight = body.scrollHeight + 'px';
        requestAnimationFrame(function () {
          body.style.maxHeight = '0';
        });
        body.addEventListener('transitionend', function onEnd() {
          details.removeAttribute('open');
          body.style.maxHeight = '';
          body.removeEventListener('transitionend', onEnd);
        });
      } else {
        details.setAttribute('open', '');
        body.style.maxHeight = '0';
        requestAnimationFrame(function () {
          body.style.maxHeight = body.scrollHeight + 'px';
        });
        body.addEventListener('transitionend', function onEnd() {
          body.style.maxHeight = '';
          body.removeEventListener('transitionend', onEnd);
        });
      }
    });
  });

})();
