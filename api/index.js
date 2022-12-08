const app = require('./App');
const PORT = process.env.API_PORT || 3001 ;

app.listen(PORT, () => {
    console.log(`API up on :${PORT}`);
});