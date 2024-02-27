import React, { useState } from 'react';
import Button from './Button';


const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult('Error');
    }
  };

  const handleOperation = (operation) => {
    setInput(input + operation);
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      width: '300px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {input}
      </div>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {result}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button onClick={() => handleInput('1')} text="1" />
        <Button onClick={() => handleInput('2')} text="2" />
        <Button onClick={() => handleInput('3')} text="3" />
        <Button onClick={() => handleOperation('+')} text="+" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button onClick={() => handleInput('4')} text="4" />
        <Button onClick={() => handleInput('5')} text="5" />
        <Button onClick={() => handleInput('6')} text="6" />
        <Button onClick={() => handleOperation('-')} text="-" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button onClick={() => handleInput('7')} text="7" />
        <Button onClick={() => handleInput('8')} text="8" />
        <Button onClick={() => handleInput('9')} text="9" />
        <Button onClick={() => handleOperation('*')} text="*" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button onClick={() => handleInput('0')} text="0" />
        <Button onClick={handleClear} text="C" />
        <Button onClick={handleCalculate} text="=" />
        <Button onClick={() => handleOperation('/')} text="/" />
      </div>
    </div>
  );
};

export default Calculator;
