# Google and FB Login in React-Native

React-Native based boiler-plate code for Google, Facebook and Custom Login. All you have to do is get the required files from google firebase for ios/android for google login and an facebook app inside facebook developers for ios/android for FB Login. Further instruction for each platform is given below.

Following Features are implemented

*  Google Login [with ](https://github.com/react-native-community/react-native-google-signin)
* Facebook Login [with](https://github.com/react-native-community/react-native-google-signin)
* Custom Login/Signup (Using our own server)
* Redux
* Redux-Thunk

You also need [this](https://github.com/husnaintahir/nodejs-simple-rest-api) repo for custom login and saving user's basic info from Google and Facebook login, as it was developed 100% for this react-native application.

Clone/download this repo, run `npm install` inside project directory to install required node_modules.

## iOS setup

#### Google Login:


Follow [this](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/get-config-file.md) guide to get the configuration file, and replace it with already available `GoogleService-Info.plist` inside `app-folder/ios/GoogleService-Info.plist`.

Open `GoogleService-Info.plist` and copy `REVERSED_CLIENT_ID`, then Open `Info.plist` from `app-folder/ios/googlefblogin/Info.plist` and replace `your-google-reverserd-client-id` with your own `REVERSED_CLIENT_ID`
    


#### Facebook Login:
Follow [this](https://developers.facebook.com/docs/ios/getting-started/#settings) guide to configure a facebook app for iOS, `Step 1` is must thing to do.

Then replace `Your-fb-id` with the id of your facebook App ID, also replace `fb<Your-fb-id>` with `fbApp ID`.

Reference [Image](https://github.com/husnaintahir/GoogleFBLogin/blob/master/resources/img1.png) given.


That's it for iOS setup, you are good to go to run the app.
 #### If required install PODS on your machine.


##
## Android setup

#### Google Login:
Follow [this](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/get-config-file.md) guid to get configuration file, and replace it with already available `google-services.json`. Complete the required steps to get the configuration file.


#### Facebook Login:
Follow [this](https://developers.facebook.com/docs/android/getting-started/) guide to configure a facebook app for Android. After facebook app is created, open `app-folder/android/app/src/main/res/values/strings.xml` and replace `{your-fb-app-id}` with facebook `APP ID` and `{your-fb-login-protocol-scheme}` with `FB APP Scheme`.

Before running the app make sure you have created Key Hashes and SHA1 for facebook and google login respectively. For Android, having the Key Hashes and SHA1 is  a must for production and debug both build variants.


If you are facing any problem, just open issue, i will try my best to resolve this issue ASAP. Also you can reach me via [Twitter](https://twitter.com/imhusnain1)