
import { loadRemoteEntry } from '@angular-architects/module-federation';

/*

// hardcoded scripts example
let modules = (window as any).ln_modules;
let proms = [];
modules.forEach((module) => {
	proms.push(loadRemoteEntry(module.remoteEntry, module.remoteName));
});
Promise.all(proms)
	.catch(err => console.error('Error loading remote entries', err))
	.then(() => import('./bootstrap'))
	.catch(err => console.error(err));
*/

// http example
// get("https://dwo1mpb0q4lec.cloudfront.net/modules.json").then((modules) => {
get("http://127.0.0.1:5500/module.json").then((modules) => {

	(window as any).ln_modules = modules;

	let proms = [];
	modules.forEach((module) => {
		proms.push(
			// load the remote config file 
			loadRemoteEntry(module.remoteEntry, module.remoteName)
		);
	});

	Promise.all(proms)
		.catch(err => console.error('Error loading remote entries', err))
		.then(() => import('./bootstrap'))
		.catch(err => console.error(err));
});

// simple http get impl
function get(url: string): Promise<any> {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();

	return new Promise<any>((success, failure) => {
		xhr.onreadystatechange = function () {
			var DONE = 4; // readyState 4 means the request is done.
			var OK = 200; // status 200 is a successful return.
			if (xhr.readyState === DONE) {
			  if (xhr.status === OK) {
				success(JSON.parse(xhr.responseText));	
			  } else {
				failure(xhr.status);
			  }
			}
		  };
	});
} 
