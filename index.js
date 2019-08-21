#! /usr/bin/env node
var path = require("path");
var pkg = require(path.join(process.cwd(), "package.json"));
var log = console.log;

var spawn = require("cross-spawn");

var env = process.argv.slice(2);

var dependenciesEnv = pkg[env];

// install dependencies
if (dependenciesEnv && Object.keys(dependenciesEnv).length) {
	log("Installing dependencies for " + env);
	var npmArgs = ["install"];
	for (var dep in dependenciesEnv) {
		if (dependenciesEnv.hasOwnProperty(dep)) {
			npmArgs.push(dep.concat("@").concat(dependenciesEnv[dep]));
		}
	}
	var options = {
		stdio: "inherit"
	};
	spawn("npm", npmArgs, options);
} else {
	log("No specific dependencies on " + env);
}
