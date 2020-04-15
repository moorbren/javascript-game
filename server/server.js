const express = require('express')
const app = express()
const port = 3000

app.use(express.static('assets'));
app.use(express.static('server/public'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))