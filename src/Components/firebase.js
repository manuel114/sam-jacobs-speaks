import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBRbDzM2vXsm-PMSwJpcsC8gWzDIWQ84Ow',
	authDomain: 'zoltar-speaks.firebaseapp.com',
	databaseURL: 'https://zoltar-speaks.firebaseio.com',
	projectId: 'zoltar-speaks',
	storageBucket: '',
	messagingSenderId: '132040744194',
	appId: '1:132040744194:web:c9f96d691c7a4d520df61b'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
