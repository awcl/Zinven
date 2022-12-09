const app = require('./App');
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`API up on :${PORT}`);
});