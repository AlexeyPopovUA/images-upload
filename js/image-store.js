/**
 * This module contains data and methods to work with it
 */
window.ImageStore = (function () {
    "use strict";

    /**
     * Contains original item list
     * @type {File[]}
     */
    var items = [];

    /**
     * Current page
     * @type {number}
     */
    var currentPage = 0;

    //public members
    return {
        initialize: function (config) {
            this.itemsPerPage = config.itemsPerPage ? config.itemsPerPage : this.itemsPerPage;
        },

        /**
         * This number of images will be shown in the image list
         */
        itemsPerPage: 10,

        /**
         * Returns current page data
         * @returns {File[]}
         */
        getCurrentPageData: function () {
            var from = currentPage * this.itemsPerPage;
            var to = from + this.itemsPerPage;

            return items.slice(from, to);
        },

        /**
         * Returns item from original list by it's id
         * @param id
         * @returns {File|null}
         */
        getById: function (id) {
            for (var i = 0, len = items.length; i < len; i++) {
                if (items[i].name === id) {
                    return items[i];
                }
            }

            return null;
        },

        /**
         * Removes all data from the store
         */
        clearData: function () {
            items.splice(0, items.length);
        },

        /**
         * Loads File List object
         * @param data {FileList}
         */
        loadData: function (data) {
            this.clearData();
            currentPage = 0;

            for (var i = 0, len = data.length; i < len; i++) {
                items.push(data.item(i));
            }
        },

        hasNextPage: function () {
            return items.length > (currentPage * this.itemsPerPage + this.getCurrentPageData().length);
        },

        hasPreviousPage: function () {
            return currentPage > 0;
        },

        loadNextPage: function () {
            if (this.hasNextPage()) {
                currentPage++;
            }

            return this.getCurrentPageData();
        },

        loadPreviousPage: function () {
            if (currentPage > 0) {
                currentPage--;
            }

            return this.getCurrentPageData();
        }
    }
})();