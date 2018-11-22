import * as React from 'react';
import './resources/css/StoryDisplay.css';

interface IProps {
    story: any,
    test: any
}

export default class StoryDisplay extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
        this.test = this.test.bind(this)
    }

    public render() {
        return (
            <div className="container">
                <div className="top-box">
                    <div className="title-author-box">
                        <div className="title">{this.props.story.title}</div>
                        <div className="author-box">by <div className="author">{this.props.story.authorName}</div></div>
                    </div>

                    <div className="edit-rating-share-box">
                        <div>
                            <div className="edit-box">
                                <button>edit</button>
                                <button>delete</button>
                            </div>
                        </div>
                        <div className="rating-box">
                            {this.props.story.rating}
                        </div>
                        <div className="share-box">
                            <button onClick={this.props.test}>share</button>
                        </div>
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

    private test() {
        this.props.test()
    }


}