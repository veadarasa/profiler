import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigateLiveChatOne from './NavigateLiveChatOne';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <NavigateLiveChatOne />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
