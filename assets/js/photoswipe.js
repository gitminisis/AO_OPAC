import PhotoSwipeLightbox from '../../node_modules/photoswipe/js/lightbox/lightbox';
import '../../node_modules/photoswipe/src/photoswipe.css';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  pswpModule: () => import('photoswipe')
});
lightbox.init();