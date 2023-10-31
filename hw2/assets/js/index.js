$(document).ready(function() {

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const uploadInput = document.getElementById('upload-input');
    const labelInput = document.getElementById('label-input');
    const uploadButton = document.getElementById('upload-button');

    uploadButton.addEventListener('click', function () {
        if (uploadInput.files && uploadInput.files[0]) {
            let imageName = uploadInput.files[0].name;
            let image = uploadInput.files[0];
            let bucketName = 'hw2-b2-qiyan';
            let labels = labelInput.value.trim();
            let imageType = image.type;

            console.log('image:',image.path);

            if (imageType != 'image/png' && imageType != 'image/jpeg') {
                return alert("Invalid file.");
            }

            let params = {
                'item': imageName,
                'folder': bucketName,
                'x-amz-meta-customLabels': labels,
                'Content-Type': imageType,
                'x-api-key': 'W97Zd6merk5ZpGazih87a1McyHjO2GJQ8VtGKe7d'
            };

            sdk.folderItemPut(params, image, {}).then((response) => {
                console.log("Upload in progress");
                console.log(response);
                if (response.status == 200) {
                    return alert("Upload Successful!");
                } else {
                    return alert("Upload Failed");
                }
            }).catch(function(err) {
                console.log('Failed to upload photo.', err);
            });
            
        } else {
            return alert("No file to upload.");
        }
    });


});