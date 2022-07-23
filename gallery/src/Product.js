import { react, useState, useEffect } from '@wordpress/element';

const Product = ( props ) => {

    const total = props.order.image + props.order.frame + props.order.medium + props.order.passepartout;

    const createProduct = async () => {
        if ( props.order.image_id !== '' && props.order.medium_id !== ''
                && props.order.frame_id !== '' && props.order.passepartout_id !== '' ) {
            const data = await fetch(
                `${origin}/wp-json/photolab-app/v1/auth?task=gallery&data=${props.order}`
            ).then((data) => data.json());
            console.log(data);
        }
    };

  return (
      <div className="gallery-app-total">
          <h3>total: {total}</h3>
          <button onClick={createProduct} className="add-to-cart-button">Add to cart </button>
      </div>
  );
};
export default Product;
