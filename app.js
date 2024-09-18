// Firebase configuration (using your provided configuration)
const firebaseConfig = {
    apiKey: "AIzaSyC0zrv6-3vkzezyowWa_m6klFSccoN0mWI",
    authDomain: "im2sj-f1679.firebaseapp.com",
    databaseURL: "https://im2sj-f1679-default-rtdb.firebaseio.com",
    projectId: "im2sj-f1679",
    storageBucket: "im2sj-f1679.appspot.com",
    messagingSenderId: "448232159561",
    appId: "1:448232159561:web:068f71b50e6e0016654298",
    measurementId: "G-PGTCQE55YD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Array to store all submitted data
let allSubmittedData = [];

// Function to save data to Firebase
function saveToFirebase(data) {
    const dbRef = firebase.database().ref('students');
    dbRef.push(data);
}

// Function to generate and download Excel file
function downloadExcel(dataArray) {
    // Create a new workbook
    let workbook = XLSX.utils.book_new();

    // Define the headers for the Excel file
    let worksheetData = [["Name", "Section", "Subject"]];

    // Add each submission as a row in the worksheet
    dataArray.forEach(data => {
        worksheetData.push([data.name, data.section, data.subject]);
    });

    // Create a new worksheet from the data
    let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Download the Excel file
    XLSX.writeFile(workbook, "student_data.xlsx");
}

// Handling the form submission and data download
document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const section = document.getElementById("section").value;
    const subject = document.getElementById("subject").value;

    const studentData = {
        name,
        section,
        subject
    };

    // Add the submitted data to the allSubmittedData array
    allSubmittedData.push(studentData);

    // Save the data to Firebase
    saveToFirebase(studentData);

    // Enable the download button
    document.getElementById("downloadBtn").disabled = false;

    // Reset the form
    document.getElementById("dataForm").reset();

    alert("Data Submitted Successfully!");
});

// Handling download as Excel file after form is submitted
document.getElementById("downloadBtn").addEventListener("click", function() {
    if (allSubmittedData.length > 0) {
        // Download the Excel file with all the accumulated data
        downloadExcel(allSubmittedData);

        // Clear the data after downloading
        allSubmittedData = [];

        // Disable the download button after download
        document.getElementById("downloadBtn").disabled = true;

        alert("Data downloaded successfully and cleared.");
    } else {
        alert("No data available to download.");
    }
});