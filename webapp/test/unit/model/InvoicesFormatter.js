/* eslint-disable no-undef */
//@ts-nocheck
sap.ui.define([
    "logaligroup/sapui5/models/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
/**
 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
 */
function(InvoicesFormatter, ResourceModel) {
    QUnit.module("Qnvoices Status", {
        beforeEach: function () {
            this._oResourceModel = new ResourceModel({
                bundleUrl: sap.ui.require.toUrl("logaligroup/sapui5") + "/i18n/i18n.properties"
            });
        },

        afterEach: function() {
            this._oResourceModel.destroy();
        }
    });

    QUnit.test("Should return the Invoice Status", function(assert){
        let oModel = this.stub();

        oModel.withArgs("i18n").returns(this._oResourceModel);

        let oViewStub = {
            getModel : oModel
        };

        let oControllerStub = {
            getView : this.stub().returns(oViewStub)
        };

        let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

        //Assert
        assert.strictEqual(fnIsolatedFormatter("A"), "New", "The invoice Status for A is correct");
        assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The invoice Status for B is correct");
        assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The invoice Status for C is correct");
    })
}
)
