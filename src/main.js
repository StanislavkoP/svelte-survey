import App from './App.svelte';


// if (localStorage.jwtToken) {
// 	setAuthToken(localStorage.jwtToken);

// 	const jwtTokenDecoded = jwt_decode(localStorage.jwtToken);

// 	const currentTime = Date.now() / 1000;

// 	if (jwtTokenDecoded.exp < currentTime) {	
// 		store.dispatch( actions.clearCurrentProfile() );
// 		store.dispatch( actions.submitLogOut() );
	
// 	} else {
// 		store.dispatch( actions.submitLogInSuccess(jwtTokenDecoded) );

// 	}

// } 

const app = new App({
	target: document.body,
});

export default app;