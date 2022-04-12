importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyB_uPwm93FtfTGJ8JJ38RpRwQyEWdd4_Oc",
  authDomain: "mswali-1171e.firebaseapp.com",
  projectId: "mswali-1171e",
  storageBucket: "mswali-1171e.appspot.com",
  messagingSenderId: "746446534026",
  appId: "1:746446534026:web:89c4f2b9cabf1a82080473",
  measurementId: "G-BQVPFSMG80",
  databaseURL: "https://mswali-1171e-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  console.log(payload)
  const notification = payload.data;
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: 'https://drive.google.com/uc?export=view&id=1POv_L5u3szPLhs9aFAjFomGINTo4ds3n'
  };
  self.registration.hideNotification();
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
