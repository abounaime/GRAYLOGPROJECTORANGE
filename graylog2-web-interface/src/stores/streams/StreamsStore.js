"use strict";
var UserNotification = require('util/UserNotification');
var URLUtils = require('util/URLUtils');
var ApiRoutes = require('routing/ApiRoutes');
var fetch = require('logic/rest/FetchProvider').default;
var lodash = require('lodash');
var StreamsStore = (function () {
    function StreamsStore() {
        this.callbacks = [];
    }
    StreamsStore.prototype.listStreamsForAllUsers = function () {
        var url = "/streams/list";
        var promise = fetch('GET', URLUtils.qualifyUrl(url))
            .then(function (result) { return result.streams; })
            .catch(function (errorThrown) {
            UserNotification.error("Loading streams failed with status: " + errorThrown, "Could not load streams");
        });
        return promise;
    };
    StreamsStore.prototype.listStreams = function () {
        var url = "/streams";
        var promise = fetch('GET', URLUtils.qualifyUrl(url))
            .then(function (result) { return result.streams; })
            .catch(function (errorThrown) {
            UserNotification.error("Loading streams failed with status: " + errorThrown, "Could not load streams");
        });
        return promise;
    };
    StreamsStore.prototype.load = function (callback) {
        this.listStreams().then(function (streams) {
            callback(streams);
        });
    };
    StreamsStore.prototype.get = function (streamId, callback) {
        var failCallback = function (errorThrown) {
            UserNotification.error("Loading Stream failed with status: " + errorThrown, "Could not retrieve Stream");
        };
        var url = ApiRoutes.StreamsApiController.get(streamId).url;
        fetch('GET', URLUtils.qualifyUrl(url)).then(callback, failCallback);
    };
    StreamsStore.prototype.remove = function (streamId, callback) {
        var failCallback = function (errorThrown) {
            UserNotification.error("Removing Stream failed with status: " + errorThrown, "Could not remove Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.delete(streamId).url);
        fetch('DELETE', url).then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.pause = function (streamId, callback) {
        var _this = this;
        var failCallback = function (errorThrown) {
            UserNotification.error("Pausing Stream failed with status: " + errorThrown, "Could not pause Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.pause(streamId).url);
        return fetch('POST', url)
            .then(callback, failCallback)
            .then(function (response) {
            _this._emitChange();
            return response;
        });
    };
    StreamsStore.prototype.resume = function (streamId, callback) {
        var _this = this;
        var failCallback = function (errorThrown) {
            UserNotification.error("Resuming Stream failed with status: " + errorThrown, "Could not resume Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.resume(streamId).url);
        return fetch('POST', url)
            .then(callback, failCallback)
            .then(function (response) {
            _this._emitChange();
            return response;
        });
    };
    StreamsStore.prototype.save = function (stream, callback) {
        var failCallback = function (errorThrown) {
            UserNotification.error("Saving Stream failed with status: " + errorThrown, "Could not save Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.create().url);
        fetch('POST', url, stream)
            .then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.update = function (streamId, data, callback) {
        var failCallback = function (errorThrown) {
            UserNotification.error("Updating Stream failed with status: " + errorThrown, "Could not update Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.update(streamId).url);
        fetch('PUT', url, data)
            .then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.modif = function (streamId, data, callback) {

      var failCallback = function (errorThrown) {

            UserNotification.error("Updating Stream failed with status: " + errorThrown, "Could not update Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.modif(streamId).url);
        fetch('PUT', url, data)
            .then(callback, failCallback).then(this._emitChange.bind(this));
    };
  StreamsStore.prototype.addToFav = function (streamId, data, callback) {

    var failCallback = function (errorThrown) {
      UserNotification.error("Updating Stream failed with status: " + errorThrown, "Could not update Stream");
    };
    var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.addToFav(streamId).url);
    fetch('PUT', url, data)
      .then(callback, failCallback).then(this._emitChange.bind(this));
  };
    StreamsStore.prototype.cloneStream = function (streamId, data, callback) {
        var failCallback = function (errorThrown) {
            UserNotification.error("Cloning Stream failed with status: " + errorThrown, "Could not clone Stream");
        };
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.cloneStream(streamId).url);
        fetch('POST', url, data)
            .then(callback, failCallback).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.removeOutput = function (streamId, outputId, callback) {
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamOutputsApiController.delete(streamId, outputId).url);
        fetch('DELETE', url).then(callback, function (errorThrown) {
            UserNotification.error("Removing output from stream failed with status: " + errorThrown, "Could not remove output from stream");
        }).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.addOutput = function (streamId, outputId, callback) {
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamOutputsApiController.add(streamId, outputId).url);
        fetch('POST', url, { outputs: [outputId] }).then(callback, function (errorThrown) {
            UserNotification.error("Adding output to stream failed with status: " + errorThrown, "Could not add output to stream");
        }).then(this._emitChange.bind(this));
    };
    StreamsStore.prototype.testMatch = function (streamId, message, callback) {
        var url = URLUtils.qualifyUrl(ApiRoutes.StreamsApiController.testMatch(streamId).url);
        fetch('POST', url, message).then(callback, function (error) {
            UserNotification.error("Testing stream rules of stream failed with status: " + error.message, "Could not test stream rules of stream");
        });
    };
    StreamsStore.prototype.onChange = function (callback) {
        this.callbacks.push(callback);
    };
    StreamsStore.prototype._emitChange = function () {
        this.callbacks.forEach(function (callback) { return callback(); });
    };
    StreamsStore.prototype.unregister = function (callback) {
        lodash.pull(this.callbacks, callback);
    };
    return StreamsStore;
}());
var streamsStore = new StreamsStore();
module.exports = streamsStore;
//# sourceMappingURL=StreamsStore.js.map
