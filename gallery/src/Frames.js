import { react, useState, useEffect } from '@wordpress/element';

const Frames = ( origin, dimensions ) => {
    console.log(dimensions);
    const [ frames , setFrames ] = useState({});

    // const getFrames = async () => {
    //     const response = await fetch(
    //         `${origin}/wp-json/photolab-app/v1/auth?task=image&id=`
    //     ).then((response) => response.json());
    //         setImage( { name: response.name, src: response.images[0].src } );
    //         console.log(response);
    // };

    // useEffect(() => {
    //     getFrames();
    // }, [] );


  return (
      <div>
          <select name="">
          </select>
      </div>
  );
};
export default Frames;
