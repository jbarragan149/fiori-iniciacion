sap.ui.define([
    'sap/ui/core/UIComponent',
    'logaligroup/sapui5/models/models',
    'sap/ui/model/resource/ResourceModel',
    './controller/HelloDialog'
], function (UIComponent, models, ResourceModel, HelloDialog) {    
    return UIComponent.extend("logaligroup.sapui5.Component", {
        metadata: {
            manifest : "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);            
            this.setModel(models.createRecipient());
        
            //set i18n model
            const i18nModel = new ResourceModel({ bundleName : "logaligroup.sapui5.i18n.i18n"});
            this.setModel(i18nModel, "i18n");
                
            this._helloDialog = new HelloDialog(this.getRootControl());
        },
        exit: function() {
             this._helloDialog.destroy();
             delete this._helloDialog;
        },
        openHelloDialog: function() {
            this._helloDialog.open();
        }
    })
});