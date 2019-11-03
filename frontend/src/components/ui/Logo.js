import React from 'react';
const Logo = props => {
  let { hw } = props;
  hw = hw || 50;

  // Color applied as `fill` on `path`
  return (
    <svg className="Logo" height={hw} width={hw} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 244"><g data-name="Layer 2"><path d="M122 0a122 122 0 10122 122A122 122 0 00122 0zm-1.23 163.43H88.6v-79h32.05c24.87 0 43.35 14.21 43.35 39.44s-18.48 39.56-43.23 39.56z" data-name="Layer 1" /></g></svg>
  );
}

export default Logo;