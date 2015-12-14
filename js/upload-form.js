window.UploadForm = (function () {
    "use strict";

    return {
        /**
         *
         * @param config {{renderTo: HTMLElement, onFileUploadChange: Function}}
         */
        initialize: function (config) {
            this.render(config.renderTo);
            if (config.onFileUploadChange){
                config.renderTo.querySelector("#images-upload").addEventListener("change", config.onFileUploadChange);
            }
        },

        render: function (renderTo) {
            renderTo.insertAdjacentHTML("beforeend", this.template);
        },

        template: "" +
            "<div class='form-container'>" +
                "<input type='file' id='images-upload' accept='image/*' multiple>"+
            "</div>"
    }

})();