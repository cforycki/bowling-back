var express = require('express');
var app = express();
app.use('/api/games', require('./routes/games'));
app.listen(3000, function () {
    console.log('Listening on port 3000...');
});
