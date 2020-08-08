/**
 * App vendors
 */
module.exports = {
  'jquery': './node_modules/jquery/dist/jquery.js',
  'jquery.animate.css': './node_modules/@wahawaher/jquery-animate-css/jquery.animate.css.js',
  'lazysizes.build': [
    './node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js',
    './node_modules/lazysizes/plugins/object-fit/ls.object-fit.js',
    './node_modules/lazysizes/plugins/respimg/ls.respimg.js',
    './node_modules/lazysizes/lazysizes.js',
  ],
  'fancybox.build': [
    './node_modules/@fancyapps/fancybox/src/js/core.js',
    './node_modules/@fancyapps/fancybox/src/js/guestures.js',
    './node_modules/@fancyapps/fancybox/src/js/media.js',
  ],
  'rellax': './node_modules/rellax/rellax.js',
  'owl.carousel.build': [
    // './node_modules/owl.carousel/dist/owl.carousel.js', // full
    './node_modules/owl.carousel/src/js/owl.carousel.js',
    './node_modules/owl.carousel/src/js/owl.lazyload.js',
    './node_modules/owl.carousel/src/js/owl.autoplay.js',
    './node_modules/owl.carousel/src/js/owl.support.js',
    './node_modules/owl.carousel/src/js/owl.navigation.js',
  ],
  // 'swiper': './node_modules/swiper/js/swiper.js', // TODO: make build
  'swiper.build': './src/modules/swiper/package/swiper-bundle.min.js',
  'morecontent': './node_modules/morecontent-js/dist/jquery.morecontent.js', // TODO: include lite ver
  'gsap.build': [
    './src/modules/gsap-plugins/TweenLite.min.js',
    './src/modules/gsap-plugins/TimelineLite.min.js',
    './src/modules/gsap-plugins/MorphSVG.min.js',
    './src/modules/gsap-plugins/CustomEase.min.js',
  ],
  'aos': './node_modules/aos/dist/aos.js',
};

