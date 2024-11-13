// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
function addDocument() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    if (name == '' || email == '' || phone == '' || message == '') {
        document.getElementById('submitFillMessage').style.display = 'inline';
        document.getElementById('submitSuccessMessage').style.display = 'none';
        document.getElementById('submitErrorMessage').style.display = 'none';
    } else {
        addDoc(collection(db, "portfolio_messages"), ({
            name: name,
            email: email,
            phone: phone,
            message: message
        }))
            .then((docRef) => {
                document.getElementById('submitFillMessage').style.display = 'none';
                document.getElementById('submitSuccessMessage').style.display = 'inline';
                document.getElementById('submitErrorMessage').style.display = 'none';
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                document.getElementById('submitFillMessage').style.display = 'none';
                document.getElementById('submitSuccessMessage').style.display = 'none';
                document.getElementById('submitErrorMessage').style.display = 'inline';
                console.error("Error sending request: ", error);

            });
    }
    return true;
};

const submitBtn = document.getElementById('submitButton');
submitBtn.addEventListener('click', addDocument);