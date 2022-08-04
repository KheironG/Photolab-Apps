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
        const dimensions = props.dimension;
        const xSign = dimensions.search(/\D/);
        const mmWidth = dimensions.substr( 0, xSign );
        const dpi = props.width / ( mmWidth / 2.54 );
        const dpiLevel = ( dpi / 20  );
        setImageMeta( { width: props.width, height: props.height, dpi: dpi, dpiLevel: dpiLevel } );
    }, [props.dimension] );


    return (
      <>
      { imageMeta !== undefined &&
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
