import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigateLiveChat from './NavigateLiveChat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <NavigateLiveChat />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
