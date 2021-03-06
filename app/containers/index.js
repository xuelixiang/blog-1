/**
 * Created by vijay on 2018/2/11.
 */

import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import './reset.css';
import {notification} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../reducers';
import Admin from './admin/Admin';
import NotFound from "../components/notFound/NotFound";
import Front from './front/Front'


const {clear_msg, user_auth} = actions;

class AppIndex extends Component {
    constructor(props) {
        super(props);
        // {console.log('container,index.js,this.props:', this.props)}
        this.openNotification = this.openNotification.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    openNotification(type, message) {
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    }

    render() {
        let {isFetching} = this.props;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/admin' component={Admin}/>
                        <Route exact path="/" component={Front} />
                        <Route component={NotFound} />
                    </Switch>

                    {isFetching}
                    {
                        this.props.notification && this.props.notification.content ?
                            (this.props.notification.type === 1 ?
                                    this.openNotification('success', this.props.notification.content) :
                                    this.openNotification('error', this.props.notification.content)
                            ) : null
                    }
                </div>
            </Router>
        );
    }

    componentDidMount() {
        console.log("container,index,didMount,props: ", this.props);
        this.props.user_auth();
    }
}


function mapStateToProps(state) {
    // console.log("container,index,globalState:",state.globalState);
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching,
        userInfo: state.globalState.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex);
