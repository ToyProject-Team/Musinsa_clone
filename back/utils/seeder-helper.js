module.exports.truncateForce = async (queryInterface, tableName) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null);
    await queryInterface.sequelize.query(`TRUNCATE TABLE ${tableName}`);
    await queryInterface.sequelize.query(
        `ALTER TABLE ${tableName} AUTO_INCREMENT = 1`,
    );
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null);
};
