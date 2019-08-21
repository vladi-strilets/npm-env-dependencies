#! /usr/bin/env node
var path = require("path");
var package = require(path.join(process.cwd(), "package.json"));
var log = console.log;

var spawn = require("cross-spawn");

var currentEnv = process.argv.slice(2);

var dependenciesCurrentEnv = package["npm-env"][currentEnv];

if (dependenciesCurrentEnv && Object.keys(dependenciesCurrentEnv).length) {
	// uninstall dependencies from other envs
	for (var otherEnv in package["npm-env"]) {
		if (otherEnv != currentEnv) {
			log("Uninstalling unused dependencies from " + otherEnv);
			var npmArgs = ["uninstall"];
			for (var dep in package["npm-env"][otherEnv]) {
				if (package["npm-env"][otherEnv].hasOwnProperty(dep)) {
					if (!dependenciesCurrentEnv.hasOwnProperty(dep)) {
						if (package["dependencies"].hasOwnProperty(dep))
							npmArgs.push(dep);
					}
				}
			}
			var options = {
				stdio: "inherit"
			};
			log(npmArgs);
			spawn.sync("npm", npmArgs, options);
		}
	}
	// install dependencies from the current env
	log("Installing dependencies & updating versions for " + currentEnv);
	var npmArgs = ["install"];
	for (var dep in dependenciesCurrentEnv) {
		if (dependenciesCurrentEnv.hasOwnProperty(dep)) {
			npmArgs.push(dep.concat("@").concat(dependenciesCurrentEnv[dep]));
		}
	}
	var options = {
		stdio: "inherit"
	};
	log(npmArgs);
	spawn.sync("npm", npmArgs, options);
} else {
	log("No specific dependencies on " + currentEnv);
}
