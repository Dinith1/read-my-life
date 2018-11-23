import * as React from 'react';
import './resources/css/StoryDisplay.css';
import ChatBot from 'react-simple-chatbot';
import Button from 'react-bootstrap/lib/Button';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import SpeakerLogo from './resources/speaker_icon.png';

const shareUrl = "https://read-my-life.azurewebsites.net/";
const shareQuote = "Story";

interface IProps {
    story: any,
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
                        <div className="share-delete-box">
                            <div className="share-box">
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={shareQuote}
                                    className="fb-share">
                                    <FacebookIcon size={32} round /><Button bsStyle="success">Share</Button>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={shareUrl}
                                    quote={shareQuote}
                                    className="twitter-share">
                                    <TwitterIcon size={32} round /><Button bsStyle="success">Share</Button>
                                </TwitterShareButton>
                                <Button className="delete-button" bsStyle="danger" onClick={this.props.deleteStory}>delete</Button>
                            </div>
                            <div className="read-aloud-box">
                                <Button className="read-aloud-button" bsStyle="warning" onClick={this.readAloud}><img src={SpeakerLogo} width="24" height="24"/> {(this.state.readAloud) ? "close read aloud dialog" : "Read this story aloud!"}</Button>
                            </div>
                        </div>
                        <div className="rating-box">
                            Rating: {this.props.story.rating}
                        </div>

                    </div>

                </div>
                <div className="description-box">
                    {this.props.story.description}
                </div>
                <div className="contents-box">
                    {this.props.story.contents}

                    <div className="bot-container-read">
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
        this.setState({ readAloud: !this.state.readAloud })
    }


}