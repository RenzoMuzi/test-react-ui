import React from"react";import PropTypes from"prop-types";import classNames from"classnames";var Button=function(e){var a=e.btnClassName,s=e.labelClassName,t=e.disabled,l=e.label,o=e.onClick;return React.createElement("button",{disabled:t,className:classNames("pc-btn",a),onClick:o},React.createElement("span",{className:s},l))};Button.displayName="Button",Button.defaultProps={btnClassName:"pc-btn",labelClassName:"mx1",disabled:!1,label:"",onClick:function(){}},Button.propTypes={btnClassName:PropTypes.string,labelClassName:PropTypes.string,disabled:PropTypes.bool,label:PropTypes.string,onClick:PropTypes.func};export default Button;
//# sourceMappingURL=Button.js.map