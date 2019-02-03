require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');
const PORT = process.env.PORT || 7890; 

app.listen(PORT, (a) => {
    // eslint-disable-next-line no-console
    console.log('running', PORT);
});
