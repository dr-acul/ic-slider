<?php
/*
  Plugin Name: IN|creare - Slider
  Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
  Description: A collection of settings for the IN|creare packages
  Version: 0.01
  Author: the IN|creare team
  Author URI: http://www.increare.de
  License: A "Slug" license name e.g. GPL2
 */
?>

<?php

function ic_slider_register_styles() {
	wp_register_style('ic-slider-stylesheet', plugins_url('ic-slider.css', __FILE__));
	wp_enqueue_style('ic-slider-stylesheet');
}

add_action('wp_print_styles', 'ic_slider_register_styles');

function ic_slider_enqueue_js() {
	wp_enqueue_script('ic-slider-js', plugin_dir_url(__FILE__) . 'ic-slider.js', array('jquery'));
}

add_action('wp_print_scripts', 'ic_slider_enqueue_js');

function get_choices() {
	$choices = array_merge( get_posts(), get_pages() );
	$choice_options = array(
			'default' => '&mdash; Select &mdash;',
	);
	foreach ( $choices as $choice) {
		$choice_options[ $choice->ID ] = $choice->post_title;
	}
	return $choice_options;
}

function get_default_images() {
	return array (
		'01'	=> $img_path = plugin_dir_url( __FILE__) . 'images/nature_mountain.png',
		'02'	=> $img_path = plugin_dir_url( __FILE__) . 'images/nature_panorama.png',
		'03'	=> $img_path = plugin_dir_url( __FILE__) . 'images/panorama_mountains_peaks.png',
		'04'	=> $img_path = plugin_dir_url( __FILE__) . 'images/wonderfully_wild_faroe_isl.png');
}

function start_ic_slider() { ?>
	<div id="ic_slider_wrapper">
		<div id="ic_slider_position_wrapper">
			<?php
			$slider_images = get_option( 'ic_slider_settings' );
			$first_run = 'active';
			foreach ($slider_images as $key => $image ) {
				/* replace $image_path with default image if there are no sliders set up
				 *  (they will not be listet in the media library
				 */
				$image_path = '';
				/* print nothing, when nothing is selected */
				if ( !empty( $image ) ) {
					/* fall back to default, will not be listed in the media library
					 * so we have to get the option directly from thevcustomizer
					 */
					$image_path = (
							empty( wp_get_attachment_image_src($image)[0] ) )
							? $image : wp_get_attachment_image_src($image)[0]; ?>
					<div class="ic_slider_animation_container <?php echo $first_run; ?>" >
						<img src="<?php echo $image_path; ?> " />
						<div id="ic_slider_text_wrapper"><?php
							$here_post = get_post(get_option( 'ic_slider_posts' )[$key]);
							if( $here_post ) { ?>
								<h1 id="ic_slider_post_title"><?php echo $here_post->post_title; ?></h1>
								<p id="ic_slider_post_excerpt"><?php echo $here_post->post_excerpt; ?></p>
							<?php
							}
							?>
						</div><!-- #ic_slider_text_wrapper -->
					</div><!-- .ic_slider_animation_container active -->
					<?php
				} else if ($first_run == 'active') { ?>
					<p id="ic_slider_error">
						<b>Please select images and posts to display them in the slider.</b><br />
						You can find the setting in the theme customisation menu -> IN|creare - Slider
					</p>
				<?php
				}
				$first_run = '';
			}
			?>
		</div><!-- #ic_slider_position_wrapper -->
		<div id="ic_slider_left_nav">
			<img src="<?php echo plugins_url('images/arrow_left.png', __FILE__); ?>" />
		</div>
		<div id="ic_slider_right_nav">
			<img src="<?php echo plugins_url('images/arrow_right.png', __FILE__); ?>" />
		</div>	
		<div id="ic_slider_dots_wrapper">
		</div><!-- #ic_slider_dots_wrapper -->
	</div><!-- #ic_slider_wrapper -->
	<?php
}

/*
 * Register slider settings
 * 
 * TODO: rewrite with js, let the user set the number of sliders
 */
function ic_slider_register_customizer( $wp_customize ) {	
	$wp_customize->add_panel( 'ic_slider_panel', array(
		'title'			=> __( 'IN|creare - Slider', 'icslidertd'),
		'description'	=> __( 'IN|creare - Slider', 'icslidertd'),
	) );
	$wp_customize->add_section( 'ic_slider_section', array(
		'title'			=> 'Slider I',
		'panel'			=> 'ic_slider_panel',
	) );

	foreach ( get_default_images() as $key => $image) {
		$wp_customize->add_setting( 'ic_slider_settings[' . $key . ']', array(
		'type'		=> 'option',
		'default'	=> $image,
		) );
		$wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'ic_slider_settings[' . $key . ']', array(
			'label' => __( 'Select Image', 'icslidertd' ),
			'section' => 'ic_slider_section',
			'mime_type' => 'image',
		) ) );
		$wp_customize->add_setting( 'ic_slider_posts[' . $key . ']', array(
			'type'		=> 'option',
			'default'	=> 'default',
		) );
		$wp_customize->add_control( 'ic_slider_posts[' . $key . ']', array(
			'label'		=> __( 'Select slide post' ),
			'section'	=> 'ic_slider_section',
			'settings'	=> 'ic_slider_posts[' . $key . ']',
			'type'		=> 'select',
			'choices'	=> get_choices(),
		) );
	}
}

add_action( 'customize_register', 'ic_slider_register_customizer' );