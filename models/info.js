"use strict";

module.exports = function(sequelize, DataTypes) {
	var INFO = sequelize.define('INFO', {
		container: { type: DataTypes.STRING, allowNull: false },
		domain: { type: DataTypes.STRING, allowNull: false },
	}, {
		classMethods: {
			associate: function(models){
				INFO.belongsTo(models.STORES);
			}
		}
	});
	return INFO;
};
