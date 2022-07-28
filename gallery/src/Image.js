import { react, useState, useEffect } from '@wordpress/element';

const Image = ( props ) => {

    const checkImageQuality = () => {
        const image = document.getElementById('gallery-app-image');
        const pixelWidth = image.naturalWidth;
        const pixelHeight = image.naturalHeight;
        const mmWidth = props.dimension;
        const mmHeight = props.dimension;
    }

    useEffect(() => {
        if ( props.dimension !== undefined ) {
            checkImageQuality();
        }
    }, [ props.dimension ] );

  return (
      <>
         <img id="gallery-app-image" src={props.src}/>
      </>
  );
};
export default Image;
