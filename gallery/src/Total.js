import { react, useState, useEffect } from '@wordpress/element';

const Total = ( props ) => {

    const total = props.total.image + props.total.frame + props.total.medium + props.total.passepartout;

  return (
      <h3>{total}</h3>
  );
};
export default Total;
