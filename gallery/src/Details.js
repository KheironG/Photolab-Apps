import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Options from "./Options";
import Total from "./Total";

const Details = ( props ) => {

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ loaded, setLoaded ] = useState();
    const [ total, setTotal ] = useState( {
        image: parseInt(props.image.price),
        frame: parseInt(10),
        medium: parseInt(0),
        passepartout: parseInt(0) } );

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
        if ( type === 'mediums' ) {
            setAvailableMediums(options);
        } else if ( type === 'frames' ) {
            setAvailableFrames(options);
        } else if ( type === 'passepartouts' ) {
            setAvailablePassepartouts(options);
        }
    }


    useEffect(() => {
        setMediums(props.mediums, selectedDimension);
    }, [ selectedDimension ] );

    useEffect(() => {
        if ( availableMediums !== undefined && availableMediums.length !== 0 ) {
            setFrames(props.frames, selectedDimension);
        }
    }, [ availableMediums ] );

    useEffect(() => {
        if ( availableFrames !== undefined && availableFrames.length !== 0 ) {
            setPassepartouts(props.passepartouts, selectedDimension);
        }
    }, [ availableFrames ] );

    useEffect(() => {
        if ( availableMediums !== undefined && availableMediums.length !== 0
                && availableFrames !== undefined && availableFrames.length !== 0
                    && availablePassepartouts !== undefined && availablePassepartouts.length !== 0) {
                    setLoaded(true);
        }
    }, [ availableMediums, availableFrames, availablePassepartouts ] );

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
                        { loaded == true ?
                                <>
                                <div className="gallery-app-option">
                                    <label>Select Paper</label>
                                    <select name="" >
                                        {availableMediums.map(function( option ){
                                            return <option value={option.id}>{option.name + option.price }</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="gallery-app-option">
                                    <label>Select Frame</label>
                                    <select name="" >
                                        {availableFrames.map(function( option ){
                                            return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="gallery-app-option">
                                    <label>Select Passepartout</label>
                                    <select name="" >
                                        {availablePassepartouts.map(function( option ){
                                            return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                                        })}
                                    </select>
                                </div>
                                </>
                            :
                            null

                        }
                    </div>
              </div>
              < Total total={total}/>
          </div>
      </>
  );

};
export default Details;
