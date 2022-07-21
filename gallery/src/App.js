import { react, useState, useEffect } from '@wordpress/element';

import Details from "./Details";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import "../../static/style.css";


const GalleryApp = () => {


    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    const productID   = urlParams.get('image');
    const origin      = window.location.origin;


    const [ image, setImage ] = useState({});
    const [ dimensions, setDimensions ] = useState({});
    const [ categoryIds, setCategoryIds ] = useState();
    const [ mediums, setMediums ] = useState();
    const [ frames, setFrames ] = useState();
    const [ passepartouts, setPassepartouts ] = useState();


    const getImage = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=image&id=${productID}`
        ).then((data) => data.json());
        setImage( { name: data.name, src: data.images[0].src } );
        data.attributes.map((attribute) => {
            if ( attribute.name == 'Dimensions' ) {
                setDimensions(attribute.options);
            }
        })
        getCategoryIds();
    };
    useEffect(() => { getImage(); }, [] );


    const getCategoryIds = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=categories`
        ).then((data) => data.json());
        const ids = { medium: '', frame: '', passepartout: '' };
        data.map((category) => {
            if ( category.slug == 'print-mediums' ) {
                ids.medium = category.id;
            }
            if ( category.slug == 'frames' ) {
                ids.frame = category.id;
            }
            if ( category.slug == 'passepartouts' ) {
                ids.passepartout = category.id;
            }
        })
        setCategoryIds(ids);
    };


    const getMediums = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=options&category=${categoryIds.medium}`
        ).then((data) => data.json());
        setMediums(data);
    };
    useEffect(() => { if ( categoryIds !== undefined ) { getMediums(); } }, [ categoryIds ] );


    const getFrames = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=options&category=${categoryIds.frame}`
        ).then((data) => data.json());
        setFrames(data);
    };
    useEffect(() => { if ( mediums !== undefined ) { getFrames(); } }, [ mediums ] );


    const getPassepartouts = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=options&category=${categoryIds.passepartout}`
        ).then((data) => data.json());
        setPassepartouts(data);
    };
    useEffect(() => { if ( frames !== undefined ) { getPassepartouts(); } }, [ frames ] );


    return (
        <div className="gallery-app-container">
            { image !== undefined && dimensions !== undefined && mediums !== undefined
              && frames !== undefined && passepartouts !== undefined ?
                <Details image={image} dimensions={dimensions} mediums={mediums} frames={frames} passepartouts={passepartouts} />
                :
                <p>loading workshop...</p>
            }
        </div>
    );

};
export default GalleryApp;
