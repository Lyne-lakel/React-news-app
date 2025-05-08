import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [viewedArticles, setViewedArticles] = useState([]);
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const categories = ['business', 'technology', 'health', 'sports', 'entertainment', 'science'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const allArticles = [];
        for (const category of categories) {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${API_KEY}`
          );
          const mappedArticles = response.data.articles.map((article, index) => ({
            id: `${category}-${index}`,
            title: article.title,
            thumbnail: article.urlToImage || 'https://via.placeholder.com/300x180?text=No+Image',
            summary: article.description || 'No summary available.',
            content: article.content || article.description || 'No content available.',
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
            date: article.publishedAt.split('T')[0],
            publishedAt: article.publishedAt,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            source: article.source.name,
            author: article.author || 'Unknown',
            url: article.url,
            isFavorite: false,
          }));
          allArticles.push(...mappedArticles);
        }
        setArticles(allArticles);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [API_KEY]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const incrementView = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, views: article.views + 1 } : article
      )
    );
    if (!viewedArticles.includes(id)) {
      setViewedArticles([...viewedArticles, id]);
    }
  };

  const toggleLike = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, likes: article.likes + 1 } : article
      )
    );
  };

  const toggleDislike = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article
      )
    );
  };

  const addComment = (id, comment) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, comments: [...article.comments, comment] }
          : article
      )
    );
  };

  const toggleFavorite = (id) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, isFavorite: !article.isFavorite } : article
      )
    );
    setFavoriteArticles((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        viewedArticles,
        favoriteArticles,
        theme,
        toggleTheme,
        incrementView,
        toggleLike,
        toggleDislike,
        addComment,
        toggleFavorite,
        loading,
        error,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};