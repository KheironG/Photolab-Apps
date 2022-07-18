import { react, useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom'

import Upload from "./Upload";
import Workshop from "./Workshop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import "../../static/style.css";


const App = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productID = urlParams.get('image');

    const origin = window.location.origin;
    const [ product , setProduct ] = useState();

    const getProduct = async () => {
        const response = await fetch(
            `${origin}/wp-json/photolabapp-auth/v1/photolabapp?id=${productID}`
        ).then((response) => response.json());
          console.log(response);
    };


    useEffect(() => {
        getProduct();
    }, []);


  return (
      <div className="app">
            <Workshop/>
      </div>
  );
};
export default App;
