# Coinsane Client – React (Web + Native)

## 👋 Intro

- A shared React and React Native structure
- __Flux architecture__
    - [Redux](https://redux.js.org/docs/introduction/)
- __Routing and navigation__
    - [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) for native mobile
    - [React Router](https://github.com/ReactTraining/react-router) for web
- __Data Caching / Offline__
    - [Redux Persist](https://github.com/rt2zz/redux-persist)
- __UI Toolkit/s__
    - [Native Base](https://nativebase.io/) for native mobile
    - [Bootstrap](https://getbootstrap.com/) for web
- __Code Linting__ with
    - [Airbnb's JS Linting](https://github.com/airbnb/javascript) guidelines

---

## 📖 Docs

- [Understanding the file structure](/docs/file-structure.md)
- [FAQs & Opinions](/docs/faqs.md)
- [Testing, Deploying & Publishing](/docs/publishing.md)
- [Tests & testing](/docs/testing.md) (coming soon...)
- [Contributing to this project](/docs/contributing.md)

---

## 🚀 Getting Started

#### 1. Clone and Install

```bash
# Clone the repo
git clone https://gitlab.com/coinsane-org/coinsane-client.git

# Install dependencies
yarn

# Link native modules
react-native link
```

#### 2.1. Run the _React Native_ App

```bash
# Start the React Native for iOS
yarn ios

# Start the React Native for Android
yarn android
```


#### 2.2. Run the _Web_ App (Not inplemented yet)

```bash
# Starts are local live-reload server at:
# http://localhost:3001
npm run web
```

Via webpack, starts a localhost server on port 3001 [http://localhost:3001](http://localhost:3001).

- Save code and it auto refreshes
- Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) into Chrome to see the state of Redux

#### 3. Troubleshooting

```bash
# if build failed after adding new modules `'config.h' file not found`
cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```

```bash
# if fastline doesn'r deploy add transporter parameter
DELIVER_ITMSTRANSPORTER_ADDITIONAL_UPLOAD_PARAMETERS="-t DAV" fastlane
```
