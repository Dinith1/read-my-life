import * as React from 'react';
import './App.css';
import StoryDisplay from './components/StoryDisplay';
import StoryList from './components/StoryList';
import TagList from './components/TagList';

interface IState {
  stories: any[],
  storiesCopy: any[],
  currentTag: string,
  isRead: boolean
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    const initialStories = this.fetchStoriesByTag("all")
    this.state = {
      stories: initialStories,
      storiesCopy: initialStories,
      currentTag: "all",
      isRead: false
    }

    this.searchTitle = this.searchTitle.bind(this)
    this.searchAuthor = this.searchAuthor.bind(this)
    this.readStory = this.readStory.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.selectTag("all")
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
              <TagList selectTag={this.selectTag} />
            </div>

            <div className="body-list">
              {(!this.state.isRead)
                ? <StoryList stories={this.state.stories} readStory={this.readStory} searchTitle={this.searchTitle} searchAuthor={this.searchAuthor} />
                : <StoryDisplay />}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Go to the page for the selected story
  private readStory(story: any) {
    story = story[0]
    this.setState({ isRead: true })
  }

  // Show stories with the specified tag
  private selectTag(tag: any) {
    this.setState({
      isRead: false,
      currentTag: tag,
      stories: this.fetchStoriesByTag(tag),
      storiesCopy: this.fetchStoriesByTag(tag),
    })
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchTitle(title: any) {
    const searchResults = []
    for (let story of this.state.storiesCopy) {
      story = story[0]
      if (story.title.toLowerCase().includes(title.toLowerCase())) { searchResults.push([story]) }
    }

    if (searchResults.length === 0) {
      alert("ERROR NO ITEMS")
    } else {
      this.setState({ stories: searchResults })
    }
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchAuthor(author: any) {
    alert("SEARCHING BY AUTHOR: " + author)
  }

  // READ all stories from the API with the specified tag
  private fetchStoriesByTag(tag: string) {

    return [
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
        tag: "strange",
        title: "Harry Potter",
      }],
    ]


  }

}