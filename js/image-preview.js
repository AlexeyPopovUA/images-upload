window.ImagePreview = (function () {
    "use strict";

    /**
     * Contains link to the email detailed information container
     */
    var previewContainer;

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
         * Removes content from the email container
         */
        clear: function () {
            previewContainer.innerHTML = "Please select any image";
        },

        /**
         * Opens detailed view of email item
         * @param item {window.EmailItem}
         */
        render: function (item) {
            this.clear();

            previewContainer.innerHTML = _generateImageItem(item, this.previewTemplate);
        },

        previewTemplate: '' +
            '<div class="image-preview opacity-animation">' +
                '<img src="{imageSrc}"/>'+
            '</div>'
    }
})();