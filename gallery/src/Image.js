import { react, useState, useEffect } from '@wordpress/element';

const Image = ( props ) => {

    const dimensions = props.dimension;

    const setImageQuality = () => {
        const image = document.getElementById('gallery-app-image');
        const pixelWidth = image.naturalWidth;
        const pixelHeight = image.naturalHeight;
        const dimensions = props.dimension;
        const xSign = dimensions.search(/\D/);
        const mmWidth = dimensions.substr( 0, xSign );
        const mmHeight = dimensions.substr( xSign + 1, dimensions.length -1 );
        const dpiLevel = ( pixelWidth / ( mmWidth / 2.54 ) / 20  ) ;
        var levels = [];
        for (var i = 0; i < 20; i++) {
            if ( i < dpiLevel ) {
                levels.push(<span></span>);
            } else {
                levels.push(<span className="inactive"></span>);
            }
        }
        return levels;
    }


  return (
      <>
         <img id="gallery-app-image" src={props.src}/>
         <div className='gallery-app-dpi-level'>
            {dimensions !== undefined && setImageQuality()}
         </div>
      </>
  );
};
export default Image;
