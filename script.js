// Custom alert function
function showCustomAlert(message, type = 'error') {

    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }


    const alertContainer = document.createElement('div');
    alertContainer.className = `custom-alert ${type}`;


    const alertContent = document.createElement('div');
    alertContent.className = 'alert-content';


    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;


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

    
    document.body.appendChild(alertContainer);

    
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 10);


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

        const savedQRResult = localStorage.getItem('lastQRResult');
        if (savedQRResult) {
            qrResult.innerHTML = savedQRResult;
        }
    }

    
    urlInput.addEventListener('input', () => {
        localStorage.setItem('lastGeneratedUrl', urlInput.value);
    });

    
    const clearStorage = () => {
        location.reload();
        localStorage.removeItem('lastGeneratedUrl');
        localStorage.removeItem('lastQRResult');
    };

    
    const hasDataToClear = () => {
        return localStorage.getItem('lastGeneratedUrl') || localStorage.getItem('lastQRResult');
    };

    
    const updateClearButtonVisibility = () => {
        const clearBtn = document.querySelector('.clear-btn');
        if (clearBtn) {
            clearBtn.style.display = hasDataToClear() ? 'block' : 'none';
        }
    };

    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear History';
    clearBtn.className = 'clear-btn';
    clearBtn.onclick = clearStorage;
    document.querySelector('.qr-form').appendChild(clearBtn);

    
    updateClearButtonVisibility();

    
    urlInput.addEventListener('input', () => {
        localStorage.setItem('lastGeneratedUrl', urlInput.value);
        updateClearButtonVisibility();
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

            
            qrResult.innerHTML = '<div class="loader"><span></span></div>';
            qrResult.classList.add('loading');

            
            setTimeout(() => {
                const qrCodeHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150" alt="QR Code" class="qr-code">`;
                qrResult.innerHTML = qrCodeHTML;
                qrResult.classList.remove('loading');
                localStorage.setItem('lastQRResult', qrCodeHTML);
                updateClearButtonVisibility();
            }, 1000);
        }
    });

    
}); 