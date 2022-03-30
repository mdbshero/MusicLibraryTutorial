//imports
const express = require("express");
const app = express();


//Middleware
app.use(express.json());


// Starting a Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running, student! On PORT: ${PORT}`);
});