import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

function TrendingSidebar() {
  const { articles, theme } = useContext(NewsContext);
  const trending = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="trending-sidebar">
      <h4>Trending</h4>
      <ul>
        {trending.map((article) => (
          <li key={article.id} className={theme}>
            <Link to={`/article/${article.id}`} className={theme}>{article.title}</Link>
            <p>Views: {article.views}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingSidebar;