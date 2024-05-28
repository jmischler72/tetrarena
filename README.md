<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jmischler72/tetrarena">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">tetrarena</h3>

  <p align="center">
    A multiplayer game based on tetris made with Svelte, PixiJS and Colyseus
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br =>
    <a style="font-weight: bold" href="https://tetris.joff72.tech">View Demo</a>
    ·
    <a href="https://github.com/jmischler72/tetrarena/issues/new">Report Bug</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
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
    <li><a href="#architecture-of-the-repo
">Architecture of the repo</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Welcome to the tetrarena repo. This project aims to bring the classic Tetris experience to both single-player and competitive multiplayer modes, with additional customization options to enhance your gameplay. Here’s an overview of what this project offers:

### Game Overview

Our game faithfully recreates the classic Tetris experience, but with exciting new features to cater to both solo players and competitive enthusiasts:

- Single-Player Mode: Enjoy the traditional Tetris gameplay on your own. Perfect for practicing your skills or playing at your own pace.

- Multiplayer Ranked Matches: Queue up for a ranked game and compete against other players. Your rank will increase or decrease based on your performance in matches, adding a competitive edge to your Tetris experience.

- Custom Rooms: Create your own game room with customizable options. Invite friends or other players to join and enjoy a personalized Tetris match with your preferred settings.

### User Authentication

When you first enter the game, you'll be logged in as a guest, allowing you to jump straight into the action. However, you can also create an account using your email to unlock additional features:

- Change Username: Personalize your gaming experience by choosing your unique username.
- Save Progress: Keep track of your game statistics and rank across different sessions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Svelte][Svelte.dev]][Svelte-url]
- <img src="https://colyseus.io/images/logos/logo-light-color.png" style="background-color: #4a4a55" alt="Colyseus" width="120"/>
- <img src="https://files.pixijs.download/branding/pixijs-logo-transparent-dark.png"  alt="PixiJs" width="120"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project uses pnpm as the package manager

- Pnpm
  ```sh
  npm install -g pnpm
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/jmischler72/tetrarena.git
   ```
2. Install PNPM packages
   ```sh
   pnpm install
   ```
3. Build packages
   ```sh
   pnpm turbo run build --filter @jmischler72/shared --filter @jmischler72/core
   ```

### Configuration

To enable authentication and real-time data storage, you'll need to set up a Firebase project and configure both the Firebase SDK for your client application and the Firebase Admin SDK for your server.

#### Create a Firebase Project

- Go to [Firebase Console](https://firebase.google.com/)
- Add a New Project: Click on the "Add project" button.
- Project Name: Enter a name for your project (e.g., "Tetris Multiplayer Game").
- Enable Google Analytics (Optional): You can choose to enable Google Analytics for your project.
- Create Project: Click "Create project" and wait for Firebase to set it up.

#### Configure client side

You then need to go to the project settings and create a web application, then copy the `firebaseConfig` and replace the config from `apps/client/src/lib/data/config/firebase.config.ts`

It should look like that:

```
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

```

#### Configure server side

You need to go to the firebase console, in the settings go to **Service Accounts**, click generate new private key.

Then copy the file `.env.example` from `apps/server` to `.env` and copy from the file you just downloaded the variable needed in the environment file, you will also need `DATABASE_URL` shown in **firebase console**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Architecture of the repo

This project is structured as a monorepo, meaning both the client and server codebases are housed within a single repository. This setup facilitates easier management of dependencies, shared code, and versioning, ensuring consistency across the entire project.

The tools used are:

- **PNPM**: package manager that also provides a [workspace feature](https://pnpm.io/fr/workspaces)
- **TurboRepo**: Cache operations such as building

For the different workspaces, there are two apps:

- **client**
- **server**

And two packages:

- **core**: all the game logic
- **shared**: shared types or functions between client and server

This repo also uses **husky** to lint commit messages, they must conform to [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

<!-- USAGE EXAMPLES -->

## Usage

When you have correctly configured **Firebase**, you can then run a dev server with:

```
pnpm turbo run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, you can simply open an issue.
**Don't forget to give the project a star! Thanks!**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joffrey Mischler - [jmischler72](https://github.com/jmischler72) - joffrey.mischlerps@gmail.com

Project Link: [https://github.com/jmischler72/tetrarena](https://github.com/jmischler72/tetrarena)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This project/technical aspects of this repo were inspired by:

- [dmokel/discover-colyseus-phaser](https://github.com/dmokel/discover-colyseus-phaser)
- [PixiJSElementals](https://www.pixijselementals.com/)
- [Colyseus Docs](https://docs.colyseus.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/jmischler72/tetrarena.svg?style=for-the-badge
[stars-url]: https://github.com/jmischler72/tetrarena/stargazers
[issues-shield]: https://img.shields.io/github/issues/jmischler72/tetrarena.svg?style=for-the-badge
[issues-url]: https://github.com/jmischler72/tetrarena/issues
[license-shield]: https://img.shields.io/github/license/jmischler72/tetrarena.svg?style=for-the-badge
[license-url]: https://github.com/jmischler72/tetrarena/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/joffrey-mischler-4038a2214/
[product-screenshot]: images/screenshot.png
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Colyseus]: https://colyseus.io/images/logos/logo-light-color.png
[Colyseus-url]: https://docs.colyseus.io/
