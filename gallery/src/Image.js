import { react, useState, useEffect } from '@wordpress/element';

const Image = () => {


  return (
      <div className="photolab-single-product">
          <div className="single-product-images">
              <img src={image.src}/>
          </div>
          <div className="single-product-info">
              <h2>{image.name}</h2>
              <div className="flex-start-center c-gap-20">
                  <h4 className=""></h4>
              </div>
              <Frames origin={origin} dimensions={dimensions} />
          </div>
      </div>
  );
};
export default Image;
