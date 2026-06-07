# Nicholas Girling — Artist Website

Personal artist website for Nicholas Girling. Original paintings and limited edition prints. Paintspace · Printspace · Melbourne, Australia.

## Structure

```
/
├── index.html                        # Home page — gallery, city series, commissions, contact
├── about.html                        # About Nicholas Girling
├── style.css                         # Global styles
├── app.js                            # Site-wide JS (nav, scroll, animations)
├── sitemap.xml
├── art/
│   ├── painting-1.html               # The Rumbling
│   ├── painting-2.html               # Acrylic Painting No. 2
│   ├── painting-3.html               # Acrylic Painting No. 3
│   ├── the-hills-are-alive.html      # The Hills are Alive
│   ├── painting-7.html               # Painting No. 7
│   ├── bright-and-early.html         # Bright & Early
│   ├── pony-ride.html                # Pony Ride
│   ├── safe-landing.html             # Safe Landing
│   ├── guacamole.html                # Guacamole
│   ├── little-river-blue-art-print.html  # River Series Study
│   ├── series-data.js                # Artwork manifest — drives prev/next navigation
│   ├── artwork.js                    # Series subnav and footer nav rendering
│   └── artwork-gallery.js            # Image gallery — thumbnail switching and lightbox
└── imagery/                          # All artwork and site images
```

## Adding a new artwork

1. Add the image to `imagery/`.
2. Create a new page in `art/` modelled on an existing page (e.g. `bright-and-early.html`). Set `window.ARTWORK_SLUG` to match the filename without `.html`.
3. Add the artwork to `series-data.js` in the correct position.
4. Add a card to the relevant section in `index.html`.
5. Update `sitemap.xml` with the new URL and today's date.

## Deployment

Deployed via GitHub Pages from the `main` branch root.
