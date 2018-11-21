import * as React from 'react';
import './resources/css/StoryDisplay.css';

interface IProps {
    story: any
}

export default class StoryDisplay extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        return (
            <div className="container">
                <div className="top-box">
                    <div className="title-author-box">
                        <div className="title">{this.props.story.title}</div>
                        <div className="author-box">by <div className="author">{this.props.story.authorName}</div></div>
                    </div>
                    <div className="rating-box">
                        {this.props.story.rating}
                    </div>
                </div>
                <div className="description-box">
                    {this.props.story.description}
                </div>
                <div className="contents-box">
                    {this.props.story.contents}
                </div>
            </div>
        );
    }
}