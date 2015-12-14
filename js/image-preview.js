/**
 * This module is responsible for big image preview
 */
window.ImagePreview = (function () {
    "use strict";

    /**
     * Contains link to the preview container
     */
    var previewContainer;

    /**
     * This method returns compiled template
     * @param item {File}
     * @param template {String}
     * @returns {String}
     * @private
     */
    function _generateImageItem(item, template) {
        var imageSrc = URL.createObjectURL(item);
        var compiledTemplate = template;

        compiledTemplate = compiledTemplate.replace("{imageSrc}", imageSrc);

        return compiledTemplate;
    }

    //public methods
    return {
        initialize: function () {
            previewContainer = document.querySelector("#big-preview");
            this.clear();
        },

        /**
         * Removes content from the container
         */
        clear: function () {
            previewContainer.innerHTML = "Please select any image";
        },

        /**
         * Creates preview item
         * @param item {File}
         */
        render: function (item) {
            this.clear();

            previewContainer.innerHTML = _generateImageItem(item, this.previewTemplate);
        },

        /**
         * Template for big image preview
         */
        previewTemplate: '' +
            '<div class="image-preview opacity-animation">' +
                '<img src="{imageSrc}"/>'+
            '</div>'
    }
})();