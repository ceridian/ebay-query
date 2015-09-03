"use strict";

module.exports = function(sequelize, DataTypes) {
	var TOKENS = sequelize.define('TOKENS', {
		token: { type: DataTypes.STRING, allowNull: false },
		domain: { type: DataTypes.STRING, allowNull: false },
	}, {
		classMethods: {
			associate: function(models){
				TOKENS.belongsTo(models.STORES);
			}
		}
	});
	return TOKENS;
};
