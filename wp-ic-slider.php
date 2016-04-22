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
	wp_enqueue_script('ic-slider-js', plugin_dir_url(__FILE__) . 'ic-slider.js', array('jquery', 'jquery-effects-shake'));
}

add_action('wp_print_scripts', 'ic_slider_enqueue_js');
?>

<?php

function start_ic_slider() { ?>
	<noscript>
	<div><p>Please Enable JavaScript to view this Site.</p></div>
	</noscript>
	<div id="ic_slider_wrapper">
		<div id="ic_slider_position_wrapper">
			<div class="ic_slider_animation_container active">
				<img src="<?php echo plugins_url('images/nature_mountain.png', __FILE__); ?>" />
<!--
				<div id="ic_slider_text_wrapper">
					<h1>the_title()</h1>
					<p>the_content()</p>
				</div><!-- #ic_slider_text_wrapper -->
			</div>
			<div class="ic_slider_animation_container">
				<img src="<?php echo plugins_url('images/nature_panorama.png', __FILE__); ?>" />
			</div>
			<div class="ic_slider_animation_container">
				<img src="<?php echo plugins_url('images/panorama_mountains_peaks.png', __FILE__); ?>" />
			</div>
			<div class="ic_slider_animation_container">
				<img src="<?php echo plugins_url('images/wonderfully_wild_faroe_isl.png', __FILE__); ?>" />
			</div>
		</div><!-- #ic_slider_img_position_wrapper -->
		<div id="ic_slider_left_nav">
			<img src="<?php echo plugins_url('images/arrow_left.png', __FILE__); ?>" />
		</div>
		<div id="ic_slider_right_nav">
			<img src="<?php echo plugins_url('images/arrow_right.png', __FILE__); ?>" />
		</div>	
		<div id="ic_slider_dots_wrapper">
			<button class="ic_slider_dots active" name="ic_slider_0"></button>
			<button class="ic_slider_dots" name="ic_slider_1"></button>
			<button class="ic_slider_dots" name="ic_slider_2"></button>
			<button class="ic_slider_dots" name="ic_slider_3"></button>
		</div><!-- #ic_slider_dots_wrapper -->
	</div><!-- #ic_slider_wrapper -->
	<?php
}