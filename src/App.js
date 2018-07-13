import React from "react";
import Footer from "./component/footer";
import Searcher from "./component/searcher";

class App extends React.Component {
    render() {
        return (
            <div className="component-app">
                <Searcher />
                <Footer />
            </div>
        );
    }
}
export default App;