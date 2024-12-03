import React from "react";
import PropTypes from "prop-types";
import "../common/style.css"; // Import the CSS file containing the Roboto styles

// AppText Component
const AppText = ({ children, style, className }) => {
    return (
        <div className={`roboto-regular ${className}`} style={style}>
            {children}
        </div>
    );
};

AppText.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
};

AppText.defaultProps = {
    style: {},
    className: ""
};

export { AppText }