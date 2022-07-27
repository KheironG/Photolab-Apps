import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Options from "./Options";
import Product from "./Product";

const Details = ( props ) => {

    const description = props.image.desc.replace(/(<([^>]+)>)/gi, "");
    const title = props.image.name;

    const [ selectedDimension, setSelectedDimension ] = useState();
    const [ availableMediums, setAvailableMediums ] = useState();
    const [ availableFrames, setAvailableFrames ] = useState();
    const [ availablePassepartouts, setAvailablePassepartouts ] = useState();
    const [ customImage, setCustomImage ] = useState();
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
        var dimension = selectedDimension.replace(/[^0-9]/gi, '');
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


    const CustomImage = async () => {
        const input = document.getElementById('photolab-gallery-custom-image');
        let image = new FormData();
        image.append('file', input.files[0]);

        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=upload-image`, {
              method: 'POST',
              body: image,
          }
        ).then((data) => data.json());
        setCustomImage(data);
        return;
    };


    return (
      <>
          <Image image={props.image}/>
          <label>
            <input type="file" id="photolab-gallery-custom-image" onChange={CustomImage}/>
          </label>

          <div className="gallery-app-info">
              {title !== '' ? <h2>{title}</h2>: null}
              {title !== '' ? <p>{description}</p>: null}
              <div className="gallery-app-options">
                    <div className="gallery-app-option">
                        <label>välj storlek</label>
                        <select onChange={event => setDimension(event.target.value)} required>
                            <option>Inte valt</option>
                            {props.dimensions.map(function( dimension, i ){
                                return <option value={dimension}>{dimension}</option>;
                            })}
                        </select>
                    </div>
                    { loaded == true ?
                        <>
                        <div className="gallery-app-option">
                            <label>Välj papper</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, medium_id: parseInt(event.target.value) })) } required>
                                <option>Inte valt</option>
                                {availableMediums.map(function( variation ){
                                    return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
                                })}
                            </select>
                        </div>
                        <div className="gallery-app-option">
                            <label>Välj ram</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, frame_id: parseInt(event.target.value) })) }  >
                                <option>Ingen ram</option>
                                {availableFrames.map(function( variation ){
                                    return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
                                })}
                            </select>
                        </div>
                        <div className="gallery-app-option">
                            <label>Ingen passepartout</label>
                            <select onChange={event => setOrder(prevState => ({...prevState, passepartout_id: parseInt(event.target.value) })) }  >
                                <option>Ingen passepartout</option>
                                {availablePassepartouts.map(function( variation ){
                                    return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
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
