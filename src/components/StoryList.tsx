import * as React from 'react';
import './resources/css/StoryList.css';

import book_icon from './resources/book_icon.png'
interface IProps {
    stories: any[],
    readStory: any,
    searchTitle: any,
    searchAuthor: any,
}

export default class StoryList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
        this.readStory = this.readStory.bind(this)
        this.searchTitle = this.searchTitle.bind(this)
        this.searchAuthor = this.searchAuthor.bind(this)
        this.checkInputIsEmpty = this.checkInputIsEmpty.bind(this)
        this.enableButtons = this.enableButtons.bind(this)
    }

    public render() {
        return (
            <div>
                <div className="search-bar">
                    <input className="search-input" id="search-input" type="text" placeholder="Search for a story by title or author" onChange={this.enableButtons}/>
                    <button className="button-search" id="btn-search-title" onClick={this.searchTitle} disabled={false}> Search By Title </button>
                    <button className="button-search" id="btn-search-author" onClick={this.searchAuthor} disabled={false}> Search By Author </button>

                </div>

                <div className="story-table">
                    <table className="story-table">
                        <col className="table-title" width="130"/>
                        <col className="table-author" width="130"/>
                        <col className="table-description" width="130"/>
                        <col className="table-rating" width="130"/>
                        <col className="table-tag" width="130"/>
                        <tbody>
                            <tr>
                                <th>title</th>
                                <th>Author</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Tag</th>
                            </tr>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Fill the table with story data
    private createTable() {
        const table: any[] = []
        const storyList = this.props.stories

        if (storyList == null) {
            return table
        }

        for (let i = 0; i < storyList.length; i++) {
            const children = []
            const story = storyList[i][0]
            children.push(<td key={"title" + i} align="center"> {story.title} </td>)
            children.push(<td key={"author" + i} align="center"> {story.author} </td>)
            children.push(<td key={"description" + i} align="center"> {story.description} </td>)
            children.push(<td key={"rating" + i} align="center"> {story.rating} </td>)
            children.push(<td key={"tag" + i} align="center"> {story.tag} </td>)
            children.push(<td key={"read-button" + i}><button className="button-read" onClick={this.readStory.bind(this, i)}> <img src={book_icon} width="12" height="12"/> Read </button></td>)
            table.push(<tr key={i + ""} id={i + ""}>{children}</tr>)
        }
        return table
    }

    private readStory(index: any) {
        const selectedStory = this.props.stories[index]
        if (selectedStory != null) {
            this.props.readStory(selectedStory)
        }
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

}