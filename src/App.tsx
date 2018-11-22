import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import ControlBar from './components/ControlBar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import StoryDisplay from './components/StoryDisplay';
import StoryList from './components/StoryList';
import TagList from './components/TagList';
// import MediaStreamRecorder from 'msr';

interface IState {
  stories: any[],
  storiesCopy: any[],
  storyToRead: any,
  currentTag: string,
  isRead: boolean,
  openCreateStory: boolean,
  isEdit: boolean;
  createTitle: string,
  createDescription: string,
  createTag: string,
  createContents: string,
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
      openCreateStory: false,
      isEdit: false,
      createTitle: "",
      createDescription: "",
      createTag: "funny",
      createContents: ""
    }

    this.searchTitle = this.searchTitle.bind(this)
    this.searchAuthor = this.searchAuthor.bind(this)
    this.searchStory = this.searchStory.bind(this)
    this.readStory = this.readStory.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.openStoryFormCreate = this.openStoryFormCreate.bind(this)
    this.openStoryFormEdit = this.openStoryFormEdit.bind(this)
    this.closeStoryForm = this.closeStoryForm.bind(this)
    this.createStory = this.createStory.bind(this)
    this.selectTag("all")

    this.test = this.test.bind(this)
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
          <ControlBar searchTitle={this.searchTitle} searchAuthor={this.searchAuthor} currentTag={this.state.currentTag} createStory={this.openStoryFormCreate} isRead={this.state.isRead} />
        </div>

        <div className="body">
          <div className="body-tags">
            <TagList selectTag={this.selectTag} />
          </div>

          <div className="body-list">
            {(!this.state.isRead)
              ? <StoryList stories={this.state.stories} readStory={this.readStory} currentTag={this.state.currentTag} />
              : <StoryDisplay story={this.state.storyToRead} test={this.test} />}
          </div>
        </div>

        <Modal open={this.state.openCreateStory} onClose={this.closeStoryForm}>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" id="story-title-input" value={(this.state.isEdit) ? this.state.storyToRead.title : ""} placeholder="Enter Title" maxLength={20} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input type="text" className="form-control" id="story-description-input" value={(this.state.isEdit) ? this.state.storyToRead.description : ""} placeholder="Enter a short description" maxLength={30} />
            </div>

            <div className="form-group">
              <FormControl required className="form-control" id="story-tag-input">
                <InputLabel htmlFor="tag-required">Tag</InputLabel>
                <Select id="tag-select" className="form-control" value={this.state.createTag} name="createTag" inputProps={{ id: 'tag-required', }} onChange={(evt) => { this.setState({ createTag: evt.target.value }) }}>
                  <MenuItem value="funny">Funny</MenuItem>
                  <MenuItem value="happy">Happy</MenuItem>
                  <MenuItem value="love">Love</MenuItem>
                  <MenuItem value="sad">Sad</MenuItem>
                  <MenuItem value="scary">Scary</MenuItem>
                  <MenuItem value="strange">Strange</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </div>

            <div className="form-group">
              <label>Story</label>
              <input type="text" className="form-control-contents" id="story-contents-input" maxLength={500} placeholder="Write your story (max length = 500 characters)" />
            </div>

            <button type="submit" className="btn" onClick={this.createStory}>Publish</button>
          </form>
        </Modal>

      </div>
    );
  }

  private openStoryFormCreate() {
    this.setState({
      openCreateStory: true,
      isEdit: false
    })
  }

  private openStoryFormEdit() {
    this.setState({
      createTag: this.state.storyToRead.tag,
      openCreateStory: true,
      isEdit: true
    })
  }

  private closeStoryForm() {
    this.setState({ openCreateStory: false })
  }

  private createStory() {
    return
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
  }




  private test() {
    return
    // const mediaConstraints = {
    //   audio: true
    // }
    // const onMediaSuccess = (stream: any) => {
    //   const mediaRecorder = new MediaStreamRecorder(stream);
    //   mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    //   mediaRecorder.ondataavailable = (blob: any) => {
    //     // this.postAudio(blob);
    //     mediaRecorder.stop()
    //   }
    //   mediaRecorder.start(3000);
    // }

    // navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
  
    // private onMediaError(e: any) {
    //   console.error('media error', e);
    // }
  }

}