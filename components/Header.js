import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';


const Header = (props) => {

  return (

    <Menu >

      <Link route='/'>

        <a className="item">
          CHAINFUND
        </a>

      </Link>

      <Menu.Menu position="right">

      <Link route='/'>

        <a className="item">
          FUND LIST
        </a>

      </Link>

      <Link route='/campaigns/new'>

        <a className="item">
          +
        </a>

      </Link>



      </Menu.Menu>

    </Menu>
  );

}

export default Header;
