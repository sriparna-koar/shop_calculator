

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calculator from '../components/Calculator';


const IndexPage = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', { name, location, time, date, totalPrice });
      fetchUsers();
      clearInputs();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/search?name=${name}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const clearInputs = () => {
    setName('');
    setLocation('');
    setTime('');
    setDate('');
    setTotalPrice(0);
  };

  return (
    <div className="container">
      <div>
        <h1 className="title">Calculator</h1>
        <Calculator />
      </div>
      <h1 className="title">User Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
        <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} placeholder="Total Price" />
        <input 
  type="date" 
  value={date} 
  onChange={(e) => setDate(e.target.value)} 
/>






        <button type="submit" className="btn">Add User</button>
      </form>
      <div className="search-container">
        <button className="toggle-btn" onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? 'Hide Search' : 'Show Search'}
          <span className={showSearch ? 'arrow-up' : 'arrow-down'}></span>
        </button>
        {showSearch && (
          <form onSubmit={handleSearch} className="search-form">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search by Name" />
            <button type="submit" className="btn">Search</button>
          </form>
        )}
      </div>
      <h2 className="title">Search Results:</h2>
      <ul>
        {searchResults.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Location: {user.location}</p>
            <p>Time: {user.time}</p>
            <p>Price: {user.totalPrice}</p>
            <p>Date: {user.date ? new Date(user.date).toISOString().split('T')[0] : ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
