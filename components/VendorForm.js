import { useState } from 'react';

const VendorForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, price: parseFloat(price) }; // Convert price to number
    onAddItem(newItem);
    setName('');
    setPrice('');
    alert('Item added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default VendorForm;
