from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'YOUR_FIREBASE_DATABASE_URL'  # Replace with your Firebase URL
})

# Get reference to the root of your database
ref = db.reference('expenses')

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    expenses = ref.get()
    if expenses is None:
        return jsonify([])
    return jsonify([
        {**expense, 'id': expense_id}
        for expense_id, expense in expenses.items()
    ])

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    new_expense = {
        'description': data['description'],
        'amount': float(data['amount']),
        'category': data['category'],
        'date': datetime.utcnow().isoformat()
    }
    
    # Push the new expense to Firebase
    new_ref = ref.push(new_expense)
    return jsonify({'message': 'Expense added successfully', 'id': new_ref.key})

if __name__ == '__main__':
    app.run(debug=True)