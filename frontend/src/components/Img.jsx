import React from "react";

function Img(props){
    return (
        <div className="image-container">
            <img src={props.src}
                className="cover-img"
            />
            <div className="circle-corner">
                <div className="circle-corner2"></div>
            </div>
            <div className="circle-corner">
                <div className="circle-corner2"></div>
            </div>
        </div>
    );
}

export default Img;