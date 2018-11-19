import * as React from 'react';
import './StoryList.css';

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
    }

    public render() {
        return (
            <div>
                <div className="search-bar">
                    <input className="search-input" id="search-input" type="text" placeholder="Search for a story by title or author" />
                    <button className="search-button" onClick={this.searchTitle}> Search By Title </button>
                    <button className="search-button" onClick={this.searchAuthor}> Search By Author </button>

                </div>

                <div className="story-table">
                    <table className="story-table">
                        <col className="table-title" width="130"/>
                        <col className="table-author" width="130" />
                        <col className="table-description" width="130" />
                        <col className="table-rating" width="130" />
                        <tbody>
                            <tr>
                                <th>title</th>
                                <th>Author</th>
                                <th>Description</th>
                                <th >Rating</th>
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
            children.push(<td key={"title" + i}> {story.title} </td>)
            children.push(<td key={"author" + i}> {story.author} </td>)
            children.push(<td key={"description" + i}> {story.description} </td>)
            children.push(<td key={"rating" + i} align="center"> {story.rating} </td>)
            children.push(<td key={"read-button" + i}><button onClick={this.readStory}> READ </button></td>)
            table.push(<tr key={i + ""} id={i + ""}>{children}</tr>)
        }
        return table
    }

    private readStory() {
        alert("READING");
    }

    private searchTitle() {
        const userInput = document.getElementById("search-input") as HTMLInputElement
        if (this.checkInputIsEmpty(userInput)) {
            return;
        }
        const searchString = userInput.value
        alert("SEARCHED FOR TITLE : " + searchString)

        // Do a READ request with the given title
    }

    private searchAuthor() {
        const userInput = document.getElementById("search-input") as HTMLInputElement
        if (this.checkInputIsEmpty(userInput)) {
            return;
        }
        const searchString = userInput.value
        alert("SEARCHED FOR AUTHOR : " + searchString)

        // Do a READ request with the given author
    }

    // Method to check input isn't empty
    private checkInputIsEmpty(userInput: any) {
        if ((userInput === null) || (userInput.value === null) || (userInput.value === "")) {
            alert("FAIL")
            return true;
        }
        return false;
    }

}