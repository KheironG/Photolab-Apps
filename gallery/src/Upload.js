import { react, useState, useEffect } from '@wordpress/element';

const Upload = ( props ) => {

    const customImage = async () => {
        const input = document.getElementById('photolab-gallery-custom-image');
        let image = new FormData();
        image.append('file', input.files[0]);

        const data = await fetch(
            `${origin}/wp-json/photolab-app/v1/auth?task=upload-image`, {
              method: 'POST',
              body: image,
          }
        ).then((data) => data.json());
        props.setImageSrc(data);
        return;
    };

  return (
      <div className="gallery-app-upload-image">
          <div>
              <label>
                  <i class="fa-solid fa-camera fa-4x"></i>
                  <h5>ladda upp</h5>
              </label>
              <input type="file" id="photolab-gallery-custom-image" onChange={customImage}/>
          </div>
      </div>
  );

};
export default Upload;
