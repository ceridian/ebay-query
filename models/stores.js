"use strict";

module.exports = function(sequelize, DataTypes) {
	var STORES = sequelize.define('STORES', {
    storeName: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false },
		accountName: { type: DataTypes.STRING, allowNull: false },
	}, {
		classMethods: {
			associate: function(models){
				STORES.hasOne(models.INFO, {foreignKey: 'storeID'});
        STORES.hasOne(models.TOKENS, {foreignKey: 'storeID'});
			}
		}
	});
	return STORES;
};
