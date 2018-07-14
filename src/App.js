import React from "react";
import Footer from "./component/footer";
import Searcher from "./component/searcher";
import NavBar from "./component/navBar";

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div style={{ padding: 20 }}>
                    <Searcher />
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;