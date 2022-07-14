import { react, useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom'

import Upload from "./Upload";
import Workshop from "./Workshop";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import "../../static/style.css";


const App = () => {

    const origin = window.location.origin;

    const [products, setProducts] = useState();

    const getApiData = async () => {
        const response = await fetch(
            `${origin}/wp-admin/admin-ajax.php?action=photolab_ajax&task=get&limit=2&category=34`
        ).then((response) => response.text());
          console.log(response);
          setProducts(response);
    };

    useEffect(() => {
        getApiData();
    }, []);


  return (
      <div className="app">
            <p>test</p>
      </div>
  );
};
export default App;
