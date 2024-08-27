import SignInBtn from "../miniComponents/signIn";
import SignOutBtn from "../miniComponents/signOut";
import SignUpBtn from "../miniComponents/signUp";

const AuthButtons = () => {
    return ( 
        <div className="buttons">
            <SignInBtn />
            <SignUpBtn />
            <SignOutBtn />
        </div>
    );
}
 
export default AuthButtons;