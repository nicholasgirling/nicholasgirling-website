document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('[data-artwork-gallery]');

  galleries.forEach((gallery) => {
    const mainImage = gallery.querySelector('[data-artwork-main-image]');
    const lightboxTrigger = gallery.querySelector('[data-artwork-lightbox-trigger]');
    const thumbnails = gallery.querySelectorAll('[data-artwork-thumbnail]');

    const lightbox = document.querySelector('[data-artwork-lightbox]');
    const lightboxImage = document.querySelector('[data-artwork-lightbox-image]');
    const lightboxClose = document.querySelector('[data-artwork-lightbox-close]');

    if (!mainImage || !lightboxTrigger || !lightbox || !lightboxImage || !lightboxClose) {
      return;
    }

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', () => {
        const newImage = thumbnail.getAttribute('data-large');
        const newAlt = thumbnail.getAttribute('data-alt');

        if (!newImage) {
          return;
        }

        mainImage.src = newImage;
        lightboxImage.src = newImage;

        if (newAlt) {
          mainImage.alt = newAlt;
          lightboxImage.alt = newAlt;
        }

        thumbnails.forEach((item) => item.classList.remove('is-active'));
        thumbnail.classList.add('is-active');
      });
    });

    lightboxTrigger.addEventListener('click', () => {
      lightboxImage.src = mainImage.src;
      lightboxImage.alt = mainImage.alt;

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    lightboxClose.addEventListener('click', closeArtworkLightbox);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeArtworkLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeArtworkLightbox();
      }
    });

    function closeArtworkLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
});