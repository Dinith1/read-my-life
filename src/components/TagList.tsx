import * as React from 'react';
import './resources/css/TagList.css';
import Label from 'react-bootstrap/lib/Label';

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
                    <h2><Label id="all" onClick={this.selectTag}>All</Label></h2>
                    <h2><Label id="funny" onClick={this.selectTag}>Funny</Label></h2>
                    <h2><Label id="happy" onClick={this.selectTag}>Happy</Label></h2>
                    <h2><Label id="love" onClick={this.selectTag}>Love</Label></h2>
                    <h2><Label id="sad" onClick={this.selectTag}>Sad</Label></h2>
                    <h2><Label id="scary" onClick={this.selectTag}>Scary</Label></h2>
                    <h2><Label id="strange" onClick={this.selectTag}>Strange</Label></h2>
                </div>
            </div>
        );
    }

    private selectTag(tag: any) {
        tag = window.event
        tag = tag.target || tag.srcElement
        // Update story list using a READ request
        this.props.selectTag(tag.id)
    }

}