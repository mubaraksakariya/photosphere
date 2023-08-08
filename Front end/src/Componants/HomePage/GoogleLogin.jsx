import { GoogleLogin } from '@react-oauth/google';

function GoogleLogin() {
    return (
        <div className="App">
            <GoogleLogin
                onSuccess={credentialResponse => {

                }}

                onError={() => {

                }}

            />
        </div>
    );
}

export default GoogleLogin