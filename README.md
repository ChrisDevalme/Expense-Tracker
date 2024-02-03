# Expense Tracker Api

This Expense Tracker app is a developer-friendly solution for implementing financial tracking systems. This application focuses on manual transaction inputs and user authentication. It's designed with simplicity in mind, making it easy for developers to integrate a solid foundation for crafting intuitive financial management systems.

## Installing

1) Start by cloning the git reposirory:

```
git clone git@github.com:ChrisDevalme/Expense-Tracker.git
```

2) Create .env file:

```
touch .env
```

3) Connect MONGO_URI & SECRET inside .env file:

```
MONGO_URI= "......"
SECRET= "......"
```
4) install dependencies:

```
npm i or npm install
```

5) start the program:

```
npm run dev
```

## Understanding the code 

I've divided the models into 2 models: Users & Transaction
``` javascript
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    transactions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Transaction'
    }]
})
```
``` javascript
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, default: "income", enum: ["expense", "income"], required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }
)
```
This allows for a one to many relationship letting every user have many transactions.
The User conroller handles loging in a user. While the transaction model tracks each income and expense transaction.


### As for the controllers /user path controls everything User related: 
```javascript
// Create a User
router.post('/', userCrtl.create)

// logs a User in 
router.post('/login', userCrtl.loginUser)

// Dispalys 1 User
router.get('/:id', userCrtl.show)

// Updates a user 
router.put('/:id', userCrtl.updateUser)

// List all Users transactions
router.get('/:userId/transaction', userCrtl.transactionIndex)

// Deletes a user
router.delete('/:id', userCrtl.authorizeUser, userCrtl.deleteUser)
```

### The /transaction path controls everything Transactioon related:
```javascript
// Creates a Transaction
router.post('/income', income.createIncome)
router.post('/expense', expense.createExpense)

// Lists all Transactions
router.get('/income', income.incomeIndex) // blah.com/transactions/income
router.get('/expense', expense.expenseIndex)

// Shows 1 transaction
router.get('/inocome/:id', income.showIncome)
router.get('/expense/:id', expense.showExpense)

// Updates a transaction
router.put('/income/:id', income.updateIncome)
router.put('/expense/:id', expense.updateExpense)

// Deletes an Transaction
router.delete('/income/:id', income.deleteIncome)
router.delete('/expense/:id', expense.deleteExpense)
```

### Testing 
```
npm run test
```
Here are seed examples you can use sample inputs you can use for testing purposes: 
```
npm run seed
```
User:
```JSON
{
    "userName": "James Brown",
    "email": "jbrown@gmail.com",
    "password": "123456"
}
```
Transaction: 
```JSON
{
    "amount": "15000",
    "type": "expense",
    "category": "entertainment",
    "description": "Date Night",
    "date": "1/12/12",
    "userId": "65b31c6d20500463337ec17b"
}
```
## Models Wireframe

<img src="/imports/expense-tracker(EMD).png "/>
