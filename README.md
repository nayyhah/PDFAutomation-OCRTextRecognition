<img src="./frontend/src/images/decipher-logo.png" alt="Logo" width="500">

## DECIPHER 2.0 | <i>PDF Automation - OCR Text Recognition</i>

### Problem Statement
<details>
    <summary>There are various validation rule engines across the industry. There are all Converting PDF documents into structured data which you can use in other systems is however not a trivial task and many businesses find themselves manually re-keying product data from PDF documents into spreadsheets or databases. 
</summary>
</details>
<details>
    <summary>Extraction of critical data from those PDF’s(Invoice, receipts, sales orders) and in return receive structured data. Need to convert PDF to text for download
</summary>
</details>

### Assumptions/Callouts
- Any data set can be used. Use supply chain related data
- Pick few sample PDF's with watermark 

### Solution - <i>DECIPHER 2.0</i>
Decipher 2.0 is a user-friendly tool that identifies the data items one wants to extract from their uploaded invoice and gives back the desired fields as a downloadable file in multiple formats.It comes with the following built-in functionalities:
<details>
    <summary>Extracts useful information from large, multiple PDFs in just seconds </summary>
</details>
<details>
    <summary>Adjusts the alignment of randomly oriented pdf images</summary>
</details>
<details>
    <summary>Remove watermarks to provide flawless results</summary>
</details>
<details>
    <summary>Store the extracted information in cloud storage for future access</summary>
</details>


## Architecture
<img src="./frontend/src/images/architecture.png" alt="Logo" width="700">


## Technology Stack
Frontend
- **React JS :** *web-app user interface*
- **Netlify :** *deploying the web-app*

Backend
- **Express.js :** *setting up backend server*
- **Heroku :** *deploying backend services*

Storage
- **MongoDB :** *storing schemas*
- **Cloudinary :** *cloud storage for files*

Tools and Languages
- **Tesseract :** *extracting text through OCR*
- **Python :** *parsing pdf and images*

## Screenshots
<img src="./frontend/src/images/screenshot1.png" alt="Homepage" width="550">
<img src="./frontend/src/images/screenshot2.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot3.png" alt="Homepage" width="550">
<img src="./frontend/src/images/screenshot4.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot5.png" alt="Homepage" width="550">
<img src="./frontend/src/images/screenshot6.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot7.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot8.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot9.png" alt="ExtractionPage" width="550">
<img src="./frontend/src/images/screenshot10.png" alt="ExtractionPage" width="550">



## Future Additions
<details>
    <summary><b>Bounding Box Flexibility :</b> Users can select their own bounding boxes and this feature can be implemented using JCrop Library</summary>
</details>
<details>
    <summary><b>Language Translation :</b> PDFs can be translated from one language to other using libraries like textblob or googletrans</summary>
</details>
<details>
    <summary><b>QR Code Reader :</b> Values of QR Codes or Bar Codes in PDFs can also be decoded and then stored using pyzbar library</summary>
</details>
<details>
    <summary><b>Processing Handwritten Invoices :</b> Text from handwritten invoices can be extracted and parsed. For this, Tensorflow library can be used to create and train a neural network by using datasets of extracted invoices.
</summary>
</details>

