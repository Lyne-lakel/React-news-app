import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import TrendingSidebar from '../components/TrendingSidebar';
import { NewsContext } from '../context/NewsContext';

function ArticleDetail() {
  const { id } = useParams();
  const { articles, incrementView, toggleLike, toggleDislike, toggleFavorite } = useContext(NewsContext);
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (article) {
      incrementView(article.id);
    }
  }, [article, incrementView]);

  if (!article) {
    return <div>Article not found</div>;
  }

  const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>{article.title}</h2>
        <img src={article.thumbnail} alt={article.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem' }} />
        <p>{article.content}</p>
        <p className="article-card-meta">
          By {article.author} | Published: {formattedDate} | Source: {article.source} | Views: {article.views}
        </p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginBottom: '1rem' }}>
          Read Original Article
        </a>
        <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0' }}>
          <button className="btn" onClick={() => toggleLike(article.id)}>
            👍 {article.likes}
          </button>
          <button className="btn" onClick={() => toggleDislike(article.id)}>
            👎 {article.dislikes}
          </button>
          <button
            className={`btn favorite ${article.isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(article.id)}
          >
            {article.isFavorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
        <CommentSection articleId={article.id} comments={article.comments} />
      </div>
      <div className="col-md-4">
        <TrendingSidebar />
      </div>
    </div>
  );
}

export default ArticleDetail;