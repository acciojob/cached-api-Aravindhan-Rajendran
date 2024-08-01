import React, { useState, useEffect, useMemo } from "react";
import './../styles/App.css';
import 'regenerator-runtime/runtime';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Memoize the data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="data-container">
      <h1>Posts</h1>
      <ul>
        {memoizedData.map(post => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
