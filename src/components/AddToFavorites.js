import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../contexts/currentUser';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const [isClicked, setIsClicked] = useState(false);

  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse,
  });
  const handleLike = event => {
    event.preventDefault();
    setIsClicked(true);
    console.log(currentUserState.isLoggedIn);
    if (!currentUserState.isLoggedIn) {
      return;
    }
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };

  if (isClicked && !currentUserState.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className='ion-heart'></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
