//@ts-nocheck
sap.ui.define([
    'sap/ui/core/util/MockServer',
    'sap/ui/model/json/JSONModel',
    'sap/base/util/UriParameters',
    'sap/base/Log'
],
    /**
     * 
     * @param { typeof sap.ui.core.util.MockServer} MockServer 
     * @param { typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param { typeof sap.ui.base.util.UriParameters} UriParameters
     * @param { typeof sap.base.Log} Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        'use strict';

        var oMockServer, _sAppPath = "logaligroup/sapui5/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {
            /**
             * Initializes the mock server asynchronously
             * @protected
             * @param {object} oOptionsParameter 
             * @returns{Promise} a promise that is resolved when de mock server is started
             */
            init: function (oOptionsParameter) {
                var oOptions = oOptionsParameter || {};

                return new Promise(function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //parse manifest for local metadata URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetaDataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //ensure there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //crear una instancia mock server o detener la existente para reiniciar
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        };

                        //configurara mock server con valores por defecto
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        //simulate all request
                        oMockServer.simulate(sMetaDataUrl, {
                            sMockdataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequest = oMockServer.getRequests();

                        //COMPOse an error response para cada request
                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.respond(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            }
                        };

                        //simular metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                }
                            });
                        };

                        //simular request errors
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        //SET REQUEST and start the server
                        oMockServer.setRequests(aRequest);
                        oMockServer.start();

                        Log.info("Running the app with mock data");
                        fnResolve();
                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load the application manifest";

                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });
            }
        };
        return oMockServerInterface;

    });