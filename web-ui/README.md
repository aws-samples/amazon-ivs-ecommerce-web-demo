# Amazon IVS eCommerce Web UI

## Prerequisites 

* [NodeJS](https://nodejs.org/)
* Npm is installed with Node.js
* Amazon IVS eCommerce demo Backend (Optional - see Configuration)

## Running the demo

To get the web demo running, follow these instructions:

1. [Install NodeJS](https://nodejs.org/). Download latest LTS version ("Recommended for Most Users") 
2. Navigate to the web-ui project directory on your local computer
3. Run: npm install
4. Run: npm start
5. Open your web-browser and enter the URL: http://localhost:3000/

## Configuration

The following entries in src\config.js (inside the web-ui project directory) are used to display data in this demo

* USE_MOCK_DATA 
  - Set to "true" to use mock product data. This will not require an eCommerce Backend
  - See ecommerece-web\serverless\README.md for details on the eCommerce Backend configuration

* GET_PRODUCTS_API
  - Uses eCommerce Backend API endpoint for retrieving the products list
  - Set USE_MOCK_DATA to false
  - Use the URL created when deploying eCommerce Backend

* DEFAULT_VIDEO_STREAM
  - Default video stream to play inside the video player

## Limitations

* Search doesn't filter products
* Shopping cart isn't implemented
* Avatar (user image) doesn't show user details
* "Buy Now" button doesn't add items to cart 
* "LIVE with Experts" doesn't link to any live video streams

--------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

https://create-react-app.dev/docs/code-splitting/

### Analyzing the Bundle Size

https://create-react-app.dev/docs/analyzing-the-bundle-size/

### Making a Progressive Web App

https://create-react-app.dev/docs/making-a-progressive-web-app/

### Advanced Configuration

https://create-react-app.dev/docs/advanced-configuration/

### Deployment

https://create-react-app.dev/docs/deployment/

### `npm run build` fails to minify

https://create-react-app.dev/docs/troubleshooting/#npm-run-build-fails-to-minify
