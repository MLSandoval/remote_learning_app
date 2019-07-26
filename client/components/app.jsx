import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';

class App extends React.Component{
    constructor(){
        super()
        this.state={
            UserType: 'admin'
        }
    }
    render(){
        return(
            <div id="app">
                <Video UserType={this.state.UserType}/>
                <SidePanel UserType={this.state.UserType}/>
            </div>

        )
    }
}

export default App;
