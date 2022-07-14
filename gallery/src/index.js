import { render } from '@wordpress/element';
import ReactDOM from "react-dom";

import App from './App';

if (document.getElementById('photolab-gallery-app')) {
  render(<App />, document.getElementById('photolab-gallery-app'));
}
