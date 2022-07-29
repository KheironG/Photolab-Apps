import { react, useState, useEffect } from '@wordpress/element';

const Options = ( props ) => {


  return (
      <>
          <div className="gallery-app-option">
              <label>Select Paper</label>
              <select name="" >
                  {props.mediums.map(function( option ){
                      return <option value={option.id}>{option.name + option.price }</option>;
                  })}
              </select>
          </div>
          <div className="gallery-app-option">
              <label>Select Frame</label>
              <select>
                  {props.frames.map(function( option ){
                      return <option value={option.id}>{option.name} {'kr' + option.price}</option>;
                  })}
              </select>
          </div>
      </>
  );
};
export default Options;
