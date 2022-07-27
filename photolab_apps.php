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
		'photolab-app/v1',
		'auth',
		array(
			'methods' => array( 'GET', 'POST' ),
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
    $attributes = filter_var( $_GET['attributes'] );
    $data = json_decode( $_POST['data'] );
    $file = $_FILES['file'];

    switch ( $task ) {
        case 'get-image':
            $query = $woocommerce->get( 'products/' . $id  );
            break;
        case 'upload-image':
            require_once( ABSPATH . 'wp-admin/includes/file.php' );
            $image = wp_handle_upload( $file, array( 'test_form' => false )  );
            $upload_directory = wp_upload_dir();
            if ( !file_exists( $upload_directory['basedir']  . '/gallery-app/' ) ) {
                mkdir( $upload_directory['basedir']  . '/gallery-app/', 0777, true );
            }
            $move = rename( $image['file'], $upload_directory['basedir']  . '/gallery-app/' . $file['name'] );
            $query = $upload_directory['baseurl']  . '/gallery-app/' . $file['name'];
            break;
        case 'categories':
            $query = $woocommerce->get( 'products/categories' );
            break;
        case 'options':
            $args = new WC_Product_Query( array(
                'limit' => 10,
                'orderby' => 'date',
                'order' => 'DESC',
                'category' => array( 'frames', 'passepartouts', 'print-mediums' )
            ) );
            $options = $args->get_products();
            $query = array();
            foreach ( $options as $option ) {
                $product['object'] = $option->get_data();
                $product['attributes'] = get_the_terms( $option->id, 'pa_dimensions' );
                $product['variations'] = $option->get_available_variations();
                $product['category'] = get_the_terms( $option->id, 'product_cat' );
                array_push( $query, $product );
            }
            break;
        case 'gallery':
            $image_id = filter_var( $data->image_id, FILTER_VALIDATE_INT );
            $frame_id = filter_var( $data->frame_id, FILTER_VALIDATE_INT );
            $medium_id = filter_var( $data->medium_id, FILTER_VALIDATE_INT );
            $passepartout_id = filter_var( $data->passepartout_id, FILTER_VALIDATE_INT );
            $product = [
                'name' => 'Gallery Product',
                'type' => 'grouped',
                'grouped_products' => [ $image_id, $frame_id, $medium_id, $passepartout_id  ]
            ];
            $query = $woocommerce->post( 'products', $product );
            break;
        default:
            // code...
            break;
    }

    echo json_encode($query);
    exit;

}
?>
