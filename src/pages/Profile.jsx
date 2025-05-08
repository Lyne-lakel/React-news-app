import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

function Profile() {
  const { articles, viewedArticles, favoriteArticles, theme } = useContext(NewsContext);
  const [activeTab, setActiveTab] = useState('viewed');
  const viewed = articles.filter((article) => viewedArticles.includes(article.id));
  const favorites = articles.filter((article) => favoriteArticles.includes(article.id));

  return (
    <div className={`profile-section ${theme}`}>
      <div className="profile-header">
        <div className="profile-summary">
          <h2>Your Profile</h2>
          <p>Viewed Articles: {viewed.length} | Favorite Articles: {favorites.length}</p>
        </div>
      </div>
      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'viewed' ? 'active' : ''}`}
          onClick={() => setActiveTab('viewed')}
        >
          Viewed
        </button>
        <button
          className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>
      <div className="profile-content">
        {activeTab === 'viewed' ? (
          viewed.length === 0 ? (
            <p>You haven't viewed any articles yet.</p>
          ) : (
            <div className="profile-article-grid">
              {viewed.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id} className={`profile-article-card ${theme}`}>
                  <img src={article.thumbnail} alt={article.title} className="profile-article-thumbnail" />
                  <div className="profile-article-info">
                    <h5>{article.title}</h5>
                    <p>By {article.author} | {new Date(article.publishedAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : favorites.length === 0 ? (
          <p>You haven't favorited any articles yet.</p>
        ) : (
          <div className="profile-article-grid">
            {favorites.map((article) => (
              <Link to={`/article/${article.id}`} key={article.id} className={`profile-article-card ${theme}`}>
                <img src={article.thumbnail} alt={article.title} className="profile-article-thumbnail" />
                <div className="profile-article-info">
                  <h5>{article.title}</h5>
                  <p>By {article.author} | {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;