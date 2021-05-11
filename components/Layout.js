import React from 'react';
import Header from '../components/Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



const Layout = (props) => {


  return (
    <div>
    <Header />
    <Container>

        {props.children}



    </Container>
    </div>

  );


};

export default Layout;
