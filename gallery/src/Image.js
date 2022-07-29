import { react, useState, useEffect } from '@wordpress/element';

const Image = ( props ) => {

  return (
      <img id="gallery-app-image" src={props.src}/>
  );
};
export default Image;
