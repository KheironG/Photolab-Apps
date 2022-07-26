import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Options from "./Options";
import Product from "./Product";

const Details = ( props ) => {

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ loaded, setLoaded ] = useState(false);
    const [ order, setOrder ] = useState( {
        dimension: selectedDimension,
        image_id: props.image.id,
        image_price: parseInt(props.image.price),
        frame_id: '',
        medium_id: '',
        passepartout_id: ''
    });

    const setVariations = async (type, objects, selectedDimension) => {

        for ( let variation of objects ) {
            for ( let attribute of variation.attributes ) {
                if (attribute.name == 'Dimensions' && attribute.option ==  ( selectedDimension ) ) {
                    options.push({ id: variation.id, name: object.name, price: variation.price });
                }
            }
        }

        if ( options.length !== 0 ) {
            if ( type === 'mediums' ) {
                setAvailableMediums(options);
            } else if ( type === 'frames' ) {
                setAvailableFrames(options);
            } else if ( type === 'passepartouts' ) {
                setAvailablePassepartouts(options);
            }
        }

    }

    const setDimension = ( dimension ) => {
        setSelectedDimension(dimension);
        setOrder(prevState => ({...prevState, dimension: dimension }))
    }
    const setMediums = ( objects, selectedDimension ) => {
        setAvailableMediums(dimension);
    }
    const setFrames = ( objects, selectedDimension ) => {
        setAvailableFrames(dimension);
    }
    const setPassepartouts = ( objects, selectedDimension ) => {
        setAvailablePassepartouts(dimension);
    }

    useEffect(() => {
        if ( selectedDimension !== undefined ) {
            setAvailableMediums(props.mediums);
            setAvailableFrames(props.frames);
            setAvailablePassepartouts(props.passepartouts);
        }
    }, [ selectedDimension ] );

    useEffect(() => {
        if ( availableMediums !== undefined && availableFrames !== undefined && availablePassepartouts !== undefined  ) {
            setLoaded(true);
            console.log(availableFrames);
        }
    }, [ availableMediums, availableFrames, availablePassepartouts ] );


    return (
      <>
          <Image image={props.image}/>
          <div className="gallery-app-info">
              <h2>{props.image.name}</h2>
              <div className="flex-start-center c-gap-20">
                  <h4 class></h4>
              </div>
              <div className="gallery-app-options">
                    <div className="gallery-app-option">
                        <label>Select Dimensions</label>
                        <select onChange={event => setDimension(event.target.value)}>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>
                    </div>
                    { loaded == true ?
                        <>
                        <div className="gallery-app-option">
                            <label>Select Paper</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, medium_id: parseInt(event.target.value) })) } >
                                {availableMediums.map(function( variation ){
                                    return <option value={variation.object.id}>{variation.object.name} {'kr' + variation.object.price}</option>;
                                })}
                            </select>
                        </div>
                        <div className="gallery-app-option">
                            <label>Select Frame</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, frame_id: parseInt(event.target.value) })) }  >
                                {availableFrames.map(function( variation ){
                                    return <option value={variation.object.id}>{variation.object.name} {'kr' + variation.object.price}</option>;
                                })}
                            </select>
                        </div>
                        <div className="gallery-app-option">
                            <label>Select Passepartout</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, passepartout_id: parseInt(event.target.value) })) }  >
                                {availablePassepartouts.map(function( variation ){
                                    return <option value={variation.object.id}>{variation.object.name} {'kr' + variation.object.price}</option>;
                                })}
                            </select>
                        </div>
                        <Product mediums={availableMediums} frames={availableFrames} passepartouts={availablePassepartouts} order={order}/>
                        </>
                        :
                        null
                    }
              </div>
          </div>
      </>
  );

};
export default Details;
