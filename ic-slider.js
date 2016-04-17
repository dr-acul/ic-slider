// move forward (images slide in left direction);
function moveForward(current, next) {
	next.css("marginLeft", "100%");
	current.queue( "fx" );

// dosen't really change much when spam clicking, maybe this is the standard behavior anyway.
	current.queue( function() {
		jQuery( current.animate( {marginLeft: "-100%"}, "slow") ).dequeue();
	} );
	
	next.queue( function() {
		jQuery( next.animate( {marginLeft: "0"}, "slow") ).dequeue();
	});
}

//move backward (images slide in right direction);
function moveBackward(current, next) {
	next.css("marginLeft", "-100%");
	current.animate( {marginLeft: "100%"}, "slow");
	next.animate( {marginLeft: "0"}, "slow");
}

function toggleActiveClasses(current, next) {
	current.toggleClass("active");
	next.toggleClass("active");
}

function animateFactory( i ) {
	return function() {
		var activeImage = jQuery( "div.ic_slider_imgdiv.active" );
		var activeButton = jQuery( "button.ic_slider_dots.active" );
		var nextImage = jQuery( "div#ic_slider_img_" + i );
		var nextButton = jQuery( "[name=ic_slider_" + i + "]" );
		// don't move when the new images is the old one
		if ( !jQuery( activeImage ).is( nextImage ) ) {
			// do we move forward ?
			if ( jQuery( activeImage ).nextAll().is( nextImage ) ) {
				moveForward(activeImage, nextImage);
			} else { // we move backward !
				moveBackward(activeImage, nextImage);
			}
			
			toggleActiveClasses(activeImage, nextImage);
			toggleActiveClasses(activeButton, nextButton);
		}
	};
}

jQuery( document ).ready(function() {	
	// set click functions for buttons.
	for (i = 0; i < 4; i++) {
		jQuery( "[name=ic_slider_" + i + "]" ).click( animateFactory( i ) );
	};
	
	// setup left/right menu fade	
	jQuery( "#ic_slider_wrapper" ).hover( function() {
		jQuery( "#ic_slider_left_nav" ).fadeIn();
		jQuery( "#ic_slider_right_nav" ).fadeIn();
	}, function() {
		jQuery( "#ic_slider_left_nav" ).fadeOut();
		jQuery( "#ic_slider_right_nav" ).fadeOut();
	} );
	
	// fade out left/right menu at startup
	jQuery( "#ic_slider_left_nav" ).fadeOut();
	jQuery( "#ic_slider_right_nav" ).fadeOut();
	
	jQuery( "#ic_slider_left_nav" ).click( function() {
		var activeImage = jQuery( "div.ic_slider_imgdiv.active" );
		var activeButton = jQuery( "button.ic_slider_dots.active" );
		// Do we hit the endge ?
		if ( activeImage.prev().length > 0 ) {
			moveBackward(activeImage, activeImage.prev() );
			toggleActiveClasses(activeImage, activeImage.prev() );
			toggleActiveClasses(activeButton, activeButton.prev() );
		} else {
			//this will select the last (next) element in the chain
			var nextImage = jQuery( "div.ic_slider_imgdiv" ).last();
			var nextButton = jQuery( "button.ic_slider_dots" ).last();
			moveBackward( activeImage, nextImage );
			toggleActiveClasses(activeImage, nextImage );
			toggleActiveClasses(activeButton, nextButton );
		}
	} );
	
	jQuery( "#ic_slider_right_nav" ).click( function() {
		var activeImage = jQuery( "div.ic_slider_imgdiv.active" );
		var activeButton = jQuery( "button.ic_slider_dots.active" );
		// Do we hit the endge ?
		if ( activeImage.next().length > 0 ) {
			moveForward(activeImage, activeImage.next() );
			toggleActiveClasses(activeImage, activeImage.next() );
			toggleActiveClasses(activeButton, activeButton.next() );
		} else {
			//this will select the first (next) element in the chain
			var nextImage = jQuery( "div.ic_slider_imgdiv" ).first();
			var nextButton = jQuery( "button.ic_slider_dots" ).first();
			moveForward( activeImage, nextImage );
			toggleActiveClasses(activeImage, nextImage );
			toggleActiveClasses(activeButton, nextButton );
		}
	} );
});