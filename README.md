# 🔥 React w/MUI and @timmons-group shared components

<p align="center">
  <img src="./src/assets/olly.jpg" alt="Olly the Octopus" style="max-height:350px;">
</p>

## 📚 Overview

This is a starter repo for a React Application.
What is in this repo?
1. React Typescript application with Vite.
1. [MUI](https://mui.com/material-ui/getting-started/) - React components built on material design
1. [Timmons Group shared components](https://github.com/timmonsgroup/shared-react-components/tree/releases/2.0.x)
    1. Shared React Components - Includes several components built using MUI components
    1. Config Form - Configurable forms using react-hook-form, yup, and based on MUI form components
    1. Shared React Auth - Hooks and methods to facilitate auth with AWS cognito
    1. Shared Auth Config - Methods to help build a config object for use with shared react auth.
    1. AppBar - Standardized Timmons application header bar. Assumes authorization done via useAuth library
1. Material React Table - Powerful data grid built using material components on top of [TanStack Table v2](https://v2.material-react-table.com/)
1. Zustand - global state management. Your project may not need this.
1. react-query - A data fetching library
1. Axios - cause fetch usually ain't it
1. notistack - Library to help use MUI's stackbar across the application

## 💻 Local Dev Setup

### IDE

Recommend [VS Code](https://code.visualstudio.com/). The following VS Code extensions are recommended (see full recommendations in `.vscode/extensions.json`):

- EditorConfig
- ESLint
- SonarLint

### Tools

- [Node JS LTS](https://nodejs.org/en/)

## 🏃‍♂️ How to Run

### Install Dependencies

1. `npm i`

### Run Dev Server

Recommended script for local dev. `start:dev` will start the frontend on port 4000 and the backend on port 4001.
```json
npm run start:dev
```
We use cross env to help with setting env variables.

### Additional NPM Scripts/VS Code Tasks

See that `package.json` for additional useful scripts.

TODO: expand this section as needed.

## 🙋‍♀️ Who do I Talk to?

- Chaz Mateer
- Bryant Overgard
- Nathan Grant
