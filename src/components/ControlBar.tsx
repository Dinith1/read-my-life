import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import ChatBot from 'react-simple-chatbot';
import './resources/css/ControlBar.css';
import HelpIcon from './resources/help_icon.png';


interface IProps {
    currentTag: any,
    searchTitle: any,
    searchAuthor: any,
    createStory: any
}

interface IState {
    chatbotIsOpen: boolean
}


export default class ControlBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.searchTitle = this.searchTitle.bind(this)
        this.searchAuthor = this.searchAuthor.bind(this)
        this.checkInputIsEmpty = this.checkInputIsEmpty.bind(this)
        this.enableButtons = this.enableButtons.bind(this)
        this.openChatbot = this.openChatbot.bind(this)
        this.createStory = this.createStory.bind(this)
        this.state = { chatbotIsOpen: false }
    }

    public render() {
        return (
            <div className="wrapper">
                <div className="search-bar">
                    <input className="search-input" id="search-input" type="text" placeholder={`Search for a story by title or author with the ${this.props.currentTag} tag`} onChange={this.enableButtons} />
                    <Button variant="contained" className="button-search" id="btn-search-title" onClick={this.searchTitle} disabled={false}>Search By Title</Button>
                    <Button variant="contained" className="button-search" id="btn-search-author" onClick={this.searchAuthor} disabled={false}>Search By Author</Button>
                </div>

                <div className="new-story">
                    <Button variant="fab" color="primary" aria-label="Add" className="new-story-button" onClick={this.createStory}>
                        <AddIcon />
                    </Button>
                </div>

                <div className="help">
                    <Button variant="fab" color="primary" aria-label="Add" className="new-story-button" onClick={this.openChatbot}>
                        <img src={HelpIcon} />
                    </Button>
                    <div className="bot-container">
                        {this.state.chatbotIsOpen && <ChatBot className="chatbot" id="chatbot"
                            steps={[
                                {
                                    id: 'hello-world',
                                    message: 'Hello World!',
                                    end: true,
                                },
                            ]}
                        />}
                    </div>
                </div>

            </div>

        );
    }

    private searchTitle() {
        const userInput = document.getElementById("search-input") as HTMLInputElement
        if (this.checkInputIsEmpty(userInput)) {
            return;
        }
        const searchString = userInput.value
        // Do a READ request with the given title
        this.props.searchTitle(searchString)
    }

    private searchAuthor() {
        const userInput = document.getElementById("search-input") as HTMLInputElement
        if (this.checkInputIsEmpty(userInput)) {
            return;
        }
        const searchString = userInput.value
        // Do a READ request with the given author
        this.props.searchAuthor(searchString)
    }

    // Method to check input isn't empty
    private checkInputIsEmpty(userInput: any) {
        if ((userInput === null) || (userInput.value === null) || (userInput.value === "")) {
            return true;
        }
        return false;
    }

    // Enable buttons when user input is non-empty and disable otherwise
    private enableButtons() {
        const userInput = document.getElementById("search-input") as HTMLInputElement
        const btnTitle = document.getElementById("btn-search-title") as HTMLButtonElement
        const btnAuthor = document.getElementById("btn-search-author") as HTMLButtonElement
        if (this.checkInputIsEmpty(userInput)) {
            btnTitle.disabled = true
            btnAuthor.disabled = true
        } else {
            btnTitle.disabled = false
            btnAuthor.disabled = false
        }
    }

    private createStory() {
        this.props.createStory()
    }

    private openChatbot() {
        this.setState({
            chatbotIsOpen: !this.state.chatbotIsOpen
        })
    }
}