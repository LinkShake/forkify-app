# Forkify Project

## Index

[//]: <> (prettier ignore)

> - [About](https://github.com/LinkShake/forkify-app#about)
>   - [The project](https://github.com/LinkShake/forkify-app#the-project)
>   - [The architecture](https://github.com/LinkShake/forkify-app#the-architecture)
> - [Setup](https://github.com/LinkShake/forkify-app#setup):
>   - [Download the code and install all the dependencies](https://github.com/LinkShake/forkify-app#download-the-code-and-install-all-the-dependencies)
> - [Run the project](https://github.com/LinkShake/forkify-app#run-the-project):
>   - [Run via CLI and npm](https://github.com/LinkShake/forkify-app#run-via-cli-and-npm)
>   - [Use the live site](https://github.com/LinkShake/forkify-app#use-the-live-site)
>   - [Build the project (optional)](https://github.com/LinkShake/forkify-app#built-the-project)
> - [Future of the project](https://github.com/LinkShake/forkify-app#future-of-the-project):
>   - [What misses in the project](https://github.com/LinkShake/forkify-app#what-misses-in-the-project)
>   - [Potential new features](https://github.com/LinkShake/forkify-app#potential-new-features)
> - [Important notes](https://github.com/LinkShake/forkify-app#important-notes)

## About

### The project

Forkify is a web app realized using vanilla js. The goal is to let users search for their favourite recipes, bookmark them, market ingredients, plan some cooking and add their own recipes.

I tried my best to make the app suitable for both desktop and mobile devices and smaller screens!

At the time I'm writing these there is a strange bug that occures in all iPhones (I couldn't test also on iPads or macs): for some reason the "add recipe UI" is bugged.
I'm saying this 'cause both the Chrome and Firexfox's iPhone emulation showed zero problems: maybe there's some kind of conflicts/issues with iOS (not sure about that).

### The architecture

To build this project I used the [`MVC`](https://developer.mozilla.org/en-US/docs/Glossary/MVC) architecture that splits the code into:

> - **Model**: handle the business logic and the state
> - **Controller**: creates a bridge which connects the Model and the View
> - **View**: handles the UI

## Setup

**Important:** To download the dependencies and run the project you need [`Node.js`](https://nodejs.org/it/) and [`npm`](https://www.npmjs.com/) installed on your machine

### Download the code and install all the dependencies

In order to download the code you can clone the repo

```
git clone https://github.com/LinkShake/forkify-app.git
```

or you can decide to download zipped code.
To download all the dependencies run

```
 npm i
```

in the command line.

## Run the project

### Run via CLI and npm

To run this project using the command line and npm you have to write

```
npm start
```

in your command line and press enter: this will launch the app at `http://localhost:1234`.

### Potential issues

If some problems occure during this phase, then check if your [`package.json`](/package.json) file has this structure:

```
{
  "name": "forkify",
  "version": "1.0.0",
  "description": "Recipe app",
  "default": "index.html",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --dist-dir ./dist"
  },
  "author": "LinkShake",
  "license": "ISC",
  "devDependencies": {
    "@parcel/transformer-sass": "^2.6.2",
    "parcel": "^2.6.2"
  },
  "dependencies": {
    "core-js": "^3.23.5",
    "fractional": "^1.0.0",
    "regenerator-runtime": "^0.13.9"
  }
}
```

If you have different versions of the dependencies, then uninstall them using

```
npm uninstall dependency name
```

and then reinstall them using

```
npm i dependecy name
```

To reinstall parcel run

```
npm i parcel --save-dev
```

If you reinstall parcel it's important, to avoid conflicts, that you delete the `dist` and `.parcel-cache` that parcel automatically created when you've run `"npm run"`.

If this doesn't solve your problem, then go checking [parcel docs](https://parceljs.org/docs/) or see if someone else had a similar problem on [stackoverflow](https://stackoverflow.com/).

## Use the live site

If you prefer not to do everything I mentioned before, you can simply visit the site at: [`forkify-app-linkshake`](https://forkify-app-linkshake.netlify.app/)

## Build the project

**Important:** this step **isn't** required in order to run the application.

To build the project run

```
npm run build
```

As always, if some problems occure check your [`package.json`](/package.json), in particoular your `"build"` script should be like this

```
"build": "parcel build index.html --dist-dir ./dist"
```

and you should have this property

```
"default": "index.html"
```

before the `"script"` tag.

If this doesn't solve your problem check [here](https://github.com/LinkShake/forkify-app#potential-issues).

## Future of the project

### What misses in the project

I miss only one thing to complete properly in my project: the calendar for the recipes the user put a date for.
The button is working but I have to store the data and display in the UI.

### Potential new features

This is a prospective and, because of that, I don't know if I'll implement the following feature/s.
For the time being the only feature I'm interested to implement is the possibility of displaying the calories of each recipe using the [`spoonacular API`](https://spoonacular.com/food-api).

But, repeating myself, I'm not sure of the implementation of the features written above.

### Important notes

For the time being the app is available only in english and you cannot translate it.
