import React, { useState, useContext } from 'react';
import { NewsContext } from '../context/NewsContext';

function CommentSection({ articleId, comments }) {
  const { addComment, theme } = useContext(NewsContext);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(articleId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className={`comment-section ${theme}`}>
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <p key={index} className={`comment-item ${theme}`}>
            {comment}
          </p>
        ))
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          className={theme}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="4"
        ></textarea>
        <button type="submit" className="btn">
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default CommentSection;