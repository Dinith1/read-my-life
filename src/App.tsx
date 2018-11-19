import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div>

        <div className="header-wrapper">
            <h1>Read My Life</h1>
        </div>

        <div className="body-wrapper">
          <div className="body">
            <div className="body-tags">
              TAGS WILL GO HERE
            </div>

            <div className="body-list">
              LIST WILL GO HERE
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
