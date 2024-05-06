// CommunityPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './communitypage.css'; // Import CSS for styling

const CommunityPage = () => {
  const [discussions, setDiscussions] = useState([
    { id: 1, title: 'Discussion 1', image: 'https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png' },
    { id: 2, title: 'Discussion 2', image: 'https://c.ndtvimg.com/2024-01/nmncfji_indian-cuisine_625x300_26_January_24.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738' },
    { id: 3, title: 'Discussion 3', image: 'https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill' },
    { id: 4, title: 'Discussion 4', image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/08/reasons-to-eat-real-food-1200x628-facebook-1200x628.jpg' },
    { id: 5, title: 'Discussion 5', image: 'https://www.cdc.gov/foodsafety/images/comms/features/GettyImages-520363077-medium.jpg?_=58727' },
    { id: 6, title: 'Discussion 6', image: 'https://www.healthifyme.com/blog/wp-content/uploads/2022/01/Junk-Food-More-Harm-and-Lesser-Well-being.jpeg' },
    { id: 7, title: 'Discussion 7', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=768,574' },
    { id: 8, title: 'Discussion 8', image: 'https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg' },
    { id: 9, title: 'Discussion 9', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: 10, title: 'Discussion 10', image: 'https://honehealth.com/wp-content/uploads/2023/06/high-protein-fast-food-1.webp' },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionImage, setNewDiscussionImage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) { // Right arrow key
        setActiveIndex((prevIndex) => (prevIndex + 1) % discussions.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [discussions.length]);

  const nextDiscussion = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % discussions.length);
  };

  const prevDiscussion = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + discussions.length) % discussions.length);
  };

  const handleNewDiscussion = (e) => {
    e.preventDefault();
    if (newDiscussionTitle.trim() && newDiscussionImage.trim()) {
      const newDiscussion = {
        id: discussions.length + 1,
        title: newDiscussionTitle,
        image: newDiscussionImage,
      };
      setDiscussions([...discussions, newDiscussion]);
      setNewDiscussionTitle('');
      setNewDiscussionImage('');
    }
  };

  return (
    <div className="community-page">
      <h1>Community Page</h1>

      {/* Recipe Discussions Section */}
      <div className="discussion-section">
        <h2>Recipe Discussions</h2>
        <div className="discussion-slider">
          {discussions.map((discussion, index) => (
            <div key={discussion.id} className={`discussion-card ${index === activeIndex ? 'active' : ''}`}>
              {index === activeIndex && (
                <Link to={`/discussion/${discussion.id}`}>
                  <img src={discussion.image} alt={discussion.title} style={{ width: '300px', height: '200px' }} />
                  <h3>{discussion.title}</h3>
                </Link>
              )}
            </div>
          ))}
          <button className="prev" onClick={prevDiscussion}>&#10094;</button>
          <button className="next" onClick={nextDiscussion}>&#10095;</button>
        </div>
      </div>

      {/* New Discussion Form Section */}
      <div className="new-discussion-form">
        <h2>New Discussion</h2>
        <form onSubmit={handleNewDiscussion}>
          <div className="inputBox">
            <input type="text" placeholder="Discussion Title" value={newDiscussionTitle} onChange={(e) => setNewDiscussionTitle(e.target.value)} />
          </div>
          <div className="inputBox">
            <input type="text" placeholder="Image URL" value={newDiscussionImage} onChange={(e) => setNewDiscussionImage(e.target.value)} />
          </div>
          <button type="submit" className="register-button">Add Discussion</button>
        </form>
      </div>

      {/* Additional Sections */}
      {/* Add more sections for discussions or features */}
    </div>
  );
}

export default CommunityPage;
