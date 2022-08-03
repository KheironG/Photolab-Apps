import { react, useState, useEffect } from '@wordpress/element';

const ImageQuality = ( props ) => {

    const [ imageMeta, setImageMeta ] = useState();

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


    const setImageQualityText = ( imageMeta ) => {
        let text = imageMeta.width + '×' + imageMeta.height + 'pixlar / ' + Math.round( imageMeta.dpi ) + ' dpi';
        return( <label>{text}</label>);
    }


    useEffect(() => {
        if ( props.dimension !== undefined ) {
            const image = document.getElementById('gallery-app-image');
            const pixelWidth = image.naturalWidth;
            const pixelHeight = image.naturalHeight;
            const dimensions = props.dimension;
            const xSign = dimensions.search(/\D/);
            const mmWidth = dimensions.substr( 0, xSign );
            const dpi = pixelWidth / ( mmWidth / 2.54 );
            const dpiLevel = ( dpi / 20  );
            setImageMeta( { width: pixelWidth, height: pixelHeight, dpi: dpi, dpiLevel: dpiLevel } );
        }
    }, [props.dimension] );


    return (
      <>
      { ( props.dimension !== undefined && imageMeta !== undefined ) &&
         <div className='gallery-app-image-quality'>
                <label>kvalitet på utskrift</label>
            <div>
                { setImageQualityLevel(imageMeta.dpiLevel) }
            </div>
                { setImageQualityText(imageMeta) }
        </div>
     }
     </>
    );

};

export default ImageQuality;
