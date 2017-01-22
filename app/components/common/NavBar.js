import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const NavBar = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Dashboard</IndexLink>
      {" | "}
      <Link to="/monitor" activeClassName="active">monitor</Link>
      {" | "}
      <Link to="/settings" activeClassName="active">settings</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

NavBar.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NavBar;
