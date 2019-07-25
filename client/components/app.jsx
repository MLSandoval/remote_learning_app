import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';

class App extends React.Component{
    render(){
        return(
            <div>
                <Embedded_Video></Embedded_Video>
                <SidePanel></SidePanel>
            </div>

        )
    }
}

export default App;
