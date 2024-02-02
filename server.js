require('dotenv').config()
require('./seed/database')
const app = require('./app')
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`We in the building ${PORT}`)
})