import * as React from 'react';
import './resources/css/StoryDisplay.css';
import ChatBot from 'react-simple-chatbot';

interface IProps {
    story: any,
    test: any
}

interface IState {
    readAloud: boolean
}

export default class StoryDisplay extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.readAloud = this.readAloud.bind(this)
        this.state = { readAloud: false }
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
                            <button onClick={this.readAloud}>Read this story aloud!</button>
                        </div>
                    </div>

                </div>
                <div className="description-box">
                    {this.props.story.description}
                </div>
                <div className="contents-box">
                    {this.props.story.contents}

                    <div className="bot-container">
                        {this.state.readAloud &&
                            <ChatBot className="chatbot" id="chatbot"
                                headerTitle="Read aloud"
                                speechSynthesis={{ enable: true, lang: 'en' }}
                                steps={[
                                    {
                                        id: '1',
                                        message: this.props.story.title + ". By " + this.props.story.authorName + ". " + this.props.story.contents,
                                        end: true,
                                    },
                                ]}
                            />}
                    </div>

                </div>
            </div>
        );
    }

    private readAloud() {
        global.console.log("hello")
        this.setState({ readAloud: !this.state.readAloud })
        this.props.test()
    }


}