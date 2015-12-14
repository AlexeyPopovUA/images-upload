window.ImageList = (function () {
    "use strict";

    /**
     * Generates list item
     * @param item {File}
     * @param template
     * @private
     */
    function _generateImageItem(item, template) {
        var itemId = item.name;
        var imageSrc = URL.createObjectURL(item);
        var compiledtemplate = template;

        compiledtemplate = compiledtemplate.replace("{itemId}", itemId);
        //compiledtemplate = compiledtemplate.replace("{imageSrc}", imageSrc);

        return compiledtemplate;
    }

    var store = null;

    /**
     * Contains link to the list container
     */
    var listContainer;
    var previous;
    var next;

    /**
     * Contains selected itemId
     */
    var selection;

    /**
     * @type Function
     */
    var _onItemSelection;

    //public properties
    return {
        /**
         * Creates event listeners and starts data loading and rendering
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
                    store.loadPreviousPage();
                    me.renderItems(store.getData(), false);

                    me.refreshPaginationButtonsVisibility();
                }

            });

            next.addEventListener("click", function (event) {
                if (store.hasNextPage()) {
                    store.loadNextPage();
                    me.renderItems(store.getData(), false);

                    me.refreshPaginationButtonsVisibility();
                }
            });

            previous.innerHTML = previous.innerHTML.replace("{itemsPerPage}", store.itemsPerPage);
            next.innerHTML = next.innerHTML.replace("{itemsPerPage}", store.itemsPerPage);
        },

        /**
         * Returns view content for brief email rendering mode
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
         * Creates email item content and adds it to the list container
         * @param item {File}
         */
        renderItem: function (item) {
            var reader  = new FileReader();

            reader.onloadend = function () {
                //listItem.querySelector("img").src = reader.result;
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
                selection = element.getAttribute("data-itemId");

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

            selection = null;
        },

        /**
         * Returns selection Id
         * @returns {*}
         */
        getSelection: function () {
            return selection;
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