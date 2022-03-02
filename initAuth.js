import { init } from 'next-firebase-auth';

const initAuth = () => {
    init({
        authPageURL: '/login',
        appPageURL: '/',
        loginAPIEndpoint: '/api/login', // required
        logoutAPIEndpoint: '/api/logout', // required
        onLoginRequestError: (err) => {
          console.error(err)
        },
        onLogoutRequestError: (err) => {
          console.error(err)
        },
        firebaseAdminInitConfig: {
          credential: {
            projectId: 'my-shop-62f2d',
            clientEmail: 'firebase-adminsdk-pi6kz@my-shop-62f2d.iam.gserviceaccount.com',
            // The private key must not be accessible on the client side.
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
          },
        },
        // Use application default credentials (takes precedence over fireaseAdminInitConfig if set)
        // useFirebaseAdminDefaultCredential: true,
        firebaseClientInitConfig: {
          apiKey: "AIzaSyASG5jb94A9hdAPmzBAMs-8hJQzn6FkDl0",
          authDomain: "my-shop-62f2d.firebaseapp.com",
          projectId: "my-shop-62f2d",
          storageBucket: "my-shop-62f2d.appspot.com",
          messagingSenderId: "910614255158",
          appId: "1:910614255158:web:08d1e007389692e8f12a97"
        },
        cookies: {
          name: 'shop-session', // required
          // Keys are required unless you set `signed` to `false`.
          // The keys cannot be accessible on the client side.
          keys: [
            process.env.COOKIE_SECRET_CURRENT,
            process.env.COOKIE_SECRET_PREVIOUS,
          ],
          httpOnly: true,
          maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
          overwrite: true,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true', // set this to false in local (non-HTTPS) development
          signed: true,
        }
    });

}

export default initAuth;