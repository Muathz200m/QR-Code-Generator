const translations = {
  en: {
    labelText: "Enter your text or URL",
    placeholderText: "Text or URL",
    generateButton: "Generate QR Code",
    downloadButton: "Download",
    dir: "ltr", // اتجاه النص
  },
  ar: {
    labelText: "أدخل نصك أو رابطك",
    placeholderText: "نص أو رابط",
    generateButton: "توليد رمز QR",
    downloadButton: "تحميل",
    dir: "rtl", // اتجاه النص
  },
};

function changeLanguage() {
  const selectedLanguage = document.getElementById("languageSelector").value;

  document.getElementById("labelText").textContent =
    translations[selectedLanguage].labelText;
  document.getElementById("downloadButton").textContent =
    translations[selectedLanguage].downloadButton;
  document.getElementById("qrText").placeholder =
    translations[selectedLanguage].placeholderText;
  document.getElementById("generateButton").textContent =
    translations[selectedLanguage].generateButton;

  const htmlElement = document.getElementById("htmlLang");
  htmlElement.setAttribute("lang", selectedLanguage);
  htmlElement.setAttribute("dir", translations[selectedLanguage].dir);
}

function GenerateQRCode() {
  let qrBox = document.getElementById("qrBox");
  let qrImage = document.getElementById("qrImage");
  let qrText = document.getElementById("qrText").value.trim();

  if (qrText === "") {
    qrBox.style.display = "none";
  } else {
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      encodeURIComponent(qrText);
    qrBox.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  changeLanguage();
});

function downloadQRCode() {
  const qrImage = document.getElementById("qrImage");

  if (qrImage.src && qrImage.src !== window.location.href) {
    // Fetch the image as a blob
    fetch(qrImage.src)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary URL for the blob
        const blobURL = URL.createObjectURL(blob);

        // Create a temporary <a> element
        const downloadLink = document.createElement("a");
        downloadLink.href = blobURL;
        downloadLink.download = "QRCode.png"; // Set download file name
        downloadLink.click(); // Trigger the download

        // Clean up the temporary blob URL
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.error("Failed to download QR code:", error);
        alert("Failed to download the QR code. Please try again.");
      });
  } else {
    alert("Please generate a QR code first!");
  }
}
