import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

function ArticleCard({ article }) {
  const { theme, toggleFavorite } = useContext(NewsContext);
  const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`article-card ${theme}`}>
      <img src={article.thumbnail} alt={article.title} />
      <div className="article-card-body">
        <h5 className="article-card-title">{article.title}</h5>
        <p className={`article-card-text ${theme}`}>{article.summary}</p>
        <p className="article-card-meta">
          By {article.author} | {formattedDate} | {article.source} | Views: {article.views}
        </p>
        <div className="article-card-actions">
          <Link to={`/article/${article.id}`} className="btn">
            Read More
          </Link>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn">
            Read Original
          </a>
          <button
            className={`btn favorite ${article.isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(article.id)}
          >
            {article.isFavorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;