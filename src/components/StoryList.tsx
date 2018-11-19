import * as React from 'react';
import './StoryList.css';

interface IProps {
    stories: any[],
}

export default class StoryList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Search for a story" />
                    <button className="search-button"> Search </button>
                </div>

                <div className="story-table">
                    <table className="story-table">
                        <tbody>
                            <tr>
                                <th>title</th>
                                <th>Author</th>
                                <th>Description</th>
                                <th>Rating</th>
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
            children.push(<td key={"rating" + i}> {story.rating} </td>)
            children.push(<td key={"read-button" + i}><button> READ </button></td>)
            table.push(<tr key={i + ""} id={i + ""}>{children}</tr>)
        }
        return table
    }

}