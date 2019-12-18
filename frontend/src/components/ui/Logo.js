import React from 'react';
const Logo = props => {
  const aspect = 1.016260163;
  let { hw } = props;
  hw = hw || 50;

  const height = hw;
  const width = hw*aspect;
  return (
    <svg className="Logo" height={height} width={width} viewBox="0 0 500 462" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path d="M249.851 461.873L124.926 369.5 0 277.124V92.374L124.926 0 249.85 92.375 374.778 0 499.7 92.375v184.75l-124.922 92.374-124.927 92.374z" fill="#FF006B"/>
        <path d="M0 92.375l124.926 92.374V369.5L0 277.124V92.374z" fill="#C40055"/>
        <path fill="#DF005C" d="M249.851 277.124L124.926 369.5v-184.75l124.925 92.375"/>
        <path d="M124.926 369.499l124.925-92.375L374.778 369.5 249.85 461.873 124.926 369.5zM249.851 92.375L374.778 0 499.7 92.375l-124.922 92.374L249.85 92.375z" fill="#FF1879"/>
        <path d="M374.778 369.499v-184.75L499.7 92.375v184.75l-124.922 92.374z" fill="#C40055"/>
        <path d="M0 92.375L124.926 0 249.85 92.375l-124.925 92.374L0 92.375z" fill="#FF1879"/>
        <path d="M124.926 184.75L249.85 92.374l124.927 92.374-124.927 92.375-124.925-92.375z" fill="#C40055"/>
        <path fill="#DF005C" d="M374.778 369.499v-184.75L249.85 277.124 374.778 369.5"/>
      </g>
    </svg>
  );
}

export default Logo;