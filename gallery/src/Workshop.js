import { react, useState, useEffect, useRef } from '@wordpress/element';

import Frame from "./Frame";
import Upload from "./Upload";
import Options from "./Options";
import Product from "./Product";

const Workshop = ( props ) => {

    const description = props.image.desc.replace(/(<([^>]+)>)/gi, "");
    const title = props.image.title;

    const [ imageSrc, setImageSrc ] = useState(props.image.src);
    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ order, setOrder ] = useState( {
        dimension: selectedDimension,
        image_id: props.image.id,
        image_price: 0,
        frame_id: 0,
        medium_id: 0,
        passepartout_id: 0
    });

    const setVariations = ( type, objects, selectedDimension ) => {
        var options = [];
        let dimension = selectedDimension.replace(/[^0-9]/gi, '');
        for ( let object of objects ) {
            for ( let variation of object.variations ) {
                let pa_dimensions = variation.attributes.attribute_pa_dimensions.replace(/[^0-9]/gi, '');;
                if ( pa_dimensions === dimension ) {
                    options.push( {
                        id: variation.variation_id,
                        name: object.object.name,
                        price: variation.display_price,
                        colour: variation.attributes.attribute_pa_color,
                        inner_width: variation.attributes.attribute_pa_inner_width
                    });
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
        return;
    }

    const setDimension = ( dimension ) => {
        setSelectedDimension(dimension);
        setOrder(prevState => ({...prevState, dimension: dimension }))
    }
    const setMediums = ( props, selectedDimension ) => {
        setVariations( 'mediums', props.mediums, selectedDimension );
    }
    const setFrames = ( props, selectedDimension ) => {
        setVariations( 'frames', props.frames, selectedDimension );
    }
    const setPassepartouts = ( props, selectedDimension ) => {
        setVariations( 'passepartouts', props.passepartouts, selectedDimension );
    }


    useEffect(() => {
        if ( selectedDimension !== undefined ) {
            setMediums( props, selectedDimension);
            setFrames( props, selectedDimension);
            setPassepartouts( props, selectedDimension);
        }
    }, [ selectedDimension ] );


    return (
        <>
            {  ( props.image.id !== '' || props.image.id === 'custom' ) && imageSrc !== ''
                ?
                <Frame src={imageSrc}
                       dimension={selectedDimension}
                       order={order}
                       frames={availableFrames}
                       passepartouts={availablePassepartouts}
                />
                :
                <Upload setImageSrc={setImageSrc} />
            }

            <div className="gallery-app-info">

                {title !== '' ? <h2>{title}</h2>: null}
                {title !== '' ? <p>{description}</p>: null}

                <div className="gallery-app-options">
                    { imageSrc !== '' &&
                        <div className="gallery-app-option">
                            <label>välj storlek</label>
                            <select onChange={event => setDimension(event.target.value)} required>
                                <option>Inte valt</option>
                                    {props.dimensions.map(function( dimension, i ){
                                    return <option value={dimension}>{dimension}</option>;
                                    })}
                            </select>
                        </div>
                    }
                    { availableMediums !== undefined && availableFrames !== undefined && availablePassepartouts !== undefined  ?
                    <>
                        <Options mediums={availableMediums} frames={availableFrames} passepartouts={availablePassepartouts} setOrder={setOrder} />
                        <Product mediums={availableMediums} frames={availableFrames} passepartouts={availablePassepartouts} order={order} />
                    </>
                    :
                        null
                    }
                </div>
            </div>
        </>
  );

};
export default Workshop;
