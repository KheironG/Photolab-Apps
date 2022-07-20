import { react, useState, useEffect } from '@wordpress/element';

import Image from "./Image";
import Mediums from "./Mediums";
import Frames from "./Frames";
import Passepartouts from "./Passepartouts";

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
    const [ mediums, setMediums ] = useState({});
    const [ frames, setFrames ] = useState({});
    const [ passepartouts, setPassepartouts ] = useState({});

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

    useEffect(() => {
        if ( categoryIds !== undefined ) {
            getMediums();
        }
    }, [categoryIds]);


    const getMediums = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=mediums&category=${categoryIds.medium}`
        ).then((data) => data.json());
        console.log(data);
    };
    //
    const getFrames = async () => {
        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=image&id=${productID}`
        ).then((data) => data.json());

    };
    //
    // const getPassepartouts = async () => {
    //     const data = await fetch(
    //         `${origin}/wp-json/photolab-app/v1/auth?task=image&id=${productID}`
    //     ).then((data) => data.json());
    //
    // };

    useEffect(() => {
        getImage();
    }, [] );

    return (
        <div className="photolab-single-product">
            <div className="single-product-images">
                <img src={image.src}/>
            </div>
            <div className="single-product-info">
                <h2>{image.name}</h2>
                <div className="flex-start-center c-gap-20">
                    <h4 className=""></h4>
                </div>
            </div>
        </div>
    );

};
export default GalleryApp;
