"use strict";

module.exports = function(sequelize, DataTypes) {
	var STORES = sequelize.define('STORES', {
    storeName: { type: DataTypes.STRING, allowNull: false },
		type: { type: DataTypes.STRING, allowNull: false },
		accountName: { type: DataTypes.STRING, allowNull: false },
	}, {
		classMethods: {
			associate: function(models){
				STORES.hasOne(models.INFO, {as: 'storeID'});
        STORES.hasOne(models.TOKENS, {as: 'storeID'});
			}
		}
	});
	return STORES;
};
