import Profile from "./Profile";
import './Header.css';

function Header(params) {
    return (
        <header>
            <h1>Bookstore</h1>
            <Profile/>
        </header>
    );
}

export default Header;