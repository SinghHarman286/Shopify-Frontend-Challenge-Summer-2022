# Shopify Frontend Challenge Summer 2022
Hi there, this is my submission for the [Shopify Summer Frontend Developer Challenge](https://www.shopify.ca/careers/frontend-developer-intern-summer-2022-remote-us-canada_e4d4fb64-21c6-421c-b889-a51195090d5b)

## The app is deployed at https://spacestagram-shopify-harman.herokuapp.com/
#### :warning: Since I am using free version of Heroku, It might take some time to load the app. Thank you for your patience!

## Tech Stack:
- React.JS
- TypeScript
- Ant Design

## Features
### This app has following features:
1. **Infinite scroll**: Uses [NASA API](https://api.nasa.gov) and fetches 10 images at a time in chronological order enabling infinite scroll
2. **Display descriptive data**: Displays resulting images with their description, and date in a reusable card with the feature of "Read-More/Read-Less"
3. **Liking and Unliking images**: Provides a button (i.e. heart button) for users to like or dislike an image. The button turns "pink" when user likes the image and turns grey (default) when user unlikes the image
4. **Storing Liked Posts**: Utilises localStorage in order to save the images liked even if the page is reloaded
5. **Liked Post Page**: Displays all the liked images with an additional functionality to remove the image from liked post page (same as unliking the image from the home page)
6. **Copying URL**: Each image has a "copy button" which copies the image url to clipboard
7. **Loading screen**: An animated card skeleton appears as a loading screen while making the network request to NASA API

## :warning: Warnings:
1. During my time testing the [NASA API](https://api.nasa.gov), I noticed that the API is occassionally non-functional (especially during the evening time). In order to handle the failure, the app shows an alert and reloads the page in order to make network request again


Thanks for taking the time to view my project :))
