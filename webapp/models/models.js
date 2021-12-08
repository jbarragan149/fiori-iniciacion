sap.ui.define([
    'sap/ui/model/json/JSONModel',
    'sap/ui/Device'
], function(JSONModel, Device) {
    'use strict';
    return {
        createRecipient: function() {            
           const oData = {
               recipient: {
                   name: "World onInit"
               }
           };
           return new JSONModel(oData);
        },

        createDeviceModel: function(){
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        }
    }
});