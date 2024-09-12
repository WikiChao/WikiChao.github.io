window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/reverse_concat_text";
var NUM_INTERP_FRAMES = 101;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i) + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {

  const images = document.querySelectorAll('.slider-images img');
  const slider = document.getElementById('imageSlider');
  const imageName = document.getElementById('imageName');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  const imageNames = ['Speech', 'Body Tapping', 'Feet Tapping', 'Clapping'];

  function updateImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    imageName.textContent = imageNames[index];
    slider.value = index;
  }

  function handleSliderChange() {
    const index = parseInt(slider.value);
    updateImage(index);
  }

  function handlePrevClick() {
    let index = parseInt(slider.value) - 1;
    if (index < 0) index = images.length - 1;
    updateImage(index);
  }

  function handleNextClick() {
    let index = parseInt(slider.value) + 1;
    if (index >= images.length) index = 0;
    updateImage(index);
  }

  slider.addEventListener('input', handleSliderChange);
  prevButton.addEventListener('click', handlePrevClick);
  nextButton.addEventListener('click', handleNextClick);

  // Initialize the slider
  updateImage(0);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      handlePrevClick();
    } else if (e.key === 'ArrowRight') {
      handleNextClick();
    }
  });


    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
