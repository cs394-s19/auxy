import React from "react";

const Auxy = ({
//   x="",
//   y="",
  viewBox="0 0 140 13",
  className="",
  transform=""
}) => {
        return (<svg 
            width="300" height="160"
            transform={transform}
            style={{WebkitTransform: "scale(3.7,3.7)"}}
            viewBox={viewBox}>
            <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stop-color="#FC6D8B" />
                    <stop offset="95%" stop-color="#F49368" />
                </linearGradient>
                <pattern id="wave" x="0" y="0" width="120" height="20" patternUnits="userSpaceOnUse">
                    <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)">
                        <animateTransform attributeName="transform" begin="0s" dur="2s" type="translate" from="0,0" to="40,0" repeatCount="indefinite" />
                    </path>
                </pattern>
            </defs>
            <text className ={className} x="50" y="15" font-size="17" fill="url(#wave)" fill-opacity="0.8">AUXY</text>
            <text className ={className} x="50" y="15"  font-size="17" fill="url(#gradient)" fill-opacity="0.3">AUXY</text>
        </svg>);
    };

export default Auxy;


