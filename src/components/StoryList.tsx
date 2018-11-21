import * as React from 'react';
import book_icon from './resources/book_icon.png'
import './resources/css/StoryList.css';

interface IProps {
    stories: any[],
    readStory: any,
    currentTag: any
}

export default class StoryList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
        this.readStory = this.readStory.bind(this);
    }

    public render() {
        return (
            <div>
                <div className="story-table">
                    <table className="story-table">
                        <col className="table-title" width="130" />
                        <col className="table-author" width="130" />
                        <col className="table-description" width="130" />
                        <col className="table-rating" width="130" />
                        <col className="table-tag" width="130" />
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
            const story = storyList[i]
            children.push(<td key={"title" + i} align="center"> {story.title} </td>)
            children.push(<td key={"author" + i} align="center"> {story.authorName} </td>)
            children.push(<td key={"description" + i} align="center"> {story.description} </td>)
            children.push(<td key={"rating" + i} align="center"> {story.rating} </td>)
            children.push(<td key={"tag" + i} align="center"> {story.tag} </td>)
            children.push(<td key={"read-button" + i}><button className="button-read" onClick={this.readStory.bind(this, i)}> <img src={book_icon} width="12" height="12" /> Read </button></td>)
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

}