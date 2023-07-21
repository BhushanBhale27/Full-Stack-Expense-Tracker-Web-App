const express = require("express")
const cors = require("cors")
const sequelize = require("./database/database")

const app = express()

app.use(cors())
app.use(express.json())

const userRoutes = require("./routes/users")
const expenseRoutes = require("./routes/expense")

app.use("/users" , userRoutes)
app.use('/expense' , expenseRoutes)


sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
