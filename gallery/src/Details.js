import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Options from "./Options";
import Passepartouts from "./Passepartouts";

const Details = ( props ) => {

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();

    const setOptions = (objects, selectedDimension) => {
        const origin = window.location.origin;
        objects.forEach(( object, i) => {
            if ( object.type === 'variable' ) {
                const data = fetch(`${origin}/wp-json/photolab-app/v1/auth?task=variations&id=${object.id}`)
                .then(response => response.json())
                .then(data =>
                    data.forEach(( variation, i) => {
                        variation.attributes.forEach(( attribute, i) => {
                            if (attribute.name == 'Dimensions' && attribute.option ==  ( selectedDimension ) ) {
                                let product = { id: variation.id, name: object.name, price: variation.price }
                                console.log(product);
                            }
                        });
                    })
                );
            }
        });
    }

    useEffect(() => {
        setOptions(props.mediums, selectedDimension);
    }, [ selectedDimension ] );


    return (
      <>
          <Image image={props.image}/>
          <div className="gallery-app-info">
              <h2>{props.image.name}</h2>
              <div className="flex-start-center c-gap-20">
                  <h4 className=""></h4>
              </div>
              <div className="gallery-app-options">
                    <div className="gallery-app-option">
                        <label>Select Dimensions</label>
                        <select name="" onChange={event =>setSelectedDimension(event.target.value)}>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>

                        <label>Select Paper</label>
                        <select name="" onChange={event =>setSelectedDimension(event.target.value)}>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>

                        <label>Select Frames</label>
                        <select name="" onChange={event =>setSelectedDimension(event.target.value)}>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>

                        <label>Select Passepartouts</label>
                        <select name="" onChange={event =>setSelectedDimension(event.target.value)}>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>
                    </div>
              </div>
          </div>
      </>
  );

};
export default Details;
