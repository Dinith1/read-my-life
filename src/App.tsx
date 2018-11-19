import * as React from 'react';
import './App.css';
import StoryList from './components/StoryList';
import TagList from './components/TagList';

interface IState {
  stories: any[],
  currentTag: string
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      stories: [
        [{
          author: "Dinith Wanngiama",
          description: "I LIKE TO EAT FOOD",
          rating: 5,
          tag: "funny",
          title: "dinner",
        }],
        [{
          author: "oiasjdoiasfnasg",
          description: "1111111111111111111111111111111111111",
          rating: 2.5,
          tag: "sad",
          title: "92921389",
        }],
        [{
          author: "Mario and Luigi",
          description: "././;.ddddasdbbbqg32r1r3bbbwrbrnrenrenernernwebweb",
          rating: 3.2,
          tag: "scary",
          title: "dinner",
        }],
        [{
          author: "J.K Rowling",
          description: "Yer a Wizard, Harry!",
          rating: 4,
          tag: "Strange",
          title: "Harry Potter",
        }],
      ],
      currentTag: "all"
    }

    this.searchTitle = this.searchTitle.bind(this)
    this.searchAuthor = this.searchAuthor.bind(this)
    this.readStory = this.readStory.bind(this)
  }

  public render() {
    return (
      <div>

        <div className="header-wrapper">
          <h1>Read My Life</h1>
          <h4>Read and share the stories of your life</h4>
        </div>

        <div className="body-wrapper">
          <div className="body">
            <div className="body-tags">
              <TagList selectTag={null} />
            </div>

            <div className="body-list">
              <StoryList stories={this.state.stories} readStory={this.readStory} searchTitle={this.searchTitle} searchAuthor={this.searchAuthor} />
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Go to the page for the selected story
  private readStory(story: any) {
    story = story[0]
    alert("Author: " + story.author + "\nTitle: " + story.title + "\n ...")
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchTitle(title: any) {
    alert("SEARCHING BY TITLE: " + title)
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchAuthor(author: any) {
    alert("SEARCHING BY AUTHOR: " + author)
  }

}