import AuthButtons from "./buttons";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className= "search">SearchBar</div>
            <div className="title">Coder; Decoded</div>
            <AuthButtons />
        </div>
     );
}
 
export default Navbar;