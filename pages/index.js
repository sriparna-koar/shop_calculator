

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Calculator from '../components/Calculator';


// const IndexPage = () => {
//   const [users, setUsers] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [time, setTime] = useState('');
//   const [totalPrice, setTotalPrice] = useState();
//   const [date, setDate] = useState('');
//   const [showSearch, setShowSearch] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('/api/users');
//       setUsers(res.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/users', { name, location, time, date, totalPrice });
//       fetchUsers();
//       clearInputs();
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get(`/api/search?name=${name}`);
//       setSearchResults(res.data);
//     } catch (error) {
//       console.error('Error searching user:', error);
//     }
//   };

//   const clearInputs = () => {
//     setName('');
//     setLocation('');
//     setTime('');
//     setDate('');
//     setTotalPrice(0);
//   };

//   return (
//     <div className="container">
//       <div>
//         <h1 className="title">Calculator</h1>
//         <Calculator />
//       </div>
//       <h1 className="title">User Management</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//         <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
//         <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
//         <input type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} placeholder="Total Price" />
//         <input 
//   type="date" 
//   value={date} 
//   onChange={(e) => setDate(e.target.value)} 
// />






//         <button type="submit" className="btn">Add User</button>
//       </form>
//       <div className="search-container">
//         <button className="toggle-btn" onClick={() => setShowSearch(!showSearch)}>
//           {showSearch ? 'Hide Search' : 'Show Search'}
//           <span className={showSearch ? 'arrow-up' : 'arrow-down'}></span>
//         </button>
//         {showSearch && (
//           <form onSubmit={handleSearch} className="search-form">
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search by Name" />
//             <button type="submit" className="btn">Search</button>
//           </form>
//         )}
//       </div>
//       <h2 className="title">Search Results:</h2>
//       <ul>
//         {searchResults.map(user => (
//           <li key={user._id}>
//             <p>Name: {user.name}</p>
//             <p>Location: {user.location}</p>
//             <p>Time: {user.time}</p>
//             <p>Price: {user.totalPrice}</p>
//             <p>Date: {user.date ? new Date(user.date).toISOString().split('T')[0] : ''}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default IndexPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calculator from '../components/Calculator';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    fontSize: 12,
  },
});

const IndexPage = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [totalPrice, setTotalPrice] = useState();
  const [date, setDate] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchUsers();
   
    document.addEventListener('mousemove', handleMouseMove);
    return () => {

      document.removeEventListener('mousemove', handleMouseMove);
    };
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
  const handleMouseMove = (e) => {
    const numBubbles = 10; 
    for (let i = 0; i < numBubbles; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.left = `${e.pageX}px`;
      bubble.style.top = `${e.pageY}px`;
      document.body.appendChild(bubble);
      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }
  };
  
  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map(user => (
          <View key={user._id} style={styles.section}>
            <Text>Name: {user.name}</Text>
            <Text>Location: {user.location}</Text>
            <Text>Time: {user.time}</Text>
            <Text>Price: {user.totalPrice}</Text>
            <Text>Date: {user.date ? new Date(user.date).toISOString().split('T')[0] : ''}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="container">
      <div>
      <div className="header">
        <h1 className="main-title">Vendor Bill Shop</h1>
      </div>
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
<div className="submit-container">
          <button type="submit" className="btn">Add User</button>
        </div>
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
      {searchResults.length > 0 && (
        <PDFDownloadLink document={<MyDocument data={searchResults} fileName={name.replace(/\s+/g, '_') + '_search_results.pdf'} />} fileName={name.replace(/\s+/g, '_') + '_search_results.pdf'}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default IndexPage;
