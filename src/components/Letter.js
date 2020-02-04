import React     from 'react';
import PropTypes from 'prop-types';


import './Letter.css'

const Letter = ({value, state, handleOnClick}) => (
    <button className="charbutton" onClick={() => handleOnClick(value)} disabled={state ? '' : 'disabled'}>{value}</button>
)

Letter.defaultProps = {
    state: true
}

Letter.propTypes = {
    value: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    handleOnClick: PropTypes.func.isRequired,
};

export default Letter;
