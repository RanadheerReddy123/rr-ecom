import React, { useState } from 'react';

function ProductReviews({ productId }) {
  // Local state for reviews list and new review form inputs
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Alex', rating: 5, comment: 'Great quality and fast delivery!' },
    { id: 2, name: 'Sam', rating: 4, comment: 'Good product for the price.' },
  ]);

  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: reviewerName,
      rating: Number(rating),
      comment,
    };

    setReviews([newReview, ...reviews]);
    setReviewerName('');
    setComment('');
    setRating(5);
  };

  return (
    <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
      <h4>Customer Reviews & Ratings</h4>

      {/* Review Input Form */}
      <form onSubmit={handleAddReview} style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            style={{ padding: '6px', marginRight: '10px' }}
            required
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ padding: '6px' }}
          >
            <option value={5}>5 Stars ★★★★★</option>
            <option value={4}>4 Stars ★★★★☆</option>
            <option value={3}>3 Stars ★★★☆☆</option>
            <option value={2}>2 Stars ★★☆☆☆</option>
            <option value={1}>1 Star ★☆☆☆☆</option>
          </select>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ padding: '6px', width: '90%', height: '50px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Submit Review
        </button>
      </form>

      {/* Render Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {reviews.map((rev) => (
          <div key={rev.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
            <strong>{rev.name}</strong> - {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
            <p style={{ margin: '3px 0 0 0', color: '#555' }}>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;