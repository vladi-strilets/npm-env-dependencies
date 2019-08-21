# npm-env-dependencies

Specify multiple dependencies to be installed vía package.json by env name.

To install do

```
npm install npm-env-dependencies
```

Use example:

Inside **package.json** create a new key named **_"npm-env"_**. Then we put our env dependencies key with distinct packages inside. For example, if we use React-Native and we want to separate the dependencies modules or have distinct versions for iOS and Android projects: 

```
{ ...
  "npm-env": {
    "android": {
      "react-native": "^0.59.8",
      "react-native-maps": "0.24.0",
      "react-native-firebase": "^5.2.3"
    },
    "ios": {
      "react-native": "0.58.6",
      "react-native-maps": "^0.19.0"
    }
  },
  "dependencies": {
    ...
  },
  ...
}
```

After that we can easily switch out the project to have modules/versions that are compatible with Android or with iOS compilation by calling from the project path:

```
npm-env ios
```

This command will remove all unused modules from **_"dependencies"_**, in this case, "react-native-firebase", and will install/update/downgrade the other modules.

If we call after that
```
npm-env android
```

We will get updated "react-native" and "react-native-maps" modules and installed "react-native-firebase".

Be sure you did a normal `npm-install` before.

