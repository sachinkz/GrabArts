
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContext } from "./shared/contexts/AuthContext"
import { useAuth } from "./shared/hooks/Auth-hook"
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// import ArtistProfile from './user/pages/ArtistProfile';
// import AboutUs from './user/pages/AboutPage';
// import HomePage from './user/pages/HomePage';
// import Login from './user/pages/LoginPage';
// import OrderPage from './user/pages/OrderPage';
// import ViewPosts from './user/pages/ViewPosts';
// import SignupPage from './user/pages/SignupPage';
// import ArtistHome from './Artists/pages/ArtistHome';
// import ArtistLogin from './Artists/pages/ArtistLogin';
// import ArtistSignup from './Artists/pages/ArtistSignup';
// import ArtistProfilePage from './Artists/pages/ArtistProfilePage';
// import MessagesPage from './Artists/pages/MessagesPage';
// import UserOrArtist from './user/pages/UserOrArtist';
// import DeliveryDetails from './user/components/OrderPage/DeliveryDetails';
// import OrderHistory from './user/pages/OrderHistory';
// import MyWorks from './Artists/pages/MyWorks';
// import ArtistVerification from './Artists/pages/ArtistVerification';

const ArtistProfile = lazy(() => import("./user/pages/ArtistProfile"))
const AboutUs = lazy(() => import("./user/pages/AboutPage"))
const HomePage = lazy(() => import("./user/pages/HomePage"))
const Login = lazy(() => import("./user/pages/LoginPage"))
const OrderPage = lazy(() => import("./user/pages/OrderPage"))
const ViewPosts = lazy(() => import("./user/pages/ViewPosts"))
const SignupPage = lazy(() => import('./user/pages/SignupPage'))
const ArtistHome = lazy(() => import('./Artists/pages/ArtistHome'))
const ArtistLogin = lazy(() => import("./Artists/pages/ArtistLogin"))
const ArtistSignup = lazy(() => import("./Artists/pages/ArtistSignup"))
const ArtistProfilePage = lazy(() =>
  import("./Artists/pages/ArtistProfilePage")
)
const MessagesPage = lazy(() => import("./Artists/pages/MessagesPage"))
const UserOrArtist = lazy(() => import("./user/pages/UserOrArtist"))
const DeliveryDetails = lazy(() =>
  import("./user/components/OrderPage/DeliveryDetails")
)
const OrderHistory = lazy(() => import("./user/pages/OrderHistory"))
const MyWorks = lazy(() => import("./Artists/pages/MyWorks"))
const ArtistVerification = lazy(() =>
  import("./Artists/pages/ArtistVerification")
)



const App = () => {

  const {
    artistData,
    userData,
    artistLogIn,
    userLogIn,
    artistLogOut,
    userLogOut,
  } = useAuth()
  
  let routes;
  
  if (userData) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/users" exact>
            <HomePage />
          </Route>
          <Route path="/:artistId/profile" exact>
            <ArtistProfile />
          </Route>
          <Route path="/posts/:postId" exact>
            <ViewPosts />
          </Route>
          <Route path="/order/:artistId" exact>
            <OrderPage />
          </Route>
          <Route path="/address" exact>
            <DeliveryDetails />
          </Route>
          <Route path="/about" exact>
            <AboutUs />
          </Route>
          <Route path="/artist-auth" exact>
            <ArtistLogin />
          </Route>
          <Route path="/order-history" exact>
            <OrderHistory />
          </Route>
          <Redirect to="/users" />
        </Switch>
      </React.Fragment>
    )
  } else if (artistData) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <ArtistHome />
          </Route>
          <Route path="/profile/:artistId" exact>
            <ArtistProfilePage />
          </Route>
          <Route path="/messages" exact>
            <MessagesPage />
          </Route>
          <Route path="/works" exact>
            <MyWorks />
          </Route>
          <Route path="/verify-account" exact>
            <ArtistVerification />
          </Route>
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    )
  } else {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <UserOrArtist />
          </Route>
          <Route path="/users" exact>
            <HomePage />
          </Route>
          <Route path="/:userId/profile" exact>
            <ArtistProfile />
          </Route>
          <Route path="/about" exact>
            <AboutUs />
          </Route>
          <Route path="/auth" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignupPage />
          </Route>
          <Route path="/artist-auth" exact>
            <ArtistLogin />
          </Route>
          <Route path="/artist-signup" exact>
            <ArtistSignup />
          </Route>
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        artistData: artistData,
        userLogIn: userLogIn,
        userLogOut: userLogOut,
        artistLogIn: artistLogIn,
        artistLogOut: artistLogOut,
      }}
    >
      <Router>
        <Suspense
          fallback={
            <div className='center'>
              <LoadingSpinner />
            </div>
          }
        >
          <main>{routes}</main>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  )
};

export default App;