import React, { useContext, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import TrendingSidebar from '../components/TrendingSidebar';
import { NewsContext } from '../context/NewsContext';

function Home() {
  const { articles, loading, error } = useContext(NewsContext);
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(articles.map((article) => article.category))];

  const filteredArticles =
    category === 'All' ? articles : articles.filter((article) => article.category === category);

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="category-filter">
          <h4>Categories</h4>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredArticles.length === 0 ? (
          <p>No articles available.</p>
        ) : (
          <div className="article-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
      <div className="col-md-4">
        <TrendingSidebar />
      </div>
    </div>
  );
}

export default Home;