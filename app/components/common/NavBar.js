import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const NavBar = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active"><i className="material-icons menu-icon">play_circle_outline</i></IndexLink>
      <Link to="/monitor" activeClassName="active"><i className="material-icons menu-icon">av_timer</i></Link>
      <Link to="/settings" activeClassName="active"><i className="material-icons menu-icon">settings</i></Link>
      {loading && <LoadingDots interval={400} dots={3}/>}
    </nav>
  );
};

NavBar.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default NavBar;
