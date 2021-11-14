require("dotenv").config({ path: ".env" })

const express = require("express")
const app = express()
const PORT = process.env.PORT || 9865

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(bodyParser.json())

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to the Database"))

app.use(express.static("public"))

//Route for the books restAPI
const booksRouter = require("./routes/books")
app.use("/books", booksRouter)

//Route for the users restAPI
const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
