import * as React from 'react';
import './App.css';
import StoryList from './components/StoryList';
import TagList from './components/TagList';

const storylist: any =
  [
    [{
      author: "Dinith Wanngiama",
      description: "I LIKE TO EAT FOOD",
      title: "dinner",
    }],
    [{
      author: "oiasjdoiasfnasg",
      description: "1111111111111111111111111111111111111",
      title: "92921389",
    }],
  ]


export default class App extends React.Component {
  public render() {
    return (
      <div>

        <div className="header-wrapper">
          <h1>Read My Life</h1>
        </div>

        <div className="body-wrapper">
          <div className="body">
            <div className="body-tags">
              <TagList />
            </div>

            <div className="body-list">
              <StoryList stories={storylist} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}