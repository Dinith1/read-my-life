import * as React from 'react';
import './App.css';
import ControlBar from './components/ControlBar';
import StoryDisplay from './components/StoryDisplay';
import StoryList from './components/StoryList';
import TagList from './components/TagList';

interface IState {
  stories: any[],
  storiesCopy: any[],
  storyToRead: any,
  currentTag: string,
  isRead: boolean
}

export default class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.fetchStoriesByTag("all")
    this.state = {
      stories: [],
      storiesCopy: [],
      storyToRead: null,
      currentTag: "all",
      isRead: false,
    }

    this.searchTitle = this.searchTitle.bind(this)
    this.searchAuthor = this.searchAuthor.bind(this)
    this.searchStory = this.searchStory.bind(this)
    this.readStory = this.readStory.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.selectTag("all")
  }

  public render() {
    return (
      <div>
        <div className="header-wrapper">
          <div className="title-wrapper">
            <div className="title">Read My Life</div>
            <div className="subtitle">Read and share the stories of your life</div>
          </div>
        </div>

        <div className="control-wrapper">
          <ControlBar searchTitle={this.searchTitle} searchAuthor={this.searchAuthor} currentTag={this.state.currentTag}/>
        </div>

        <div className="body-wrapper">
          <div className="body">
            <div className="body-tags">
              <TagList selectTag={this.selectTag} />
            </div>

            <div className="body-list">
              {(!this.state.isRead)
                ? <StoryList stories={this.state.stories} readStory={this.readStory} currentTag={this.state.currentTag} />
                : <StoryDisplay story={this.state.storyToRead} />}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Go to the page for the selected story
  private readStory(story: any) {
    this.setState({
      isRead: true,
      storyToRead: story
    })
  }

  // Show stories with the specified tag
  private selectTag(tag: any) {
    this.setState({
      isRead: false,
      currentTag: tag
    })
    this.fetchStoriesByTag(tag)
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchTitle(title: string) {
    this.searchStory(title, true)
  }

  // Filter the currently displayed stories to show those by the chosen title
  private searchAuthor(author: any) {
    this.searchStory(author, false)
  }

  // Helper function for searchTitle() and searchAuthor()
  private searchStory(str: string, isTitle: boolean) {
    const searchResults = []
    const test = (isTitle) ? "title" : "authorName"
    for (const story of this.state.storiesCopy) {
      if (story[test].toLowerCase().includes(str.toLowerCase())) { searchResults.push(story) }
    }

    if (searchResults.length === 0) {
      alert("ERROR NO ITEMS")
    } else {
      this.setState({ stories: searchResults })
    }
  }

  // READ all stories from the API with the specified tag
  private fetchStoriesByTag(tag: string) {
    let url = "https://readmylife.azurewebsites.net/api/Story"
    if (tag !== "all") {
      url += "/tag/" + tag
    }

    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        const currentStory = json[0]
        if (currentStory === undefined) {
          json = []
        }

        this.setState({
          stories: json,
          storiesCopy: json
        })
      })

    // return [
    //   {
    //     authorName: "oiasjdoisg",
    //     contents: "lorem ipsum... blah blah blah... I like dogs",
    //     description: "1111111111111111111111111111111111111",
    //     rating: 2.5,
    //     tag: "sad",
    //     title: "92921389",
    //   },
    // {
    //   author: "Mario and Luigi",
    //   contents: "The quick brown fox jumped over the lazy doggggggggggggggggggggggggggggggggggggg",
    //   description: "././;.ddddasdbbbqg32r1r3bbbwrbrnrenrenernernwebweb",
    //   rating: 3.2,
    //   tag: "scary",
    //   title: "dinner",
    // },
    // {
    //   author: "J.K Rowling",
    //   contents: "The quick brownnnnnnnnnnnnnnnnnnnnn fox jumped ooooooooooooooooooooover the lazy dog",
    //   description: "Yer a Wizard, Harry!",
    //   rating: 4,
    //   tag: "strange",
    //   title: "Harry Potter",
    // }
    // ]


  }

}