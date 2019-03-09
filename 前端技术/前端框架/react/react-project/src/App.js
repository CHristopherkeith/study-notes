import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Prompt} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        {/*<li>
          <Prompt message="Are you sure you want to leave?"/>
        </li>*/}
        {/*<li>
          <Redirect to="/topics" />
        </li>*/}
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

// const Topics = ({ match, location }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

const Topics = function({ match, location }){
  console.log(match, '【match】')
  console.log(location, '【location】')
  return <div>
    <h2>Topics</h2>
    <div>{location.pathname}</div>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
};

const Topic = ({ match }) => {
  console.log(match, '【match11】')
  return (<div>
    <h3>{match.params.topicId}</h3>
  </div>)
};

// const Topic = function({ match }){
//   console.log(match, '【match11】')
//   return <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// };

export default BasicExample;
