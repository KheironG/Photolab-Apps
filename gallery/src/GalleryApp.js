import { react, useState, useEffect } from '@wordpress/element';

import Workshop from "./Workshop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import "../../static/style.css";


const GalleryApp = () => {

    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    const imageID   = urlParams.get('image');
    const origin  = window.location.origin;

    const [ image, setImage ] = useState();
    const [ dimensions, setDimensions ] = useState();
    const [ mediums, setMediums ] = useState();
    const [ frames, setFrames ] = useState();
    const [ passepartouts, setPassepartouts ] = useState();
    const [ loaded, setLoaded ] = useState();

    const getImage = async () => {
        //If image product, get product and attached dimension attribute terms
        if ( imageID !== 'null' ) {
            const data = await fetch(
                `${origin}/wp-json/photolab-app/v1/auth?task=get-image&id=${imageID}`
            ).then((data) => data.json());
            setImage( { title: data.name, src: data.images[0].src, id: data.id, desc: data.short_description } );
            data.attributes.map((attribute) => {
                if ( attribute.name == 'Dimensions' ) {
                    setDimensions(attribute.options);
                }
            })
        //If custom image, get attached dimensions attribute terms
        } else {
            const attributes = await fetch(
                `${origin}/wp-json/photolab-app/v1/auth?task=attributes`
            ).then((attributes) => attributes.json());
            setImage( { title: 'egen bild', src: '', id: '', desc: '' } );
            let dimensions = [];
            for ( let dimension of attributes ) {
                dimensions.push(dimension.slug);
            }
            setDimensions(dimensions);
        }
    };


    const getProducts = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=options`
        ).then((data) => data.json());
        let mediums = [];
        let frames = [];
        let passepartouts = [];
        for ( let option of data ) {
            for ( let category of option.category ) {
                switch ( category.name ) {
                    case 'Print Mediums':
                        mediums.push(option);
                        break;
                    case 'Passepartouts':
                        passepartouts.push(option);
                        break;
                    case 'Frames':
                    frames.push(option);
                    break;
                    default:
                        break;
                }
            }
        }
        setMediums(mediums);
        setFrames(frames);
        setPassepartouts(passepartouts);
    };

    useEffect(() => {
        getImage();
        getProducts();
    }, [] );


    return (
        <div className="gallery-app-container">
            { image !== undefined && dimensions !== undefined && mediums !== undefined
              && frames !== undefined && passepartouts !== undefined ?
                <Workshop image={image} dimensions={dimensions} mediums={mediums} frames={frames} passepartouts={passepartouts} />
                :
                <p>loading workshop...</p>
            }
        </div>
    );

};
export default GalleryApp;
