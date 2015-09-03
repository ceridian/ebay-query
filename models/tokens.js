"use strict";

module.exports = function(sequelize, DataTypes) {
	var TOKENS = sequelize.define('TOKENS', {
		token: { type: DataTypes.STRING, allowNull: false },
		expires: { type: DataTypes.DATE, allowNull: false }
	}, {
		classMethods: {
			associate: function(models){
				TOKENS.belongsTo(models.STORES, {foreignKey: 'storeID'});
			}
		}
	});
	return TOKENS;
};
