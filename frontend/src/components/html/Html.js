import React from 'react';



const Html = ({ content, type, className, style }) => {
    return React.createElement(type, {
        className: className,
        style: style,
        dangerouslySetInnerHTML: {
            __html: content
        },
    });
}
Html.defaultProps = {
    content: '',
    type: 'span',
    className: '',
    style: {},
}

export default Html;
