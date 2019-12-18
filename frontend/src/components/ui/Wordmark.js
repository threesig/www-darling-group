import React from 'react';
const Wordmark = props => {
  const aspect = 2.965014169;
  let { h } = props;
  h = h || 50;

  const height = h;
  const width = h*aspect;

  // Color applied as `fill` on `path`
  return (
    <svg className="Wordmark" height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847.49 285.83">
      <defs>
        <clipPath id="clip-path" transform="translate(-277 -432)">
          <path class="cls-1" d="M381.08,623.9c-9.32,8.7-23,14.12-37.26,14.12-35,0-61.82-30.13-61.82-68.32s26.82-68.33,61.82-68.33c14.22,0,27.94,5.42,37.26,14.12v-78H426.4V635H381.08Zm0-42V557.47c-4.28-9.33-13.85-15.63-25.43-15.63-16.12,0-27.95,12-27.95,27.86s11.83,27.85,27.95,27.85C367.23,597.55,376.8,591.25,381.08,581.92Z"/>
        </clipPath>
        <clipPath id="clip-path-2" transform="translate(-277 -432)">
          <rect class="cls-2" width="1440" height="1024"/>
        </clipPath>
        <clipPath id="clip-path-3" transform="translate(-277 -432)">
          <path class="cls-1" d="M537.45,623.9c-9.31,8.7-23,14.12-37.27,14.12-35,0-61.81-30.13-61.81-68.32s26.81-68.33,61.81-68.33c14.23,0,28,5.42,37.27,14.12V504.4h45.32V635H537.45Zm0-42V557.47c-4.28-9.33-13.85-15.63-25.43-15.63-16.12,0-27.95,12-27.95,27.86S495.9,597.55,512,597.55C523.6,597.55,533.17,591.25,537.45,581.92Z"/>
        </clipPath>
        <clipPath id="clip-path-5" transform="translate(-277 -432)">
          <path class="cls-1" d="M677.2,501.37a23.24,23.24,0,0,1,7.81,1.35v41.66a44.75,44.75,0,0,0-13.35-2.55c-9.57,0-17.88,5.8-22.54,15V635H602.67V504.4h46.45v14.75C654.54,509.06,665.11,501.37,677.2,501.37Z"/>
        </clipPath>
        <clipPath id="clip-path-7" transform="translate(-277 -432)">
          <rect class="cls-2" x="700.75" y="437.49" width="46.58" height="197.5"/>
        </clipPath>
        <clipPath id="clip-path-8" transform="translate(-277 -432)">
          <path class="cls-1" d="M790.45,437a25.7,25.7,0,1,1-25.73,25.76A25.29,25.29,0,0,1,790.45,437ZM767.24,635h46.58V504.4H767.24Z"/>
        </clipPath>
        <clipPath id="clip-path-10" transform="translate(-277 -432)">
          <path class="cls-1" d="M878.68,635H832.23V504.4h46.45v12.73c6.92-9.71,18.89-15.76,31.85-15.76,28.83,0,50.11,21.3,50.11,50.55V635H914.18V559.36c0-9.46-6.67-17.53-17.74-17.53-7.56,0-14.48,5.3-17.76,11.6Z"/>
        </clipPath>
        <clipPath id="clip-path-12" transform="translate(-277 -432)">
          <path class="cls-1" d="M1074.17,621.25c-9.32,8.7-23,14.12-37.26,14.12-35,0-61.82-28.23-61.82-65.67,0-38.2,26.82-68.33,61.82-68.33,14.22,0,27.94,5.42,37.26,14.12V504.4h45.32v141c0,39-28.7,67.44-70.63,67.44-24.67,0-49-7.82-64.83-22.19l21.9-31.51a58.16,58.16,0,0,0,38.78,14.24c17.75,0,29.46-10,29.46-25.21Zm0-63.78c-4.28-9.33-13.85-15.63-25.43-15.63-16.12,0-28,12-28,27.86s11.83,27.85,28,27.85c11.58,0,21.15-6.3,25.43-15.63Z"/>
        </clipPath>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
        <g class="cls-3">
        <g class="cls-4">
        <rect class="cls-5" y="0.49" width="154.4" height="210.53"/>
      </g>
      </g>
      <g class="cls-6">
        <g class="cls-4">
        <rect class="cls-5" x="156.37" y="64.37" width="154.4" height="146.65"/>
      </g>
      </g>
      <g class="cls-7">
        <g class="cls-4">
        <rect class="cls-5" x="320.67" y="64.37" width="92.34" height="143.62"/>
      </g>
      </g>
      <g class="cls-8">
        <rect class="cls-5" x="418.75" y="0.49" width="56.58" height="207.5"/>
      </g>
      <g class="cls-9">
        <g class="cls-4">
        <rect class="cls-5" x="482.72" width="61.47" height="207.99"/>
      </g>
      </g>
      <g class="cls-10">
        <g class="cls-4">
        <rect class="cls-5" x="550.23" y="64.37" width="138.41" height="143.62"/>
      </g>
      </g>
      <g class="cls-11">
        <g class="cls-4">
        <rect class="cls-5" x="693.09" y="64.37" width="154.4" height="221.46"/>
      </g>
      </g>
      </g>
      </g>
    </svg>
    );
}

export default Wordmark;