/// <reference path="../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../declarations/node/node.d.ts" />
/// <reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
'use strict';
var Immutable = require('immutable');
var Routes = require('routing/Routes');
var Qs = require('qs');
var URLUtils = require('util/URLUtils');
var moment = require('moment');
var history = require('util/History');
var DateTime = require('logic/datetimes/DateTime');
var SearchStore = (function () {
    function SearchStore() {
        var _this = this;
        this.load(true);
        window.addEventListener('resize', function () { return _this.width = window.innerWidth; });
    }
    SearchStore.prototype.load = function (firstLoad) {
        var parsedSearch = Immutable.Map(URLUtils.getParsedSearch(window.location));
        this.originalSearch = SearchStore._initializeOriginalSearch(parsedSearch);
        if (firstLoad) {
            this.query = this.originalSearch.get('query');
            this.rangeType = this.originalSearch.get('rangeType');
            this.rangeParams = this.originalSearch.get('rangeParams');
            this.page = this.originalSearch.get('page');
            this.resolution = this.originalSearch.get('resolution');
            this.highlightMessage = this.originalSearch.get('highlightMessage');
        }
        else {
            this._query = this.originalSearch.get('query');
            this._rangeType = this.originalSearch.get('rangeType');
            this._rangeParams = this.originalSearch.get('rangeParams');
            this._page = this.originalSearch.get('page');
            this._resolution = this.originalSearch.get('resolution');
            this._highlightMessage = this.originalSearch.get('highlightMessage');
        }
        this.savedSearch = this.originalSearch.get('saved');
        this.sortField = this.originalSearch.get('sortField');
        this.sortOrder = this.originalSearch.get('sortOrder');
        this.width = window.innerWidth;
    };
    SearchStore.prototype.unload = function () {
        var _this = this;
        window.removeEventListener('resize', function () { return _this.width = window.innerWidth; });
    };
    SearchStore.prototype.initializeFieldsFromHash = function () {
        var parsedSearch = Immutable.Map(URLUtils.getParsedSearch(window.location));
        var parsedHash = Immutable.Map(URLUtils.getParsedHash(window.location));
        var fieldsFromHash = parsedHash.get('fields');
        var fieldsFromQuery = parsedSearch.get('fields');
        if (fieldsFromHash === undefined) {
            // no hash value, fall back to query if present
            if (fieldsFromQuery === undefined) {
                // neither hash nor query set, fall back to defaults
                this.fields = Immutable.Set(['message', 'source']);
            }
            else {
                this.fields = Immutable.Set(fieldsFromQuery.split(','));
            }
        }
        else {
            // hash value, if present, always wins
            this.fields = Immutable.Set(fieldsFromHash.split(','));
        }
    };
    Object.defineProperty(SearchStore.prototype, "query", {
        /*
         * This returns the current search query introduced in the search bar. Use "originalQuery()" if you need the
         * query for the last executed search.
         */
        get: function () {
            return this._query;
        },
        set: function (newQuery) {
            this._query = newQuery;
            if (this.onParamsChanged !== undefined) {
                this.onParamsChanged(this.getParams());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "originalQuery", {
        get: function () {
            var query = this.originalSearch.get('query');
            return (query.length > 0 ? query : '*');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (newPage) {
            if (this._page === undefined) {
                this._page = newPage;
            }
            else {
                this._reloadSearchWithNewParam('page', newPage);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "rangeType", {
        /*
         * This returns the current range type introduced in the search bar. Use "originalRangeType()" if you need the
         * range type for the last executed search.
         */
        get: function () {
            return this._rangeType;
        },
        set: function (newRangeType) {
            this._rangeType = newRangeType;
            this.rangeParams = (this.originalSearch.get('rangeType') === newRangeType) ? this.originalSearch.get('rangeParams') : Immutable.Map();
            if (this.onParamsChanged !== undefined) {
                this.onParamsChanged(this.getParams());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "originalRangeType", {
        get: function () {
            return this.originalSearch.get('rangeType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "rangeParams", {
        /*
         * This returns the current range parameters introduced in the search bar. Use "originalRangeParams()" if you
         * need the range parameters for the last executed search.
         */
        get: function () {
            return this._rangeParams;
        },
        set: function (value) {
            this._rangeParams = value;
            if (this.onParamsChanged !== undefined) {
                this.onParamsChanged(this.getParams());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "originalRangeParams", {
        get: function () {
            return this.originalSearch.get('rangeParams');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "resolution", {
        get: function () {
            return this._resolution;
        },
        set: function (newResolution) {
            if (this._resolution === undefined) {
                this._resolution = newResolution;
            }
            else {
                this._reloadSearchWithNewParam('interval', newResolution);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (newFields) {
            // TODO: Add parameters once we know how to handle them
            //URLUtils.replaceHashParam('fields', newFields.join(','));
            this._fields = newFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchStore.prototype, "highlightMessage", {
        get: function () {
            return this._highlightMessage;
        },
        set: function (id) {
            this._highlightMessage = id;
        },
        enumerable: true,
        configurable: true
    });
    SearchStore.prototype.sort = function (sortField, sortOrder) {
        this._reloadSearchWithNewParams(Immutable.Map({ sortField: sortField, sortOrder: sortOrder }));
    };
    SearchStore._initializeOriginalSearch = function (parsedSearch) {
        var originalSearch = Immutable.Map();
        originalSearch = originalSearch.set('query', parsedSearch.get('q', ''));
        originalSearch = originalSearch.set('resolution', parsedSearch.get('interval'));
        originalSearch = originalSearch.set('page', Math.max(parsedSearch.get('page', 1), 1));
        originalSearch = originalSearch.set('rangeType', parsedSearch.get('rangetype', 'relative'));
        originalSearch = originalSearch.set('sortField', parsedSearch.get('sortField', 'timestamp'));
        originalSearch = originalSearch.set('sortOrder', parsedSearch.get('sortOrder', 'desc'));
        originalSearch = originalSearch.set('highlightMessage', parsedSearch.get('highlightMessage', ''));
        if (parsedSearch.get('saved') !== undefined) {
            originalSearch = originalSearch.set('saved', parsedSearch.get('saved'));
        }
        var rangeParams;
        switch (originalSearch.get('rangeType')) {
            case 'relative':
                rangeParams = Immutable.Map({ relative: Number(parsedSearch.get('relative', 5 * 60)) });
                break;
            case 'absolute':
                rangeParams = Immutable.Map({
                    from: parsedSearch.get('from', null),
                    to: parsedSearch.get('to', null)
                });
                break;
            case 'keyword':
                rangeParams = Immutable.Map({ keyword: parsedSearch.get('keyword', '') });
                break;
            default:
                throw ('Unsupported range type ' + originalSearch.get('rangeType'));
        }
        return originalSearch.set('rangeParams', rangeParams);
    };
    SearchStore.prototype.addSearchTerm = function (field, value, operator) {
        var effectiveValue = value;
        if (field === 'timestamp') {
            var dateTime = new DateTime(value).toTimeZone('UTC');
            effectiveValue = dateTime.toString(DateTime.Formats.TIMESTAMP);
        }
        var term = field + ":" + SearchStore.escape(effectiveValue);
        var effectiveOperator = operator || SearchStore.AND_OPERATOR;
        this.addQueryTerm(term, effectiveOperator);
    };
    SearchStore.prototype.changeTimeRange = function (newRangeType, newRangeParams) {
        this.rangeType = newRangeType;
        this.rangeParams = Immutable.fromJS(newRangeParams);
    };
    SearchStore.prototype._submitSearch = function (event) {
        if (this.onSubmitSearch !== undefined) {
            this.onSubmitSearch();
        }
    };
    SearchStore.prototype.savedSearchDeleted = function (savedSearchId) {
        if (savedSearchId === this.savedSearch) {
            this._submitSearch(null);
        }
    };
    SearchStore.isPhrase = function (searchTerm) {
        return String(searchTerm).indexOf(" ") !== -1;
    };
    SearchStore.escape = function (searchTerm) {
        var escapedTerm = String(searchTerm);
        // Replace newlines.
        escapedTerm = escapedTerm.replace(/\r\n/g, " ");
        escapedTerm = escapedTerm.replace(/\n/g, " ");
        escapedTerm = escapedTerm.replace(/<br>/g, " ");
        if (this.isPhrase(escapedTerm)) {
            escapedTerm = String(escapedTerm).replace(/\"/g, '\\"');
            escapedTerm = '"' + escapedTerm + '"';
        }
        else {
            // Escape all lucene special characters from the source: && || : \ / + - ! ( ) { } [ ] ^ " ~ * ?
            escapedTerm = String(escapedTerm).replace(/(&&|\|\||[\:\\\/\+\-\!\(\)\{\}\[\]\^\"\~\*\?])/g, "\\$&");
        }
        return escapedTerm;
    };
    SearchStore.prototype.queryContainsTerm = function (termInQuestion) {
        return this.query.indexOf(termInQuestion) != -1;
    };
    SearchStore.prototype.addQueryTerm = function (term, operator) {
        if (this.queryContainsTerm(term)) {
            return;
        }
        var newQuery = "";
        if (typeof operator !== 'undefined' && this.query !== "" && this.query !== "*") {
            newQuery = this.query + " " + operator + " ";
        }
        newQuery += term;
        this.query = newQuery;
        if (this.onAddQueryTerm !== undefined) {
            this.onAddQueryTerm();
        }
    };
    SearchStore.prototype.getParams = function () {
        return {
            query: this.query,
            rangeType: this.rangeType,
            rangeParams: this.rangeParams
        };
    };
    // Get initial search params, with names used in AJAX requests
    SearchStore.prototype.getOriginalSearchParams = function () {
        var originalParams = Immutable.Map();
        originalParams = originalParams.set('range_type', this.originalSearch.get('rangeType'));
        originalParams = originalParams.merge(this.originalSearch.get('rangeParams'));
        originalParams = originalParams.set('query', this.originalSearch.get('query'));
        originalParams = originalParams.set('interval', this.originalSearch.get('resolution'));
        if (this.searchInStream) {
            originalParams = originalParams.set('streamId', this.searchInStream.id);
        }
        return originalParams;
    };
    // Get initial search params with the current selected fields
    SearchStore.prototype.getOriginalSearchParamsWithFields = function () {
        var originalParams = this.getOriginalSearchParams();
        originalParams = originalParams.set('fields', this.fields.join(','));
        return originalParams;
    };
    // Get initial search params, with the names used in a search URL request
    SearchStore.prototype.getOriginalSearchURLParams = function () {
        var originalURLParams = Immutable.Map();
        originalURLParams = originalURLParams.set('rangetype', this.originalSearch.get('rangeType'));
        originalURLParams = originalURLParams.merge(this.originalSearch.get('rangeParams'));
        originalURLParams = originalURLParams.set('q', this.originalSearch.get('query'));
        originalURLParams = originalURLParams.set('interval', this.originalSearch.get('resolution'));
        originalURLParams = originalURLParams.set('page', this.originalSearch.get('page'));
        originalURLParams = originalURLParams.set('fields', this.fields ? this.fields.join(',') : '');
        originalURLParams = originalURLParams.set('sortField', this.originalSearch.get('sortField'));
        originalURLParams = originalURLParams.set('sortOrder', this.originalSearch.get('sortOrder'));
        if (this.originalSearch.has('saved')) {
            originalURLParams = originalURLParams.set('saved', this.originalSearch.get('saved'));
        }
        return originalURLParams;
    };
    SearchStore.prototype.searchBaseLocation = function (action) {
        var location;
        if (this.searchInStream) {
            location = Routes.stream_search(this.searchInStream.id);
        }
        else {
            location = Routes.SEARCH;
        }
        return location;
    };
    SearchStore.prototype._reloadSearchWithNewParam = function (param, value) {
        var searchURLParams = this.getOriginalSearchURLParams();
        searchURLParams = searchURLParams.set("width", this.width);
        searchURLParams = searchURLParams.set(param, value);
        this.executeSearch(this.searchBaseLocation("index") + "?" + Qs.stringify(searchURLParams.toJS()));
    };
    SearchStore.prototype._reloadSearchWithNewParams = function (newParams) {
        var searchURLParams = this.getOriginalSearchURLParams();
        searchURLParams = searchURLParams.set("width", this.width);
        searchURLParams = searchURLParams.merge(newParams);
        this.executeSearch(this.searchBaseLocation("index") + "?" + Qs.stringify(searchURLParams.toJS()));
    };
    SearchStore.prototype.executeSearch = function (url) {
        history.pushState(null, url);
    };
    SearchStore.prototype.searchSurroundingMessages = function (messageId, fromTime, toTime, filter) {
        var originalParams = this.getOriginalSearchParamsWithFields().toJS();
        var query = Object.keys(filter)
            .filter(function (key) { return filter[key]; })
            .map(function (key) { return (key + ":\"" + SearchStore.escape(filter[key]) + "\""); })
            .join(' AND ');
        var params = {
            rangetype: 'absolute',
            from: fromTime,
            to: toTime,
            q: query,
            highlightMessage: messageId,
            fields: originalParams.fields,
        };
        return this.searchBaseLocation('index') + '?' + Qs.stringify(params);
    };
    SearchStore.NOT_OPERATOR = "NOT";
    SearchStore.OR_OPERATOR = "OR";
    SearchStore.AND_OPERATOR = "AND";
    return SearchStore;
}());
var searchStore = new SearchStore();
module.exports = searchStore;
//# sourceMappingURL=SearchStore.js.map