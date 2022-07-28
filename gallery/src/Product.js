import { react, useState, useEffect } from '@wordpress/element';

const Product = ( props ) => {

    const setPrice = ( products, id ) => {
        if ( id == '') {
            return 0;
        } else {
            for ( let instance of products ) {
                if ( instance.id == id ) {
                    return parseInt(instance.price);
                }
            }
        }
    }

    let mediumPrice = setPrice( props.mediums, props.order.medium_id );
    let framePrice = setPrice( props.frames, props.order.frame_id );
    let passepartoutPrice = setPrice( props.passepartouts, props.order.passepartout_id );

    const total = props.order.image_price + mediumPrice + framePrice + passepartoutPrice;

    const addToCart = async () => {
        if ( props.order.image_id !== '' && props.order.medium_id !== ''
                && props.order.frame_id !== '' && props.order.passepartout_id !== '' ) {
            const data = await fetch(
                `${origin}/wp-json/photolab-app/v1/auth?task=gallery&data=${props.order}`
            ).then((data) => data.json());
        }
    };

  return (
      <div className="gallery-app-total">
          <h3>total: {total}</h3>
          <button onClick={addToCart} className="add-to-cart-button">Lägg i varukorgen </button>
      </div>
  );
};
export default Product;
