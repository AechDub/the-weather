# The Weather


## Information
This app gets the forecast using the Dark Sky API.  It works through geolocator in your device, but can also accept an input for location. 

---


## Installation

### Requirements

Below you will find basic setup and deployment instructions for this project. To begin you should have the following applications installed globally on your local development system:

  + git >= 2.0.2
  + node >= 4.3.1
  + npm >= 2.11.1
  + bower >= 1.4.1
  + ionic < 2

### Packages
  + `npm install`
  + `npm install -g bower`
  + `npm install -g gulp`
  + `bower install`
  + `gem install scss_lint`
  + `cordova plugin add cordova-plugin-geolocation`

---

## Gulp

### Environments

The environment can be set for `gulp default` and `gulp watch` with `--env=`.
The default environment for the `gulp watch` is `default`.  If you are not running with a test or locally built API, use `prod` as the environment or whatever other environment you configure.  These can be set under `Gulp > enviornments`.  Take a look at the exsting ones (`prod` and `local`) for examples.

---


## Building

### Ionic

Building the application will take a few steps.

First step of the build will be to run gulp to generate the ionic dist (www).  

There are a few ways to build and test the ios app.  

  + `ionic serve --lab` - this will serve the site locally and give you both android and ios in browser emulators
  + `ionic emulate ios` - this will run the native emulator provided by xcode
  + `ionic build ios` - this will create a full xcode project, allowing you to open the project with xcode and test with an attached physical device.

---



