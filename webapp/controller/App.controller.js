sap.ui.define([
    'sap/ui/core/mvc/Controller',
], 
/**
 * 
 * @param {*} Controller 

 */
function(Controller) {
    return Controller.extend("logaligroup.sapui5.controller.App", {
        onInit: function(){            
            
        },
        onOpenDialogHeader: function() {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});