
import { Platform } from 'react-native'

const IOS_KEY = "582234700902-ig7f4l580aphucm1q69jrtlde7vaus02.apps.googleusercontent.com"
const ANDROID_KEY = "582234700902-bavhkfu7banl64qdealk8t8s43kfb5q4.apps.googleusercontent.com"

export default {
    googleLoginWebClientId: Platform.OS == "ios" ? IOS_KEY : ANDROID_KEY,
    twitterLogin: {
        TWITTER_COMSUMER_KEY: "qWPj1TXbreMX1SsDvdiQTaF7Y",
        TWITTER_CONSUMER_SECRET: "4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z"

    }
};

// 582234700902-bavhkfu7banl64qdealk8t8s43kfb5q4.apps.googleusercontent.com

// 582234700902-gst6f7ovc24nerlu473qehdf4602943k.apps.googleusercontent.com

// 582234700902-ig7f4l580aphucm1q69jrtlde7vaus02.apps.googleusercontent.com