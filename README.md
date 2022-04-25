<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/stanleyclaudius/chat-app">
    <img src="client/public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chat Application</h3>

  <p align="center">
    An awesome chat application based on website
    <br />
    <a href="https://github.com/stanleyclaudius/chat-app.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://web-inspace.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/stanleyclaudius/chat-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/stanleyclaudius/chat-app/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

**Chat Application** is a web application that allows their user to communicate with each other. This application has realtime messageing feature, search people by their ID, add friend, audio and video call, voice recorder, and other cool features as well, of course with the support of complete authentication flow.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [MongoDB](https://mongodb.com/cloud/atlas/)
* [Node.js](https://nodejs.org/)
* [Heroku](https://herokuapp.com/)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have package manager (either npm or yarn)

>**FYI**: This project uses **npm** as package manager, but you're free to use **yarn** too.

* Install Yarn (Only for user who want to use **yarn**)
  ```
  npm i -g yarn
  ```

### Installation

Below steps will guide you through the local installation process of this application

1. Get your **Google Client ID**, **Google Client Secret**, and also **GMail Refresh Token** from [here](https://console.developers.google.com/)
2. Get your facebook app ID at [here](https://developers.facebook.com/)
3. Get your MongoDB cloud connection at [here](https://mongodb.com/cloud/atlas/)
4. Clone the repo
   ```
   git clone https://github.com/stanleyclaudius/chat-app.git
   ```
7. Install project dependency<br />
Make sure that your terminal pointing at the root directory of this project (chat-app folder).
   ```
   npm i && cd client && npm i
   ```
8. Complete the .env variable<br/>
Rename .env.example file at ```server/config``` directory become ```.env```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What To Fill | Example Value |
    | :---: | :---: | :---: |
    | PORT | Your server port | 5000 |
    | CLIENT_URL | Your client side URL | http://localhost:3000 |
    | MONGO_URL | Your MongoDB URL | mongodb://user:user1234@main-shardxxxx |
    | ACCESS_TOKEN_SECRET | Random complex string for JWT | DUhxdx183)_--aACN#2%
    | REFRESH_TOKEN_SECRET | Random complex string for JWT | 17hdjcD7ud(-*&732~
    | ACTIVATION_TOKEN_SECRET | Random complex string for JWT | kc81i^&%`-Did##1Z
    | GOOGLE_CLIENT_ID | Your google client ID | 3392348929324-tarur228dxxx |
    | GOOGLE_CLIENT_SECRET | Your google client secret | GOCSPX-xxxxxxx |
    | GMAIL_REFRESH_TOKEN | Your gmail refresh token | 1//028dhdjBMudu2829xxx |
    | MAIL_SENDER_ADDRESS | Email that want to be used to send mail | example@gmail.com |
9. Complete the constant.ts value<br />
Rename constant.example.ts file at ```client/src/utils``` directory become ```constant.ts```, then fill the value for every constant. Below is the guideline for filling the constant.ts value:<br />
    | Key | What To Fill | Example Value |
    | :---: | :---: | :---: |
    | GOOGLE_CLIENT_ID | Your google client ID | 3392348929324-tarur228dxxx |
    | FACEBOOK_APP_ID | Your facebook app ID | 18239943847394 |
10. Lastly, run below command at your terminal to spin off the application
    ```
    npm run dev && cd client && npm start
    ```

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanley-claudius-4560b21b7)

Project Link: [https://github.com/stanleyclaudius/chat-app](https://github.com/stanleyclaudius/chat-app)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [React Icons](https://react-icons.github.io/react-icons/) for providing icon to be used in this application.
* [Tailwind CSS](https://tailwindcss.com/) for providing CSS framework to be used in this application.
* [Heroku](https://herokuapp.com) for providing hosting service for this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/stanleyclaudius/chat-app.svg?style=for-the-badge
[forks-url]: https://github.com/stanleyclaudius/chat-app/network/members
[stars-shield]: https://img.shields.io/github/stars/stanleyclaudius/chat-app.svg?style=for-the-badge
[stars-url]: https://github.com/stanleyclaudius/chat-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/stanleyclaudius/chat-app.svg?style=for-the-badge
[issues-url]: https://github.com/stanleyclaudius/chat-app/issues
[license-shield]: https://img.shields.io/github/license/stanleyclaudius/chat-app.svg?style=for-the-badge
[license-url]: https://github.com/stanleyclaudius/chat-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanley-claudius-4560b21b7