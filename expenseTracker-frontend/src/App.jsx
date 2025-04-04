import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await axios.post('http://localhost:5000/api/expenses', expenseData);
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ m: 2, textAlign: 'center' }}>
        Expense Tracker
      </Typography>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </Container>
  );
}

export default App;