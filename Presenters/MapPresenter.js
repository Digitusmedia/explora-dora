import React from 'react'
import {connect} from 'react-redux'
import {getMarkers} from "../Redux/redusers/markers";
import {getCollection} from "../Redux/redusers/collection";
import {addPost} from "../Redux/redusers/feed";
import {addNodeToPath, getPaths} from "../Redux/redusers/paths";
import MapPresenterFile from "../Views/MapPresenterFile";
import {editUser, getUsers} from "../Redux/redusers/user";

export function MapPresenter(props) {
    console.log("Map presenter",props)
    //{title, lat, lon, styles, user, addPost} Camera
    //navigation, route, markers, theme, getMarkers, addPathNode, styles, user, addPost,getPaths,paths
    return (
        <MapPresenterFile
            navigation ={props.navigation}
            route ={props.route}

            markers = {props.markers}
            getMarkers = {props.getMarkers}

            collection = {props.collection}
            getCollection = {props.getCollection}

            paths={props.paths}
            getPaths = {props.getPaths}

            user={props.user.userData}
            getUser = {props.getUser}
            editUser = {props.editUser}

            theme = {props.theme}
            styles = {props.styles}

            addPathNode = {props.addPathNode}
            addPost = {props.addPost}

        />
    );
}

const mapStateToProps = state => {
    return {
        styles: state.theme.value.style,
        user: state.user,
        markers: state.markers,
        theme: state.theme.value.theme,
        collection: state.collection,
        paths: state.paths,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMarkers: () => dispatch(getMarkers()),
        getCollection: () => dispatch(getCollection()),
        getPaths: () => dispatch(getPaths()),
        getUser: () => dispatch(getUsers()),
        addPathNode: (node) => dispatch(addNodeToPath(node)),
        addPost: (post) => dispatch(addPost(post)),
        editUser: (user) => dispatch(editUser(user)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPresenter)
