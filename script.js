document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // डेटा प्राप्त करना
    const receiptNo = document.getElementById('receipt-no').value;
    const donationDate = document.getElementById('donation-date').value;
    const donorName = document.getElementById('donor-name').value;
    const address = document.getElementById('address').value;
    const amountWords = document.getElementById('amount-words').value;
    const amountNumbers = document.getElementById('amount-numbers').value;
    const receiverName = document.getElementById('receiver-name').value;

    // डेट फॉरमैटिंग (DD-MM-YYYY)
    let formattedDate = donationDate;
    if(donationDate) {
        const dateParts = donationDate.split('-');
        if(dateParts.length === 3) {
            formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }
    }

    // HTML में डेटा सेट करना
    document.getElementById('view-receipt-no').textContent = receiptNo;
    document.getElementById('view-donation-date').textContent = formattedDate;
    document.getElementById('view-donor-name').textContent = donorName;
    document.getElementById('view-address').textContent = address;
    document.getElementById('view-amount-words').textContent = amountWords;
    document.getElementById('view-amount-numbers').textContent = amountNumbers;
    document.getElementById('view-receiver-name').textContent = receiverName;

    // थीम सेट करना
    const amount = parseInt(amountNumbers, 10) || 0;
    const receiptSection = document.getElementById('receipt-section');

    receiptSection.classList.remove('theme-skyblue', 'theme-orange', 'theme-luxury');

    if (amount >= 2000) {
        receiptSection.classList.add('theme-luxury'); // Maroon Background
    } 
    else if (amount >= 1000) {
        receiptSection.classList.add('theme-orange'); // Orange Background
    } 
    else {
        receiptSection.classList.add('theme-skyblue'); // Blue Background
    }

    // रसीद प्रदर्शित करना
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('receipt-section').style.display = 'block';
    document.getElementById('action-buttons-container').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Download Logic (Image)
document.getElementById('save-gallery-btn').addEventListener('click', function() {
    const receiptElement = document.getElementById('receipt-section');
    const receiptNo = document.getElementById('view-receipt-no').textContent || '01';
    
    const originalText = this.textContent;
    this.textContent = "कृपया प्रतीक्षा करें (इमेज प्रोसेस हो रही है)...";
    this.disabled = true;

    html2canvas(receiptElement, {
        scale: 2,                  
        useCORS: true, 
        allowTaint: true,
        backgroundColor: null 
    }).then(canvas => {
        const receiptImage = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = receiptImage;
        downloadLink.download = `चंदा_रसीद_${receiptNo}.png`; 
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        this.textContent = originalText;
        this.disabled = false;
    }).catch(error => {
        console.error("इमेज रेंडरिंग त्रुटि:", error);
        alert("माफ कीजिएगा, इमेज जेनरेट करने में तकनीकी त्रुटि आई है।");
        this.textContent = originalText;
        this.disabled = false;
    });
});