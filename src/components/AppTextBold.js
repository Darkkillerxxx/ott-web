import React from "react";
import PropTypes from "prop-types";
import "../common/style.css"; // Import the CSS file containing the Roboto styles

const AppTextBold = ({ children, style, className }) => {
    return (
        <p className={`roboto-bold ${className}`} style={style}>
            {children}
        </p>
    );
};

AppTextBold.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
};

AppTextBold.defaultProps = {
    style: {},
    className: ""
};

export { AppTextBold };
