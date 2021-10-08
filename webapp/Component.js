sap.ui.define([
    'sap/ui/core/UIComponent',
    'logaligroup/sapui5/models/models',
    'sap/ui/model/resource/ResourceModel'
], function (UIComponent, models, ResourceModel) {    
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
        }
    })
});