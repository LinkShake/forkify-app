# Forkify Project

## Index

[//]: <> (prettier ignore)

> - [About](https://github.com/LinkShake/forkify-app#about)
> - [Setup](https://github.com/LinkShake/forkify-app#setup):
>   - [Download the code and install all the dependencies](https://github.com/LinkShake/forkify-app#download-the-code-and-install-all-the-dependencies)
> - [Run the project](https://github.com/LinkShake/forkify-app#run-the-project):
>   - Run via CLI and npm
>   - Use the live site
>   - Build the project (optional)
> - Still to implement/potential new features

## About

### The project

Forkify is a web app realized using js, scss and HTML. The goal is to let users search for their favourite recipes, bookmark them, market ingredients, plan some cooking and add their own recipes.

I tried my best to make the app suitable for both desktop and mobile devices and smaller screens!

## Setup

**Important:** To download the dependencies and run the project you need `[Node.js](https://nodejs.org/it/)` and `[npm](https://www.npmjs.com/)` installed on your machine

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

in your command line and press enter.

### Potential issues

If some problems occure during this phase, then check if your `[package.json](/package.json)` file has this structure:

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
npm uninstall `dependency name`
```

and then reinstall them using

```
npm i `dependecy name`
```

To reinstall parcel run

```
npm i parcel --save-dev
```

If this doesn't solve your problem, then go checking [parcel docs](https://parceljs.org/docs/) or see if someone else had a similar problem on [stackoverflow](https://stackoverflow.com/).

## Use the live site

If you prefer not to do everything I mentioned before, you can simply visit the site at:

## Build the project

**Important:** this step **isn't** required in order to run the application.

To build the project run

```
npm run build
```

As always, if some problems occure check your `[package.json](/package.json)`, in particoular your `"build"` script should be like this

```
"build": "parcel build index.html --dist-dir ./dist"
```

and you should have this property

```
"default": "index.html"
```

before the `"script"` tag.

If this doesn't solve your problem check here.

## Still to implement/potential new features

### What misses in the project

I miss only one thing to complete properly in my project: the calendar for the recipes the user put a date for.
The button is working but I have to store the data and display in the UI.

### Potential new features

This is a prospective and, because of that, I don't know if I'll implement the following feature/s.
For the time being the only feature I'm interested to implement is the possibility of displaying the calories of each recipe using the [spoonacular API](https://spoonacular.com/food-api).

But, repeating myself, I'm not sure of the implementation of the features written above.
