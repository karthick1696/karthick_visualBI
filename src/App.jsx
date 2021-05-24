import { Redirect, Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Music from './containers/Music';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/music"
          component={Music} />
        <Redirect
          from="*"
          to="/music" />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
