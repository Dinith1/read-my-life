import * as React from 'react';
import './TagList.css';

interface IProps {
    selectTag: any
}

export default class TagList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
        this.selectTag = this.selectTag.bind(this)
    }

    public render() {
        return (
            <div>
                <h1>Tags</h1>
                <div className="tags">
                    <h2 id="all" onClick={this.selectTag}>All</h2>
                    <h2 id="funny" onClick={this.selectTag}>Funny</h2>
                    <h2 id="happy" onClick={this.selectTag}>Happy</h2>
                    <h2 id="love" onClick={this.selectTag}>Love</h2>
                    <h2 id="scary" onClick={this.selectTag}>Scary</h2>
                    <h2 id="strange" onClick={this.selectTag}>Strange</h2>
                </div>

            </div>
        );
    }

    private selectTag(tag: any) {
        tag = window.event
        tag = tag.target || tag.srcElement
        alert("SEARCHING BY: " + tag.id)
    }

}