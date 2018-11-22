import * as React from 'react';
import './resources/css/StoryDisplay.css';
import ChatBot from 'react-simple-chatbot';
import Button from 'react-bootstrap/lib/Button';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

interface IProps {
    story: any,
    test: any,
    deleteStory: any
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
                                
                                <FacebookShareButton
                                    url={"http://github.com"}
                                    quote={"GitHub"}
                                    className="fb-share">
                                    <FacebookIcon size={32} round /><Button bsStyle="success">Share</Button>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url="http://github.com"
                                    quote={"GitHub"}
                                    className="twitter-share">
                                    <TwitterIcon size={32} round /><Button bsStyle="success">Share</Button>
                                </TwitterShareButton>
                                {/* <Button bsStyle="danger" onClick={this.props.deleteStory}>delete</Button> */}

                            </div>
                        </div>
                        <div className="rating-box">
                            {this.props.story.rating}
                        </div>
                        <div className="read-aloud-box">
                            <Button bsStyle="warning" onClick={this.readAloud}>{(this.state.readAloud) ? "close read aloud dialog" : "Read this story aloud!"}</Button>
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