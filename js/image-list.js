/**
 * This class is responsible for image list presentation
 */
window.ImageList = (function () {
    "use strict";

    /**
     * Generates list item
     * @param item {File}
     * @param template {String}
     * @return {String}
     * @private
     */
    function _generateImageItem(item, template) {
        var itemId = item.name;
        var compiledtemplate = template;

        compiledtemplate = compiledtemplate.replace("{itemId}", itemId);

        return compiledtemplate;
    }

    /**
     * Contains link to the store
     */
    var store;

    /**
     * Contains link to the list container
     * @type HTMLElement
     */
    var listContainer;

    /**
     * Link to the "Previous" button
     * @type HTMLElement
     */
    var previous;

    /**
     * Link to the "Next" button
     * @type HTMLElement
     */
    var next;

    /**
     * @type Function
     */
    var _onItemSelection;

    //public properties
    return {
        /**
         * Creates event listeners and initializes property values
         * @param config {{store: window.ImageStore, onSelection: Function}}
         */
        initialize: function (config) {
            var me = this;
            var listView = document.querySelector("#image-list");

            previous = listView.querySelector("#show-previous");
            next = listView.querySelector("#show-next");

            store = config.store;
            _onItemSelection = config.onSelection;

            listContainer = listView.querySelector("#image-list-container");
            listContainer.addEventListener("click", function (event) {
                var target = event.target || event.srcElement;
                var imageId;

                while (target != listContainer) {
                    imageId = target.getAttribute("data-itemId");
                    if (target.getAttribute("data-itemId")) {
                        break;
                    }
                    target = target.parentNode;
                }

                if (imageId) {
                    me.select(store.getById(imageId));
                }
            });

            previous.addEventListener("click", function (event) {
                if (store.hasPreviousPage()) {
                    me.renderItems(store.loadPreviousPage(), false);
                    me.refreshPaginationButtonsVisibility();
                }
            });

            next.addEventListener("click", function (event) {
                if (store.hasNextPage()) {
                    me.renderItems(store.loadNextPage(), false);
                    me.refreshPaginationButtonsVisibility();
                }
            });

            previous.innerHTML = previous.innerHTML.replace("{itemsPerPage}", store.itemsPerPage);
            next.innerHTML = next.innerHTML.replace("{itemsPerPage}", store.itemsPerPage);
        },

        /**
         * This is a template for list items
         * @returns {string}
         */
        itemTemplate: '' +
            '<div class="image-small opacity-animation" data-itemId="{itemId}">' +
                '<img src="images/spinner.gif" width="100px"/>' +
            '</div>',

        /**
         * This method renders list items with separators
         * @param itemlist {File[]}
         * @param {Boolean} [append] if true, items will be appended to the list container
         */
        renderItems: function (itemlist, append) {
            var me = this;

            if (append !== true) {
                me.removeAllItems();
            }

            for (var j = 0, itemsLength = itemlist.length; j < itemsLength; j++) {
                me.renderItem(itemlist[j]);
            }

            this.refreshPaginationButtonsVisibility();
        },

        /**
         * Creates item html and adds it to the list container
         * @param item {File}
         */
        renderItem: function (item) {
            var reader  = new FileReader();

            reader.onloadend = function () {
                var listItem = listContainer.querySelector('.image-small[data-itemId="' + item.name + '"] img');
                if (listItem) {
                    listItem.src = reader.result;
                }
            };

            reader.readAsDataURL(item);

            listContainer.insertAdjacentHTML("beforeend", _generateImageItem(item, this.itemTemplate));
        },

        /**
         * This method selects item in item list by data object
         * @param item {File}
         */
        select: function (item) {
            var element = listContainer.querySelector('.image-small[data-itemId="' + item.name + '"]');

            if (!element.classList.contains("selected")) {
                this.clearSelection();
                element.classList.add("selected");

                if (_onItemSelection) {
                    _onItemSelection(item);
                }
            }
        },

        /**
         * Clears all selections
         */
        clearSelection: function () {
            var selected = listContainer.querySelectorAll(".selected");

            for (var i = 0, len = selected.length; i < len; i++) {
                selected[i].classList.remove("selected");
            }
        },

        /**
         * Removes all items from the list container
         */
        removeAllItems: function () {
            var imageElements = listContainer.querySelectorAll(".image-small");
            for (var i = 0, elemLen = imageElements.length; i < elemLen; i++) {
                listContainer.removeChild(imageElements[i]);
            }
        },

        /**
         * This method refreshes visibility of "Previous" an "Next" buttons
         */
        refreshPaginationButtonsVisibility: function () {
            if (previous && !store.hasPreviousPage()) {
                previous.style.display = "none";
            } else {
                previous.style.display = "block";
            }

            if (next && !store.hasNextPage()) {
                next.style.display = "none";
            } else {
                next.style.display = "block";
            }
        }
    }
})();