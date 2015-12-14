window.ImageStore = (function () {
    "use strict";

    /**
     * Contains original item list. Can be sorted
     * @type {File[]}
     */
    var items = [];

    var currentPage = 0;

    //public members
    return {
        initialize: function (config) {
            this.itemsPerPage = config.itemsPerPage ? config.itemsPerPage : this.itemsPerPage;
        },

        itemsPerPage: 5,

        /**
         * Returns filtered data
         * @returns {File[]}
         */
        getData: function () {
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

        clearData: function () {
            items.splice(0, items.length);
        },

        /**
         *
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
            return items.length > (currentPage * this.itemsPerPage + this.getData().length);
        },

        hasPreviousPage: function () {
            return currentPage > 0;
        },

        loadNextPage: function () {
            if (this.hasNextPage()) {
                currentPage++;
            }
        },

        loadPreviousPage: function () {
            if (currentPage > 0) {
                currentPage--;
            }
        }
    }
})();