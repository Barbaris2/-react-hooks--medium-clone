import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/currentUser';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Medium
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink to='/' className='nav-link' exact>
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <>
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link'>
                  Sign in
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/register' className='nav-link'>
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn && (
            <>
              <li className='nav-item'>
                <NavLink to='/articles/new' className='nav-link'>
                  <i className='ion-compose'></i>
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/settings' className='nav-link'>
                  <i className='ion-gear-a'></i>
                  &nbsp; Settings
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={`/feed`} className='nav-link'>
                  <img
                    className='user-pic'
                    src={currentUserState.currentUser.image}
                    alt=''
                  />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;