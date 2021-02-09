import React from 'react';

const BannerTop = React.memo(( {banner} ) => {

    return (
        <div id="banner-top" className="img-container">
            <img className="img-fluid" src={banner} alt="" />
        </div>
    );
});

export default BannerTop;
