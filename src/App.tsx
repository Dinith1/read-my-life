import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import ControlBar from './components/ControlBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import StoryDisplay from './components/StoryDisplay';
import StoryList from './components/StoryList';
import TagList from './components/TagList';
import Button from 'react-bootstrap/lib/Button';
import * as Webcam from 'react-webcam';

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
  devLogin: boolean,
  devAuthenticated: boolean,
  refCamera: any,
  wantToDelete: boolean
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
      createContents: "",
      devLogin: false,
      devAuthenticated: false,
      wantToDelete: false,
      refCamera: React.createRef()
    }

    this.searchTitle = this.searchTitle.bind(this)
    this.searchAuthor = this.searchAuthor.bind(this)
    this.searchStory = this.searchStory.bind(this)
    this.readStory = this.readStory.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.openStoryFormCreate = this.openStoryFormCreate.bind(this)
    this.openStoryFormEdit = this.openStoryFormEdit.bind(this)
    this.closeStoryForm = this.closeStoryForm.bind(this)
    this.confirmForm = this.confirmForm.bind(this)
    this.createStory = this.createStory.bind(this)
    this.deleteStory = this.deleteStory.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.closeDelete = this.closeDelete.bind(this)
    this.openFaceLogin = this.openFaceLogin.bind(this)
    this.closeFaceLogin = this.closeFaceLogin.bind(this)
    this.authenticateFace = this.authenticateFace.bind(this)
    this.deleteYes = this.deleteYes.bind(this)
    this.selectTag("all")
  }

  public render() {
    return (
      <div>
        <div className="header-wrapper">
          <div className="title-wrapper">
            <div className="title-a">Read My Life</div>
            <div className="subtitle">Read and share the stories of your life</div>
          </div>

          <div className="login">
            <Button bsStyle="warning" onClick={this.openFaceLogin}>Developer Login</Button>
            {(this.state.devAuthenticated) ? <div className="logged-in" id="logged-in">Logged in as Developer</div> : ""}
            <Modal open={this.state.devLogin} onClose={this.closeFaceLogin} closeOnOverlayClick={false} showCloseIcon={true} center={true}>
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                ref={this.state.refCamera}
              />
              <div className="row nav-row">
                <div className="btn btn-primary bottom-button" onClick={this.authenticateFace}>Login</div>
              </div>
            </Modal>
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
              : <StoryDisplay story={this.state.storyToRead} deleteStory={this.deleteStory} />}
          </div>
        </div>

        <Modal open={this.state.openCreateStory} onClose={this.closeStoryForm}>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control-title" id="story-title-input" defaultValue={(this.state.isEdit) ? this.state.storyToRead.title : ""} placeholder="Enter Title (max 25 characters)" maxLength={25} />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input type="text" className="form-control-author" id="story-author-input" defaultValue={(this.state.isEdit) ? this.state.storyToRead.authorName : ""} placeholder="Enter your name (max 25 characters)" maxLength={25} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control-description" id="story-description-input" defaultValue={(this.state.isEdit) ? this.state.storyToRead.description : ""} placeholder="Enter a short description (max 30 characters)" maxLength={30} />
            </div>

            <div className="form-group">
              <FormControl required className="form-control" id="story-tag-input">
                <InputLabel className="form-control-tag" htmlFor="tag-required">Tag</InputLabel>
                <Select id="tag-select" className="form-control-tag" value={this.state.createTag} name="createTag" inputProps={{ id: 'tag-required', }} onChange={(evt) => { this.setState({ createTag: evt.target.value }) }}>
                  <MenuItem value="funny">Funny</MenuItem>
                  <MenuItem value="happy">Happy</MenuItem>
                  <MenuItem value="love">Love</MenuItem>
                  <MenuItem value="sad">Sad</MenuItem>
                  <MenuItem value="scary">Scary</MenuItem>
                  <MenuItem value="strange">Strange</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group">
              <label>Story</label>
              <textarea className="form-control-contents" id="story-contents-input" defaultValue={(this.state.isEdit) ? this.state.storyToRead.contents : ""} maxLength={5000} placeholder="Write your story (max 5000 characters)" />
            </div>

            <button type="submit" className="btn" onClick={this.confirmForm}>Publish</button>
          </form>
        </Modal>

        <Modal open={this.state.wantToDelete} onClose={this.closeDelete}>
          <form>
            <div>
              <label >Confirm Delete?</label>
              <Button type="submit" onClick={this.deleteYes}>Confirm</Button>
              <Button type="submit" onClick={this.closeDelete}>Cancel</Button>
            </div>
          </form>
        </Modal>

      </div >
    );
  }

  // Open form for writing a story
  private openStoryFormCreate() {
    this.setState({
      openCreateStory: true,
      isEdit: (this.state.storyToRead != null)
    })
  }

  // Open form to edit a stroy
  private openStoryFormEdit() {
    this.setState({
      createTag: this.state.storyToRead.tag,
      openCreateStory: true,
      isEdit: true
    })
  }

  // Close create/edit story form
  private closeStoryForm() {
    this.setState({ openCreateStory: false })
  }

  // Confirm the fields entered in the form
  private confirmForm() {
    if (this.state.isEdit) {
      this.editStory()
    } else {
      this.createStory()
    }
  }

  // Make a POST request to create a story
  private createStory() {
    const titleInput = document.getElementById("story-title-input") as HTMLInputElement
    const authorInput = document.getElementById("story-author-input") as HTMLInputElement
    const descriptionInput = document.getElementById("story-description-input") as HTMLInputElement
    const contentsInput = document.getElementById("story-contents-input") as HTMLInputElement

    if (titleInput === null || authorInput === null || descriptionInput === null || contentsInput === null) {
      return;
    }

    const title = titleInput.value
    const author = authorInput.value
    const description = descriptionInput.value
    const tag = this.state.createTag
    const contents = contentsInput.value

    const url = "https://readmylife.azurewebsites.net/api/Story/upload"

    const formData = new FormData()
    formData.append("title", title)
    formData.append("authorName", author)
    formData.append("authorName", "Dinith")
    formData.append("description", description)
    formData.append("contents", contents)
    formData.append("tag", tag)

    fetch(url, {
      body: formData,
      headers: { 'cache-control': 'no-cache' },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          location.reload()
        }
      })
  }

  // Make a PUT request to edit a story
  private editStory() {
    const titleInput = document.getElementById("story-title-input") as HTMLInputElement
    const authorInput = document.getElementById("story-author-input") as HTMLInputElement
    const descriptionInput = document.getElementById("story-description-input") as HTMLInputElement
    const contentsInput = document.getElementById("story-contents-input") as HTMLInputElement

    if (titleInput === null || authorInput === null || descriptionInput === null || contentsInput === null) {
      return;
    }

    const title = titleInput.value
    const author = authorInput.value
    const description = descriptionInput.value
    const tag = this.state.createTag
    const contents = contentsInput.value

    const storyToEdit = this.state.storyToRead
    const url = "https://readmylife.azurewebsites.net/api/Story/" + storyToEdit.storyID

    fetch(url, {
      body: JSON.stringify({
        "storyID": storyToEdit.storyID,
        "title": title,
        "authorName": author,
        "authorID": author,
        "description": description,
        "contents": contents,
        "rating": storyToEdit.rating,
        "numRatings": storyToEdit.numRatings,
        "tag": tag,
        "date": storyToEdit.date,
        "imageURL": storyToEdit.imageURL
      }),
      headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
      method: 'PUT'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText + " " + url)
        } else {
          location.reload()
        }
      })

  }

  // Check if user is a developer to delete the story
  private deleteStory() {
    if (!this.state.devAuthenticated) {
      alert("YOU ARE NOT AUTHORISED TO DELETE!")
    } else {
      this.confirmDelete()
    }
  }

  private confirmDelete() {
    this.setState({ wantToDelete: true })
  }

  private closeDelete() {
    this.setState({ wantToDelete: true })
  }

  // Make a DELETE request to delete the story
  private deleteYes() {
    const url = "https://readmylife.azurewebsites.net/api/Story/" + this.state.storyToRead.storyID

    fetch(url, {
      method: 'DELETE'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error Response
          alert(response.statusText)
        }
        else {
          location.reload()
        }
      })
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
      currentTag: tag,
      storyToRead: null,
      isEdit: false
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

  private openFaceLogin() {
    this.setState({ devLogin: true })
  }

  private closeFaceLogin() {
    this.setState({ devLogin: false })
  }

  private authenticateFace() {
    const screenshot = this.state.refCamera.current.getScreenshot();
    this.getFaceRecognitionResult(screenshot)
  }

  // Call custom vision model to authenticate face
  private getFaceRecognitionResult(image: string) {
    const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/c9a560e3-3f21-4d0e-a6f5-5ce3cba136c0/image?iterationId=ae027e7e-7155-48ef-8762-7f3f3b388262"
    if (image === null) {
      return;
    }
    const base64 = require('base64-js');
    const base64content = image.split(";")[1].split(",")[1]
    const byteArray = base64.toByteArray(base64content);
    fetch(url, {
      body: byteArray,
      headers: {
        'cache-control': 'no-cache', 'Prediction-Key': '4570312c70fe49f48adff74d99c83220', 'Content-Type': 'application/octet-stream'
      },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          response.json().then((json: any) => {
            const predResult = json.predictions[0]
            if ((predResult.tagName === "dinith") && (predResult.probability > 0.7)) {
              this.setState({ devAuthenticated: true })
            } else {
              this.setState({ devAuthenticated: false })
              alert("Failed authentication")
            }
          })
        }
      })
    this.setState({ devLogin: false })
  }

}