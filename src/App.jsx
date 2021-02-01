import './App.scss';
import Profile from './components/Profile';

function App() {
  return (
    <div className="application">
      <Profile
        name="Benjamin Lee"
        avatar="https://avatars.githubusercontent.com/u/49013733?s=460&u=fbf17ee4f03bd40c070f37520709f692fdaecba0&v=4"
        title="Junior Full Stack Developer"
      />
    </div>
  );
}

export default App;
