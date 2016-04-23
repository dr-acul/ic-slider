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

/*
 * 			<button class="ic_slider_dots active" name="ic_slider_0"></button>
			<button class="ic_slider_dots" name="ic_slider_1"></button>
			<button class="ic_slider_dots" name="ic_slider_2"></button>
			<button class="ic_slider_dots" name="ic_slider_3"></button>
 * 
 * @param {type} param
 */

jQuery(document).ready(function () {
	// set click functions for buttons.
	var sliders = jQuery( ".ic_slider_animation_container" );
	var buttons = jQuery( "#ic_slider_dots_wrapper" );
	var first_run = 'active';
	console.log( sliders.length);
	for (i = 0; i < sliders.length; i++) {
		buttons.append( '<button class="ic_slider_dots ' + first_run + '" name="ic_slider_' + i + '" />' );
		jQuery("[name=ic_slider_" + i + "]").click(animateFactory(i));
		first_run = '';
	};

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