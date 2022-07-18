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
		null,
		true
	);

    wp_enqueue_style( "frontend CSS", plugins_url( "static/style.css", __FILE__ ), array(), "1.0", "all" );

}
add_action('wp_enqueue_scripts', 'enq_photolab_apps');


function register_wc_route() {
	register_rest_route(
		'photolabapp-auth/v1',
		'photolabapp',
		array(
			'methods' => 'GET',
			'callback' => 'photolab_apps_rest_cb',
            'permission_callback' => '__return_true'
		)
	);
}
add_action( 'rest_api_init', 'register_wc_route' );


require __DIR__ . '/vendor/autoload.php';
use Automattic\WooCommerce\Client;

function photolab_apps_rest_cb() {

    $woocommerce = new Client(
          get_home_url(),
          'ck_3ed122b0cb9c2b77ed3cc89f3fa5feda77c20097',
          'cs_195f5acafb97d3ce7609d48b2a74a0efc4c66bd3',
          [ 'version' => 'wc/v3',
            'wp_api' => true, ]
    );

    $task = filter_var( $_GET['task'], FILTER_SANITIZE_STRING );
    $id   = filter_var( $_GET['id'], FILTER_VALIDATE_INT );

    $query = $woocommerce->get( 'products', [ 'id' => $id ] );

    echo json_encode($query);
    exit;

}
?>
