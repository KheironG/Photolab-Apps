import { react, useState, useEffect } from '@wordpress/element';

const Image = ( props ) => {

  return (
      <>
         <img src={props.image.src}/>
      </>
  );
};
export default Image;
