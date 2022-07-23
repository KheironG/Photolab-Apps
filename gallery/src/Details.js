import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Options from "./Options";
import Product from "./Product";

const Details = ( props ) => {

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ loaded, setLoaded ] = useState();
    const [ order, setOrder ] = useState( {
        dimension: selectedDimension,
        image_id: props.image.id,
        image_price: parseInt(props.image.price),
        frame_id: '',
        medium_id: '',
        passepartout_id: ''
    });

    const setDimension = ( dimension ) => {
        setSelectedDimension(dimension);
        setOrder(prevState => ({...prevState, dimension: dimension }))
    }
    const setMediums = (objects, selectedDimension) => {
        getVariations('mediums', objects, selectedDimension);
    }
    const setFrames = (objects, selectedDimension) => {
        getVariations('frames', objects, selectedDimension);
    }
    const setPassepartouts = (objects, selectedDimension) => {
        getVariations('passepartouts', objects, selectedDimension);
    }

    const getVariations = async (type, objects, selectedDimension) => {
        const origin = window.location.origin;
        var options = [];
        for ( let object of objects ) {
            if ( object.type === 'variable' ) {
                const data = await fetch(
                    `${origin}/wp-json/photolab-app/v1/auth?task=variations&id=${object.id}`
                ).then(data => data.json());
                    for ( let variation of data ) {
                        for ( let attribute of variation.attributes ) {
                            if (attribute.name == 'Dimensions' && attribute.option ==  ( selectedDimension ) ) {
                                options.push({ id: variation.id, name: object.name, price: variation.price });
                            }
                        }
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


    useEffect(() => {
        setMediums(props.mediums, selectedDimension);
    }, [ selectedDimension ] );

    useEffect(() => {
        if ( availableMediums !== undefined ) {
            setFrames(props.frames, selectedDimension);
        }
    }, [ availableMediums ] );

    useEffect(() => {
        if ( availableFrames !== undefined ) {
            setPassepartouts(props.passepartouts, selectedDimension);
        }
    }, [ availableFrames ] );

    useEffect(() => {
        if ( availableMediums !== undefined && availableFrames !== undefined && availablePassepartouts !== undefined ) {
            setLoaded(true);
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
                                        {availableMediums.map(function( option ){
                                            return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="gallery-app-option">
                                    <label>Select Frame</label>
                                    <select onChange={event => setOrder(prevState => ({...prevState, frame_id: parseInt(event.target.value) })) }  >
                                        {availableFrames.map(function( option ){
                                            return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="gallery-app-option">
                                    <label>Select Passepartout</label>
                                    <select onChange={event => setOrder(prevState => ({...prevState, passepartout_id: parseInt(event.target.value) })) }  >
                                        {availablePassepartouts.map(function( option ){
                                            return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                                        })}
                                    </select>
                                </div>
                                <Order mediums={availableMediums} frames={availableFrames} passepartouts={availablePassepartouts} order={order}/>
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
