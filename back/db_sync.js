const db = require('./models');
db.sequelize
    .sync({
        alter: true,
    })
    .then(() => {
        console.log('db sync 성공');
    })
    .catch(console.error);
