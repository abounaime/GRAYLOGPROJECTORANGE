"use strict";
var ApiRoutes = require('routing/ApiRoutes');
var UserNotification = require('util/UserNotification');
var URLUtils = require('util/URLUtils');
var fetch = require('logic/rest/FetchProvider').default;
var lodash = require('lodash');
var StreamRulesStore = (function () {
    function StreamRulesStore() {
        this.callbacks = [];
    }
    StreamRulesStore.prototype.types = function (callback) {
        var url = "/streams/null/rules/types";
        var promise = fetch('GET', URLUtils.qualifyUrl(url));
        return promise;
    };
    StreamRulesStore.prototype.list = function (streamId, callback) {
        var failCallback = function (error) {
            UserNotification.error("Fetching Stream Rules failed with status: " + error, "Could not retrieve Stream Rules");
        };
        fetch('GET', URLUtils.qualifyUrl(ApiRoutes.StreamRulesApiController.list(streamId).url)).then(callback, failCallback);
    };
    StreamRulesStore.prototype.update = function (streamId, streamRuleId, data, callback) {
        var failCallback = function (error) {
            UserNotification.error("Updating Stream Rule failed with status: " + error, "Could not update Stream Rule");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamRulesApiController.update(streamId, streamRuleId).url);
        var request = { field: data.field, type: data.type, value: data.value, inverted: data.inverted, description: data.description };
        fetch('PUT', url, request).then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamRulesStore.prototype.remove = function (streamId, streamRuleId, callback) {
        var failCallback = function (error) {
            UserNotification.error("Deleting Stream Rule failed with status: " + error, "Could not delete Stream Rule");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamRulesApiController.delete(streamId, streamRuleId).url);
        fetch('DELETE', url).then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamRulesStore.prototype.create = function (streamId, data, callback) {
        var failCallback = function (error) {
            UserNotification.error("Creating Stream Rule failed with status: " + error, "Could not create Stream Rule");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamRulesApiController.create(streamId).url);
        fetch('POST', url, data).then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamRulesStore.prototype.onChange = function (callback) {
        this.callbacks.push(callback);
    };
    StreamRulesStore.prototype._emitChange = function () {
        this.callbacks.forEach(function (callback) { return callback(); });
    };
    StreamRulesStore.prototype.unregister = function (callback) {
        lodash.pull(this.callbacks, callback);
    };
    return StreamRulesStore;
}());
var streamRulesStore = new StreamRulesStore();
module.exports = streamRulesStore;
