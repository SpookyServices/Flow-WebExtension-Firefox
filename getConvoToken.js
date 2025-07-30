// Function to create and show notification
function showNotification(message, duration = 4000, color = '#4CAF50') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${color};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
        max-width: 300px;
        word-wrap: break-word;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}


setTimeout(() => {
    const convoToken = localStorage.getItem('flutter.convoToken');

    if (convoToken) {
        chrome.storage.local.set(
            { convoToken: convoToken },
            () => { }
        );

        if (window.location.href.includes('chromeLogin') || localStorage.getItem('chromeLogin') == 'true') {
            showNotification('Flow Extension login successful');
            localStorage.removeItem('chromeLogin');
        }


    } else {
        console.log('flutter.convoToken not found in localStorage');
        if (window.location.href.includes('chromeLogin')) {
            showNotification('Please login to use the Flow Extension', 300000, '#aa0e00');
            localStorage.setItem('chromeLogin', 'true');
        }
    }
}, 1000);

