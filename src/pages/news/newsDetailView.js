import React from 'react';

const NewsDetailView = () => {
    return (
        <div style={{margin:"50px", fontSize:"30px"}}>{window.location.pathname.split('/')[2]}</div>
    )
};

export default NewsDetailView;