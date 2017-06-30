/// <reference path="../../../declarations/bluebird/bluebird.d.ts" />
"use strict";
var ApiRoutes_1 = require('routing/ApiRoutes');
var fetch = require('logic/rest/FetchProvider').default;
var UserNotification_1 = require("util/UserNotification");
var URLUtils_1 = require('util/URLUtils');
var ToolsStore = {
    testNaturalDate: function (text) {
        var url = ApiRoutes_1.default.ToolsApiController.naturalDateTest(text).url;
        var promise = fetch('GET', URLUtils_1.default.qualifyUrl(url));
        promise.catch(function (errorThrown) {
            if (errorThrown.additional.status !== 422) {
                UserNotification_1.default.error("Loading keyword preview failed with status: " + errorThrown, "Could not load keyword preview");
            }
        });
        return promise;
    },
    testGrok: function (pattern, namedCapturesOnly, string) {
        var url = ApiRoutes_1.default.ToolsApiController.grokTest().url;
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), { pattern: pattern, string: string, named_captures_only: namedCapturesOnly });
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'We were not able to run the grok extraction. Please check your parameters.');
        });
        return promise;
    },
    testJSON: function (flatten, listSeparator, keySeparator, kvSeparator, replaceKeyWhitespace, keyWhitespaceReplacement, keyPrefix, string) {
        var url = ApiRoutes_1.default.ToolsApiController.jsonTest().url;
        var payload = {
            flatten: flatten,
            list_separator: listSeparator,
            key_separator: keySeparator,
            kv_separator: kvSeparator,
            replace_key_whitespace: replaceKeyWhitespace,
            key_whitespace_replacement: keyWhitespaceReplacement,
            key_prefix: keyPrefix,
            string: string,
        };
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), payload);
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'We were not able to run the JSON extraction. Please check your parameters.');
        });
        return promise;
    },
    testRegex: function (regex, string) {
        var url = ApiRoutes_1.default.ToolsApiController.regexTest().url;
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), { regex: regex, string: string });
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'Could not try regular expression. Make sure that it is valid.');
        });
        return promise;
    },
    testRegexReplace: function (regex, replacement, replaceAll, string) {
        var url = ApiRoutes_1.default.ToolsApiController.regexReplaceTest().url;
        var payload = {
            regex: regex,
            replacement: replacement,
            replace_all: replaceAll,
            string: string
        };
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), payload);
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'Could not try regular expression. Make sure that it is valid.');
        });
        return promise;
    },
    testSplitAndIndex: function (splitBy, index, string) {
        var url = ApiRoutes_1.default.ToolsApiController.splitAndIndexTest().url;
        var payload = {
            split_by: splitBy,
            index: index,
            string: string,
        };
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), payload);
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'We were not able to run the split and index extraction. Please check your parameters.');
        });
        return promise;
    },
    testSubstring: function (beginIndex, endIndex, string) {
        var url = ApiRoutes_1.default.ToolsApiController.substringTest().url;
        var payload = {
            start: beginIndex,
            end: endIndex,
            string: string,
        };
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), payload);
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'We were not able to run the substring extraction. Please check index boundaries.');
        });
        return promise;
    },
    testContainsString: function (searchString, string) {
        var url = ApiRoutes_1.default.ToolsApiController.containsStringTest().url;
        var promise = fetch('POST', URLUtils_1.default.qualifyUrl(url), { search_string: searchString, string: string });
        promise.catch(function (errorThrown) {
            UserNotification_1.default.error('Details: ' + errorThrown, 'Could not check if field contains the string');
        });
        return promise;
    },
};
module.exports = ToolsStore;
//# sourceMappingURL=ToolsStore.js.map