# Coinsane Client – React Native

## 🚀 Getting Started

#### 1. Clone and Install

```bash
# Clone the repo
git clone https://gitlab.com/coinsane-org/coinsane-client.git

# Install dependencies
yarn
```

#### 2. Run the _React Native_ App

```bash
# Start the React Native for iOS
yarn ios

# Start the React Native for Android
yarn android
```

#### 3. Troubleshooting

```bash
# if build failed after adding new modules `'config.h' file not found`
cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```

```bash
# if fastline doesn'r deploy add transporter parameter
DELIVER_ITMSTRANSPORTER_ADDITIONAL_UPLOAD_PARAMETERS="-t DAV" fastlane
```
