import { react, useState, useEffect } from '@wordpress/element';

const Options = ( props ) => {

  return (
      <>
          <div className="gallery-app-option">
              <label>Välj papper</label>
              <select onChange={event => props.setOrder(prevState => ( {...prevState, medium_id: parseInt(event.target.value) } )) } required>
              <option>Inte valt</option>
                  {props.mediums.map(function( variation ){
                      return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
                  })}
              </select>
          </div>
          <div className="gallery-app-option">
              <label>Välj ram</label>
              <select onChange={event => props.setOrder(prevState => ( {...prevState, frame_id: parseInt(event.target.value) } )) }  >
              <option>Ingen ram</option>
                  {props.frames.map(function( variation ){
                      return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
                  })}
              </select>
          </div>
          <div className="gallery-app-option">
              <label>Ingen passepartout</label>
              <select onChange={event => props.setOrder(prevState => ( {...prevState, passepartout_id: parseInt(event.target.value) } )) }  >
              <option>Ingen passepartout</option>
                  {props.passepartouts.map(function( variation ){
                      return <option value={variation.id}>{variation.name} {'kr' + variation.price}</option>;
                  })}
              </select>
          </div>
      </>
  );
};

export default Options;
