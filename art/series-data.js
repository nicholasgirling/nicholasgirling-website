/* Series manifest — update this file as real artworks are added.
   Each series maps to a section on the home page.
   Artwork slugs match their HTML filenames (without .html).       */

var SERIES_DATA = [
  {
    id: 'originals',
    title: 'Original Paintings',
    homeAnchor: '#paintings',
    artworks: [
      {
        slug: 'painting-1',
        title: 'Acrylic Painting No. 1',
        image: '../imagery/framed-painting3.jpg'
      },
      {
        slug: 'painting-2',
        title: 'Acrylic Painting No. 2',
        image: '../imagery/framed-painting1.jpg'
      },
      {
        slug: 'painting-3',
        title: 'Acrylic Painting No. 3',
        image: '../imagery/framed-painting2.jpg'
      }
    ]
  },
  {
    id: 'city-series',
    title: 'City Series',
    homeAnchor: '#city-series',
    artworks: []
  }
];
