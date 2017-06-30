/// <reference path="../../../declarations/bluebird/bluebird.d.ts" />
"use strict";
var UserNotification = require('util/UserNotification');
var URLUtils = require('util/URLUtils');
var ApiRoutes = require('routing/ApiRoutes');
var fetch = require('logic/rest/FetchProvider').default;
exports.UsersStore = {
    editUserFormUrl: function (username) {
        return URLUtils.qualifyUrl("/system/users/edit/" + username);
    },
    create: function (request) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.create().url);
        var promise = fetch('POST', url, request);
        return promise;
    },
    loadUsers: function () {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.list().url);
        var promise = fetch('GET', url)
            .then(function (response) { return response.users; }, function (error) {
            if (error.additional.status !== 404) {
                UserNotification.error("Loading user list failed with status: " + error, "Could not load user list");
            }
        });
        return promise;
    },
    load: function (username) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.load(encodeURIComponent(username)).url);
        var promise = fetch('GET', url);
        promise.catch(function (error) {
            UserNotification.error("Loading user failed with status: " + error, "Could not load user " + username);
        });
        return promise;
    },
    deleteUser: function (username) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.delete(encodeURIComponent(username)).url);
        var promise = fetch('DELETE', url);
        promise.then(function () {
            UserNotification.success("User \"" + username + "\" was deleted successfully");
        }, function (error) {
            if (error.additional.status !== 404) {
                UserNotification.error("Delete user failed with status: " + error, "Could not delete user");
            }
        });
        return promise;
    },
    updateRoles: function (username, roles) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.update(encodeURIComponent(username)).url);
        var promise = fetch('PUT', url, { roles: roles });
        return promise;
    },
    changePassword: function (username, request) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.changePassword(encodeURIComponent(username)).url);
        var promise = fetch('PUT', url, request);
        return promise;
    },
    update: function (username, request) {
        var url = URLUtils.qualifyUrl(ApiRoutes.UsersApiController.update(encodeURIComponent(username)).url);
        var promise = fetch('PUT', url, request);
        return promise;
    },
};
module.exports = exports.UsersStore;
//# sourceMappingURL=UsersStore.js.map