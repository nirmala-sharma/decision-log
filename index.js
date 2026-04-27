require('dotenv').config();
const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

const userRoutes = require("./server/routes/user")
app.use("/users", userRoutes)

const decisionRoutes = require("./server/routes/decision")
app.use("/decisions", decisionRoutes)

const categoryRoutes = require("./server/routes/category")
app.use("/categories", categoryRoutes)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))