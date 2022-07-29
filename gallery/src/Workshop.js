import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import ImageQuality from "./ImageQuality";
import Upload from "./Upload";
import Options from "./Options";
import Product from "./Product";

const Workshop = ( props ) => {

    const description = props.image.desc.replace(/(<([^>]+)>)/gi, "");
    const title = props.image.title;

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ imageSrc, setImageSrc ] = useState(props.image.src);
    const [ loaded, setLoaded ] = useState(false);
    const [ order, setOrder ] = useState( {
        dimension: selectedDimension,
        image_id: props.image.id,
        image_price: parseInt(0),
        frame_id: 0,
        medium_id: '',
        passepartout_id: ''
    });

    const setVariations = ( type, objects, selectedDimension ) => {
        var options = [];
        let dimension = selectedDimension.replace(/[^0-9]/gi, '');
        for ( let object of objects ) {
            for ( let variation of object.variations ) {
                let pa_dimensions = variation.attributes.attribute_pa_dimensions.replace(/[^0-9]/gi, '');;
                if ( pa_dimensions === dimension ) {
                    options.push({ id: variation.variation_id, name: object.object.name, price: variation.display_price });
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


    useEffect(() => {
        if ( availableMediums !== undefined && availableFrames !== undefined && availablePassepartouts !== undefined  ) {
            setLoaded(true);
        }
    }, [ availableMediums, availableFrames, availablePassepartouts ] );


    return (
        <>
            <div className="gallery-app-image">
                { ( props.image.id !== '' && imageSrc !== '' ) &&
                    <Image src={imageSrc} dimension={selectedDimension}/>
                }
                { ( props.image.id === '' && imageSrc !== '' ) &&
                    <Image src={imageSrc} dimension={selectedDimension}/>
                }
                { ( props.image.id === '' && imageSrc === '' ) &&
                    <Upload setImageSrc={setImageSrc}/>
                }
            </div>

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
                            <ImageQuality dimension={selectedDimension} />
                        </div>
                    }

                    { loaded == true ?
                    <>
                        <Options mediums={availableMediums} frames={availableFrames} passepartouts={availablePassepartouts} setOrder={setOrder} />
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
export default Workshop;
