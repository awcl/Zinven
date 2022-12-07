const app = require('./App');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Api up on :${PORT}`);
});