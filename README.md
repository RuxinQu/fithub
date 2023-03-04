# FitHub

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![react router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Apollo graphql](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)
![graphql](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![mui](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## Description

View deployed website: [![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://fithub-fitness.herokuapp.com)

This project is a fitness app that allows users to find a exercise. Users can login/signup and look for exercises by different bodyparts, view the details and then save the ones they like.

## Table of Contents

- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Google lighthouse report](#google-lighthouse-report)
- [Credits](#credits)
- [License](#license)

## Usage

1. Users can search and browse workouts and click the View Detail button to see more detail.
2. To save/remove workouts, users need to Login/Signup.
3. Users can view the saved workouts from My Workout page.
4. For better user experience, there's a light/dark mode switch on the top menu.

5. Project screenshots

   ![login](./client/public/assets/login.png) ![search](./client/public/assets/search.png)

## Technologies Used

- React: Front end is built with React. React Route enables the page navigarion.
- Redux: [Redux Toolkit](https://redux-toolkit.js.org) is used to create reducers and handle async request lifecycles from [Exercise DB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb).
- Express
- GraphQL && Apollo
- MongoDB && Mongoose
- JWT
- IndexedDB: to save the exercise data from Exercise DB API to the client side.
- [Lazy loading image](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading): Used [react-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component) to allow lazy loading images and improve web performance.
- [lossless compression](https://developer.mozilla.org/en-US/docs/Glossary/Lossless_compression): Used [compress-create-react-app](https://www.npmjs.com/package/compress-create-react-app) and [express-static-gzip](https://www.npmjs.com/package/express-static-gzip) packages to enable both [gzip](https://www.gzip.org) compression and [brotli](https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression) compression, which significantly reduced the application load time.
- This website is a PWA and meat responsive design.

## Google-lighthouse-report

- Google lighthouse report for **desktops**:
  ![desktop-lighthouse-report](./client/public/assets/lighthouse-pc.png)

## Credits

- [Christopher Saechao](https://github.com/TikoMyster)
- [RuxinQu](https://github.com/RuxinQu)
- [Richard Nelson](https://github.com/nelson92)
- [Lely Huynh](https://github.com/lely2011)

## License

This project is under [MIT license](https://opensource.org/lsicenses/MIT)
