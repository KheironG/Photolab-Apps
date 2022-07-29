import { react, useState } from '@wordpress/element';

const ImageQuality = ( props ) => {

    const dimensions = props.dimension;
    const [ imageQualityText, setImageQualityText ] = useState();

    const setImageQualityLevel = () => {
        const image = document.getElementById('gallery-app-image');
        const pixelWidth = image.naturalWidth;
        const dimensions = props.dimension;
        const xSign = dimensions.search(/\D/);
        const mmWidth = dimensions.substr( 0, xSign );
        const dpiLevel = ( pixelWidth / ( mmWidth / 2.54 ) / 20  ) ;
        var dpiLevels = [];
        for (var i = 0; i < 20; i++) {
            if ( i < dpiLevel ) {
                dpiLevels.push(<span></span>);
            } else {
                dpiLevels.push(<span className="inactive"></span>);
            }
        }
        return dpiLevels;
    }

    // let text =
    // if ( dpiLevel < 5 ) {
    //     setImageQualityText('dålig kvalitet');
    // }
    // if ( dpiLevel > 5 && dpiLevel < 10 ) {
    //     setImageQualityText('ok kvalitet');
    // }
    // if ( dpiLevel > 10 && dpiLevel < 15 ) {
    //     setImageQualityText('bra kvalitet');
    // }
    // if ( dpiLevel > 15 && dpiLevel < 20 ) {
    //     setImageQualityText('optimal kvalitet');
    // }

  return (
     <div className='gallery-app-image-quality'>
        {dimensions !== undefined &&
            <>
            <div>
                { setImageQualityLevel() }
            </div>
            <label>{imageQualityText}</label>
            </>
        }
     </div>
  );
};

export default ImageQuality;
