
// Enviorment Variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// Dependencies
const cors = require("cors")
const app = require("./server.js")
const homeRoutes = require("./src/routes/home")
app.use(cors())

const PORT = process.env.PORT || 5000
// Routes Middleware
app.use("/api/v1", homeRoutes)





app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }))
app.listen(PORT, () => { console.log(`server is running on http://localhost:${PORT}`) })