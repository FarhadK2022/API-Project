import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpotsPage from "./components/Spots";
import GetOneSpotPage from "./components/Spot";
import CreateSpotFormModal from "./components/CreateSpotFormModal"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <div className="create-spot">
            <CreateSpotFormModal/>
            </div>
            <GetAllSpotsPage />
          </Route>
          <Route path="/spots/:spotId">
            <GetOneSpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
