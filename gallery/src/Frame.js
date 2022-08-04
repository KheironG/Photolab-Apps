import { react, useEffect, useRef } from '@wordpress/element';

import goldGradient from '../../assets/images/gradient-gold.png';
import silverGradient from '../../assets/images/gradient-silver.png';

import ImageQuality from "./ImageQuality";

const Frame = ( props ) => {

    const imageCanvas        = useRef();
    const passepartoutCanvas = useRef();
    const frameCanvas        = useRef();
    const image      = document.createElement('img');
    image.src        = props.src;
    const dimensions = props.dimension;
    const imageRatio = image.naturalHeight / image.naturalWidth;

    const getOptionVariables = ( id, objects ) => {
        for ( let object of objects ) {
            if ( object.id == id ) {
                return object;
            }
        }
    }


    useEffect(() => {
        if ( dimensions !== undefined ) {
            const canvasWidth                 = imageCanvas.current.parentElement.clientWidth;
            const canvasHeight                = canvasWidth * imageRatio;
            const imageCtx                    = imageCanvas.current.getContext('2d');
            imageCanvas.current.width         = canvasWidth;
            imageCanvas.current.height        = canvasHeight;
            passepartoutCanvas.current.width  = canvasWidth;
            passepartoutCanvas.current.height = canvasHeight;
            frameCanvas.current.width         = canvasWidth;
            frameCanvas.current.height        = canvasHeight;
            image.onload = function() {
                imageCtx.drawImage( image, 0, 0, canvasWidth, canvasHeight );
            }
        }
    }, [ dimensions ] );


    useEffect(() => {
        if ( props.order.passepartout_id != 0 ) {
            const option = getOptionVariables( props.order.passepartout_id, props.passepartouts );
            const xSign = dimensions.search(/\D/);
            const mmWidth = parseInt( dimensions.substr( 0, xSign ) * 10 );
            const pxPerMM = imageCanvas.current.width / mmWidth;
            const innerWidth = option.inner_width.replace(/\D/g, '') * pxPerMM;
            const passepartoutCtx = passepartoutCanvas.current.getContext('2d');
            passepartoutCtx.clearRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height);
            passepartoutCtx.lineWidth=innerWidth;
            passepartoutCtx.shadowColor = "grey";
            passepartoutCtx.shadowBlur = 6;
            passepartoutCtx.shadowOffsetX = 0;
            passepartoutCtx.shadowOffsetY = 0;
            passepartoutCtx.strokeStyle = option.colour;
            passepartoutCtx.strokeRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height);
        }
    }, [ props.order ] );


    useEffect(() => {
        if ( props.order.frame_id != 0 ) {
            const option = getOptionVariables( props.order.frame_id, props.frames );
            const xSign = dimensions.search(/\D/);
            const mmWidth = parseInt( dimensions.substr( 0, xSign ) * 10 );
            const pxPerMM = imageCanvas.current.width / mmWidth;
            const innerWidth = option.inner_width.replace(/\D/g, '') * pxPerMM;
            const frameCtx = frameCanvas.current.getContext('2d');
            frameCtx.clearRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height );
            frameCtx.lineWidth=innerWidth;
            frameCtx.shadowColor = "grey";
            frameCtx.shadowBlur = 8;
            frameCtx.shadowOffsetX = 0;
            frameCtx.shadowOffsetY = 0;
            if (option.colour === 'silver' || option.colour === 'gold' ) {
                const background = document.createElement('img');
                background.src = option.colour === 'silver' ? silverGradient : goldGradient;
                background.onload = function() {
                      let pattern = frameCtx.createPattern( background, 'repeat');
                      frameCtx.strokeStyle = pattern;
                      frameCtx.strokeRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height);
                  };
            } else {
                frameCtx.strokeStyle = option.colour;
                frameCtx.strokeRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height);
            }
        }
    }, [ props.order ] );


    return (
          <div className="gallery-app-image">
                { dimensions !== undefined
                    ?
                        <>
                            <canvas ref={imageCanvas} width="0" height="0"></canvas>
                            <canvas ref={passepartoutCanvas} width="0" height="0"></canvas>
                            <canvas ref={frameCanvas} width="0" height="0"></canvas>
                        </>
                    :
                        <img src={props.src} />
                }
                { dimensions !== undefined
                    &&
                    <ImageQuality width={image.naturalWidth} height={image.naturalHeight} dimension={dimensions} />
                }
          </div>
    );

};

export default Frame;
