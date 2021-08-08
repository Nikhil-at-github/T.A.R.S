import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/home';
import ResultPage from './components/resultPage';

function App() {
  return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/result' component={ResultPage} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
