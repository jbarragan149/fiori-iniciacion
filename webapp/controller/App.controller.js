sap.ui.define([
    'sap/ui/core/mvc/Controller',
], 
/**
 * 
 * @param {*} Controller 

 */
function(Controller) {
    return Controller.extend("logaligroup.sapui5.controller.App", {        
        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },
        onOpenDialogHeader: function() {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});