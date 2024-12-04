const app = require('./app'); // Import the configured app
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
