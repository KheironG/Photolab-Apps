import { react, useEffect, useRef } from '@wordpress/element';


const Image = ( props ) => {

    const canvas = useRef();
    const image = document.createElement('img');
    image.src = props.src;
    const imageRatio = useRef(image.naturalHeight / image.naturalWidth);

    useEffect(() => {
        if ( props.dimension !== undefined ) {
            const ctx = canvas.current.getContext('2d');
            const imageWidth = canvas.current.parentElement.clientWidth;
            const imageHeight = imageWidth * imageRatio.current;
            canvas.current.width = imageWidth;
            canvas.current.height = imageHeight;
            image.onload = function() {
                ctx.drawImage( image, 0, 0, imageWidth, imageHeight );
            }
        }
    }, [ props.dimension ] );

      return (
          <div className="gallery-app-image">
                { props.dimension !== undefined ? <canvas ref={canvas} id="gallery-frame-canvas"></canvas> : <img src={props.src} />  }
          </div>
      );

};

export default Image;
