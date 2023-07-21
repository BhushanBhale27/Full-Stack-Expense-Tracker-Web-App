const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense")

router.post('/addexpense', expenseController.addexpense )

router.get('/getexpenses' ,  expenseController.getexpenses )

router.delete('/deleteexpense/:expenseid', expenseController.deleteexpense)



module.exports = router
