import { BrowserRouter, Switch, Route, Link, useParams  } from "react-router-dom";

import News from './components/News'
import New from './components/New'
import { useDispatch, Provider, useSelector } from "react-redux";

import store from './store/store';

function Topic() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state);

  let { topicId } = useParams();

  return <div>
    <h3>
    Requested topic ID: {topicId}</h3>
    
    </div>;
}

function App(){
  
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/new/:topicId">          
            <New  />
          </Route>
          <Route exact path="/">
            <News/>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
