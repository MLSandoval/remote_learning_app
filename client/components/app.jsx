import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserType: 'admin',
            data: [{ question: 'Why isn\'t this working?', author: 'Dwight' }, { question: 'What does this button do?', author: 'Rex' }, { question: 'Why isn\'t this working?', author: 'Dwight' }]
            }
        this.switchUser = this.switchUser.bind(this);

        };


    switchUser(){
        if (this.state.UserType === 'admin'){
            this.setState({ UserType: 'student' })
        } else {
            this.setState({ UserType: 'admin' })
        }

    }
    render(){
        return(
            <div id="app">
                <button style={{'position':'absolute','height':15 + 'px'}} onClick={this.switchUser}></button>
                <Video UserType={this.state.UserType}/>
                <SidePanel UserType={this.state.UserType} data={this.state.data}/>
            </div>

        )
    }
}

export default App;
