import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import routes from '@routes';
import history from '@history';
import { GlobalState } from '@store';

import Html from '@components/Html';

import style from './Portfolio.style';
import withStyles from '@utils/withStyles';

class ProjectPreview extends Component {
    constructor(props) {
        super(props)

        const toPath = pathToRegexp.compile(routes['project'].path);
        this.url = toPath({
            id: String(this.props.id),
            slug: String(this.props.slug),
        });
    }

    render() {
        let { id, title, excerpt, thumbnail } = this.props;

        return (
            <div key={id} className="Portfolio__project" onClick={() => {
                history.push(this.url);
            }}>
                <div className="Portfolio__project-info">
                    <Html content={title.rendered} type="h2" />
                    <Html content={excerpt.rendered} />
                </div>
                <div className="Portfolio__project-thumbnail">
                    <img src={thumbnail} width="200" />
                </div>
            </div>
        )
    }
}


class Portfolio extends Component {
    static contextType = GlobalState;

    render() {
        return (
            <div className="Portfolio">
                {this.context.posts.map(project => {

                    return (<ProjectPreview key={project.id} {...project} />);
                })}
            </div>
        );
    }
}

export default withStyles(style)(Portfolio);
