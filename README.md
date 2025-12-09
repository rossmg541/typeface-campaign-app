# Typeface Campaign App

A React-based landing page for generating on-brand campaigns instantly, built to match the Typeface design specifications.

## Design Specifications

### Colors
- **Primary Red**: `#FD243E` (logo, "instantly" text, CTA buttons)
- **Background Gradient**: `linear-gradient(180deg, #F4F4F4 0%, #D9D9D9 100%)`
- **Text Black**: `#111013`
- **Text Gray**: `rgba(17, 16, 19, 0.6)`

### Typography
- **Font Family**: Suisse Int'l
- **Main Headline**: 51.6px, weight 400
- **Subheading**: 16px, weight 450
- **Navigation**: 15px, weight 400
- **Button Text**: 15px, weight 500

### Layout
- **Input Field**: 620x62px with 16px top padding, 12px right/bottom/left padding
- **Responsive**: Adapts to mobile and tablet screens

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Structure

```
typeface-campaign-app/
├── public/
├── src/
│   ├── assets/
│   │   ├── Logo.png
│   │   ├── Arrow_branch.png
│   │   └── 3d-documents.png
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Features

- Fully responsive design
- Exact color matching to design specs
- Custom Suisse Int'l font integration
- Smooth hover animations
- Clean, modern UI
- Form submission handling (ready for backend integration)

## Customization

To modify the form submission behavior, update the `handleSubmit` function in `src/App.js`:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('URL submitted:', url);
  // Add your URL processing logic here
};
```
