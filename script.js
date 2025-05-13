// Custom alert function
function showCustomAlert(message, type = 'error') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = `custom-alert ${type}`;

    // Create alert content
    const alertContent = document.createElement('div');
    alertContent.className = 'alert-content';

    // Create alert message
    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.className = 'alert-button';
    closeButton.onclick = () => {
        alertContainer.classList.add('fade-out');
        setTimeout(() => {
            alertContainer.remove();
        }, 300);
    };

    // Assemble alert
    alertContent.appendChild(alertMessage);
    alertContent.appendChild(closeButton);
    alertContainer.appendChild(alertContent);

    // Add to body
    document.body.appendChild(alertContainer);

    // Add animation
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 10);

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alertContainer)) {
            alertContainer.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(alertContainer)) {
                    alertContainer.remove();
                }
            }, 300);
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrResult = document.getElementById('qrResult');

    // Load saved URL from local storage
    const savedUrl = localStorage.getItem('lastGeneratedUrl');
    if (savedUrl) {
        urlInput.value = savedUrl;
        // If there was a previously generated QR code, show it
        const savedQRResult = localStorage.getItem('lastQRResult');
        if (savedQRResult) {
            qrResult.innerHTML = savedQRResult;
        }
    }

    // Save URL to local storage when input changes
    urlInput.addEventListener('input', () => {


        // Save the current URL to local storage
        localStorage.setItem('lastGeneratedUrl', urlInput.value);

    });

    generateBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();

        if (!url) {
            showCustomAlert('Please enter a valid URL');
            return;
        } else if (urlInput.value.trim() == "") {
            showCustomAlert('Please enter a valid URL');
        } else {
            localStorage.setItem('lastGeneratedUrl', url);

            // Show loading state
            qrResult.innerHTML = '<div class="loader"></div>';
            qrResult.classList.add('loading');

            // Generate QR code after 2 seconds
            setTimeout(() => {
                const qrCodeHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150" alt="QR Code" class="qr-code">`;
                qrResult.innerHTML = qrCodeHTML;
                qrResult.classList.remove('loading');
                localStorage.setItem('lastQRResult', qrCodeHTML);
            }, 1500);
        }


    });

    // Download functionality has been removed

    // Add clear storage button functionality
    const clearStorage = () => {
        location.reload();
        localStorage.removeItem('lastGeneratedUrl');
        localStorage.removeItem('lastQRResult');
    };

    // Add clear button to the page
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear History';
    clearBtn.className = 'clear-btn';
    clearBtn.onclick = clearStorage;
    document.querySelector('.qr-form').appendChild(clearBtn);
}); 