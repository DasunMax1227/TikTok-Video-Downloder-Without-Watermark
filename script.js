document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tiktokUrl = document.getElementById('tiktokUrl').value;
    const downloadOptions = document.getElementById('downloadOptions');
    const downloadLink = document.getElementById('downloadLink');
    const downloadLinkUrl = document.getElementById('downloadLinkUrl');

    // Show download options
    downloadOptions.classList.remove('hidden');
    downloadLink.classList.add('hidden');

    // Clear previous input
    downloadLinkUrl.href = '#';
    
    fetch(`https://manul-official-api.vercel.app/scrape-tiktok?url=${encodeURIComponent(tiktokUrl)}&apikey=Manul-Official`)
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                const videoData = data.data.data;
                // Attach event listeners to the options
                const downloadButtons = document.querySelectorAll('.downloadOption');
                downloadButtons.forEach(button => {
                    button.addEventListener('click', () => handleDownload(button, videoData));
                });
            } else {
                alert('Invalid TikTok URL or API error.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});

function handleDownload(button, videoData) {
    const type = button.getAttribute('data-type');
    let downloadUrl = '';

    switch (type) {
        case 'noWatermark':
            downloadUrl = videoData.nowm;
            break;
        case 'watermark':
            downloadUrl = videoData.watermark;
            break;
        case 'audio':
            downloadUrl = videoData.audio;
            break;
        case 'thumbnail':
            downloadUrl = videoData.thumbnail;
            break;
    }

    document.getElementById('downloadLink').classList.remove('hidden');
    document.getElementById('downloadLinkUrl').href = downloadUrl;
    document.getElementById('downloadLinkUrl').innerText = `Download ${type.charAt(0).toUpperCase() + type.slice(1)}`;
}
