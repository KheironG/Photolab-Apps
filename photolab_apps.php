<?php
/**
* Photolab Apps.
*
* @package photolab_apps
* @wordpress-plugin
*
* Plugin Name:     Photolab Apps.
* Description:     Gallery and Photobook maker
* Author:          Kheiron Gunnarsson
* Version:         1.0
*/

if ( ! defined( 'ABSPATH' ) ) exit;

function photolab_apps_gallery_app() {
    return '<div id="photolab-gallery-app"></div>';
}
add_shortcode('photolab-gallery-app', 'photolab_apps_gallery_app');

function enq_photolab_apps()
{
	wp_enqueue_script(
		'photolab-gallery-app',
		plugin_dir_url( __FILE__ ) . 'gallery//build/index.js',
		['wp-element'],
		rand(), // Change this to null for production
		true
	);

    wp_enqueue_style( "frontend CSS", plugins_url( "static/style.css", __FILE__ ), array(), "1.0", "all" );

    
}
add_action('wp_enqueue_scripts', 'enq_photolab_apps');

?>
