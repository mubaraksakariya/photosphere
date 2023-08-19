import { GoogleLogin } from '@react-oauth/google';

function GoogleLogin() {
    return (
        <div className="App">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}

                onError={() => {

                }}

            />
        </div>
    );
}

export default GoogleLogin