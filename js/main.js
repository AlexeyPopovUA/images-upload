(function () {
    "use strict";

    window.onload = function () {
        ImageStore.initialize({
            itemsPerPage: 10
        });

        ImageList.initialize({
            store: ImageStore,
            onSelection: function (item) {
                ImagePreview.render(item);
            }
        });

        ImagePreview.initialize();

        UploadForm.initialize({
            renderTo: document.querySelector("#upload-form"),
            onFileUploadChange: function (event) {
                ImagePreview.clear();
                ImageStore.loadData(event.target.files);
                ImageList.renderItems(ImageStore.getCurrentPageData(), false);
            }
        });
    }
})();