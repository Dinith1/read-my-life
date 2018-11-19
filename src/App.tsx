import * as React from 'react';
import './App.css';
import StoryList from './components/StoryList';
import TagList from './components/TagList';

const storylist: any =
  [
    [{
      author: "Dinith Wanngiama",
      description: "I LIKE TO EAT FOOD",
      rating: 5,
      title: "dinner",
    }],
    [{
      author: "oiasjdoiasfnasg",
      description: "1111111111111111111111111111111111111",
      rating: 2.5,
      title: "92921389",
    }],
    [{
      author: "Dinith Wanngiama",
      description: "I LIKE TO EAT FOOD",
      rating: 5,
      title: "dinner",
    }],
    [{
      author: "Dinith Wanngiama",
      description: "I LIKE TO EAT FOOD",
      rating: 5,
      title: "dinner",
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
              <StoryList stories={storylist} read={null} searchTitle={null} searchAuthor={null}/>
            </div>
          </div>
        </div>

      </div>
    );
  }
}