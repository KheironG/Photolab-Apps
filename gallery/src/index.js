import { render } from '@wordpress/element';
import ReactDOM from "react-dom";

import GalleryApp from './GalleryApp';

if (document.getElementById('photolab-gallery-app')) {
  render(<GalleryApp />, document.getElementById('photolab-gallery-app'));
}
