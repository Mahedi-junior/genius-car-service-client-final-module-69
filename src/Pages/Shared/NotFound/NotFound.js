import React from 'react';
import img from '../../../images/404error.png';
import imgerror from '../../../images/404.png'

const NotFound = () => {
    return (
        <div>
            <h2 className='text-danger text-center'>Page NotFound</h2>
            <img className='w-100' src={imgerror} alt="" />
        </div>
    );
};

export default NotFound;