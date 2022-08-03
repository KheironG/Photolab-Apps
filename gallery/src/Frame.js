import { react, useEffect, useRef } from '@wordpress/element';

import Image from "./Image";
import ImageQuality from "./ImageQuality";

const Frame = ( props ) => {

    const imageCanvas        = useRef();
    const passepartoutCanvas = useRef();
    const frameCanvas        = useRef();

    const image      = document.createElement('img');
    image.src        = props.src;
    const imageRatio = useRef(image.naturalHeight / image.naturalWidth);

    const getOptionVariables = ( id, objects ) => {
        for ( let object of objects ) {
            if ( object.id == id ) {
                return object;
            }
        }
    }


    useEffect(() => {
        if ( props.dimension !== undefined ) {
            const canvasWidth                 = imageCanvas.current.parentElement.clientWidth;
            const canvasHeight                = canvasWidth * imageRatio.current;
            const imageCtx                    = imageCanvas.current.getContext('2d');
            const passepartoutCtx             = passepartoutCanvas.current.getContext('2d');
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
    }, [ props.dimension ] );


    useEffect(() => {
        if ( props.order.frame_id != 0 ) {
            const option = getOptionVariables( props.order.frame_id, props.frames );
            const objectWidth = option.inner_width.replace(/\D/g, '');
            const xSign = props.dimension.search(/\D/);
            const mmWidth = parseInt( props.dimension.substr( 0, xSign ) * 10 );
            const pxPerMM = imageCanvas.current.width / mmWidth;
            const innerWidth = option.inner_width.replace(/\D/g, '') * pxPerMM;
            console.log(innerWidth);
            const frameCtx = frameCanvas.current.getContext('2d');
            frameCtx.fillRect( 0, 0, frameCanvas.current.width, frameCanvas.current.height);
            frameCtx.clearRect( innerWidth, innerWidth, frameCanvas.current.width - innerWidth * 2 , frameCanvas.current.height - innerWidth * 2);
        }
    }, [ props.order ] );


    return (
      <div className="gallery-app-image">
            { props.dimension !== undefined
                ?
                    <>
                        <canvas ref={imageCanvas} width="0" height="0"></canvas>
                        <canvas ref={passepartoutCanvas} width="0" height="0"></canvas>
                        <canvas ref={frameCanvas} width="0" height="0"></canvas>
                    </>
                :
                    <img src={props.src} />
            }
      </div>

    );

};

export default Frame;
