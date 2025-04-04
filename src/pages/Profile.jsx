import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { done, favorite, logout, perfil } from '../assets/images';
import './Profile.css';
import Footer from '../components/Footer';

function Profile() {
  const [profileEmail, setProfileEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user')) || [];
    setProfileEmail(email.email);
  }, []);

  return (
    <div>
      <img
        className="profile-perfil"
        src={ perfil }
        alt="Profile"
      />
      <Header title="Profile" />
      <p
        className="profile-email"
      >
        {profileEmail}
      </p>
      <button
        className="profile-done-recipes-button"
        onClick={ () => history.push('/done-recipes') }
      >
        <img
          className="profile-done-recipes"
          src={ done }
          alt="Done Recipes"
        />
      </button>
      <p className="margin-done" />
      <button
        className="profile-favorite-recipes-button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img
          className="profile-favorite-recipes"
          src={ favorite }
          alt="Favorite Recipes"
        />
      </button>
      <p className="margin-favorite" />
      <button
        className="profile-logout-button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        <img
          className="profile-logout"
          src={ logout }
          alt="Logout"
        />
      </button>
      <footer style={ { position: 'fixed' } }>
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
