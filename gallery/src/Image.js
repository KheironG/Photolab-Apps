import { react, useState, useEffect } from '@wordpress/element';

const Image = ( props ) => {

  return (
      <>
      <div className="gallery-app-image">
          <img src={props.image.src}/>
      </div>
      </>
  );
};
export default Image;
