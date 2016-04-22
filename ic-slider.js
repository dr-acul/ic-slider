// move forward (images slide in left direction);
function moveForward(current, next) {
	next.css("marginLeft", "100%");
	current.animate({marginLeft: "-100%"}, "fast");
	next.animate({marginLeft: "0"}, "fast");
}

//move backward (images slide in right direction);
function moveBackward(current, next) {
	next.css("marginLeft", "-100%");
	current.animate({marginLeft: "100%"}, "slow");
	next.animate({marginLeft: "0"}, "slow");
}

function toggleActiveClasses(current, next) {
	current.toggleClass("active");
	next.toggleClass("active");
}

function animateFactory(i) {
	return function () {
		var activeImage = jQuery(".ic_slider_animation_container.active");
		var activeButton = jQuery("button.ic_slider_dots.active");
		var nextImage = jQuery(".ic_slider_animation_container:eq(" + i + ")");
		var nextButton = jQuery("[name=ic_slider_" + i + "]");
		// don't move when the new images is the old one
		if (!jQuery(activeImage).is(nextImage)) {
			// do we move forward ?
			if (jQuery(activeImage).nextAll().is(nextImage)) {
				moveForward(activeImage, nextImage);
			} else { // we move backward !
				moveBackward(activeImage, nextImage);
			}

			toggleActiveClasses(activeImage, nextImage);
			toggleActiveClasses(activeButton, nextButton);
		}
	};
}

jQuery(document).ready(function () {
	// set click functions for buttons.
	for (i = 0; i < 4; i++) {
		jQuery("[name=ic_slider_" + i + "]").click(animateFactory(i));
	}
	;

	// setup left/right menu fade	
	jQuery("#ic_slider_wrapper").hover(function () {
		jQuery("#ic_slider_left_nav").fadeIn();
		jQuery("#ic_slider_right_nav").fadeIn();
	}, function () {
		jQuery("#ic_slider_left_nav").fadeOut();
		jQuery("#ic_slider_right_nav").fadeOut();
	});

	// fade out left/right menu at startup
	jQuery("#ic_slider_left_nav").fadeOut();
	jQuery("#ic_slider_right_nav").fadeOut();

/* TODO: remove image bound slider */
	jQuery("#ic_slider_left_nav").click(function () {
		var activeImage = jQuery(".ic_slider_animation_container.active");
		var activeButton = jQuery("button.ic_slider_dots.active");
		
		// Do we hit the endge ?
		if (activeImage.prev().length > 0) {
			moveBackward(activeImage, activeImage.prev());
			toggleActiveClasses(activeImage, activeImage.prev());
			toggleActiveClasses(activeButton, activeButton.prev());
		} else {
			//this will select the last (next) element in the chain
			var nextImage = jQuery(".ic_slider_animation_container").last();
			var nextButton = jQuery("button.ic_slider_dots").last();
			moveBackward(activeImage, nextImage);
			toggleActiveClasses(activeImage, nextImage);
			toggleActiveClasses(activeButton, nextButton);
		}
	});

	jQuery("#ic_slider_right_nav").click(function () {
		var activeImage = jQuery(".ic_slider_animation_container.active");
		var activeButton = jQuery("button.ic_slider_dots.active");
		
		var activeContainer = jQuery(".ic_slider_animation_container.active");
		// Do we hit the endge ?
		if (activeImage.next().length > 0) {
			moveForward(activeImage , activeImage.next());
			toggleActiveClasses(activeImage, activeImage.next());
			toggleActiveClasses(activeButton, activeButton.next());
		} else {
			//this will select the first (next) element in the chain
			var nextImage = jQuery(".ic_slider_animation_container").first();
			var nextButton = jQuery("button.ic_slider_dots").first();
			moveForward(activeImage, nextImage);
			toggleActiveClasses(activeImage, nextImage);
			toggleActiveClasses(activeButton, nextButton);
		}
	});
});

function hideEffect(effect_container, direction) {
	
}

function showEffect(effect_container, direction) {

}