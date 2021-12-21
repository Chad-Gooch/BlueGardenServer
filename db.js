const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL,
    {dialect: 'postgres',
    ssl:PerformanceObserverEntryList.env.ENVIRONMENT === 'prduction'}
    );

module.exports = sequelize;