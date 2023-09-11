// Layout.js

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, products }) => {
  return (
    <div>
      {/* <Navbar products={products}/> */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
