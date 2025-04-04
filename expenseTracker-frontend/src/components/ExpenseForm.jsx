import { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];

function ExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({ description: '', amount: '', category: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <TextField
        fullWidth
        label="Description"
        value={expense.description}
        onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        select
        label="Category"
        value={expense.category}
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        margin="normal"
        required
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Expense
      </Button>
    </Box>
  );
}

export default ExpenseForm;