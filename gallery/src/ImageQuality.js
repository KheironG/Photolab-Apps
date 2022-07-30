import { react, useState, useEffect } from '@wordpress/element';

const ImageQuality = ( props ) => {

    const [ dpiLevel, setDpiLevel ] = useState();

    const setImageQualityLevel = ( dpiLevel ) => {
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


    const setImageQualityText = ( dpiLevel ) => {
        let text;
        if ( dpiLevel < 5 ) { text = 'dålig kvalitet'; }
        if ( dpiLevel > 5 && dpiLevel < 10 ) { text = 'ok kvalitet'; }
        if ( dpiLevel > 10 && dpiLevel < 15 ) { text = 'bra kvalitet'; }
        if ( dpiLevel > 15 && dpiLevel < 20 ) { text = 'optimal kvalitet'; }
        return( <label>{text}</label>);
    }


    useEffect(() => {
        if ( props.dimension !== undefined ) {
            const image = document.getElementById('gallery-app-image');
            const pixelWidth = image.naturalWidth;
            const dimensions = props.dimension;
            const xSign = dimensions.search(/\D/);
            const mmWidth = dimensions.substr( 0, xSign );
            const dpiLevel = ( pixelWidth / ( mmWidth / 2.54 ) / 20  );
            setDpiLevel(dpiLevel);
        }
    }, [props.dimension] );


    return (
      <>
      { ( props.dimension !== undefined && dpiLevel !== undefined ) &&
         <div className='gallery-app-image-quality'>
            <div>
                { setImageQualityLevel(dpiLevel) }
            </div>
                { setImageQualityText(dpiLevel) }
        </div>
     }
     </>
    );

};

export default ImageQuality;
