from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the PostgreSQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Toronto123@localhost/budgetuwat'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define a model
class BudgetItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

# Create the database and tables
with app.app_context():
    db.create_all()

    # Define the initial budgeting data
    initial_data = [
        {'category': 'Groceries', 'amount': 200.0, 'date': '2023-01-01'},
        {'category': 'Rent', 'amount': 1000.0, 'date': '2023-01-01'},
        {'category': 'Utilities', 'amount': 150.0, 'date': '2023-01-01'},
        {'category': 'Entertainment', 'amount': 100.0, 'date': '2023-01-01'},
        {'category': 'Savings', 'amount': 300.0, 'date': '2023-01-01'}
    ]

    # Function to seed the database
    def seed_database():
        for item in initial_data:
            budget_item = BudgetItem(
                category=item['category'],
                amount=item['amount'],
                date=item['date']
            )
            db.session.add(budget_item)
        db.session.commit()

    # Seed the database
    seed_database()

# API endpoint to fetch data
@app.route('/api/data', methods=['GET'])
def get_data():
    data = BudgetItem.query.all()
    result = [{'id': item.id, 'category': item.category, 'amount': item.amount, 'date': item.date} for item in data]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)