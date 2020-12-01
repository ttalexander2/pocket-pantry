import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBar, Tab, Button, Input, Text } from '@ui-kitten/components';
import jwt_decode from 'jwt-decode';
import { connect, useSelector } from 'react-redux';

const emailRegex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
const passwordRegex = /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$/;

const Login = (props) => {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordVerify, setPasswordVerify] = React.useState();
    const [name, setName] = React.useState();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [emailValid, setEmailValid] = React.useState(true);
    const [passwordMatches, setPasswordMatches] = React.useState(true);
    const [nameValid, setNameValid] = React.useState(true);

    const [invalidMessage, setInvalidMessage] = React.useState();

    const verifyEmail = () => {
        return emailRegex.test(String(email).toLowerCase());
    }

    const verifyPasswordsMatch = () => {
        return password === passwordVerify;
    }

    const verifyPasswordValid = () => {
        return passwordRegex.test(String(password));
    }

    const UserData = useSelector(state => state.UserData);


    return(
    <View style={styles.formBackground}>
        <Text style={styles.text} category="h1">
            Welcome to Pocket Pantry
        </Text>
        <Text style={styles.text} appearance="hint">
            The Kitchen Management Tool!
        </Text>

        <View style={{color: 'white'}}>
            <TabBar style={styles.tabBar}
                indicatorStyle={styles.tabViewIndicator}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Tab title='Log In'/>
                <Tab title='Sign Up'/>
            </TabBar>
            <Text status='danger'>
                {
                invalidMessage
                }
            </Text>
            {
                selectedIndex === 0
                ?
                <View style={styles.formContainer}>
                    <Input
                        label='EMAIL'
                        placeholder='Email'
                        status='control'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        style={styles.passwordInput}
                        secureTextEntry={true}
                        placeholder='Password'
                        label='PASSWORD'
                        status='control'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button
                    status='control'
                    size='large'
                    onPress={LogIn}>
                    LOG IN
                    </Button>
                </View>
                :
                <View style={styles.formContainer}>
                    {
                        nameValid
                        ?
                        <Input
                            label='NAME'
                            placeholder='Name'
                            status='control'
                            value={name}
                            onChangeText={setName}
                        />
                        :
                        <Input
                            label='NAME'
                            placeholder='Name'
                            status='danger'
                            value={name}
                            onChangeText={setName}
                        />
                    }

                    {
                        emailValid
                        ?
                        <Input
                            label='EMAIL'
                            placeholder='Email'
                            status='control'
                            value={email}
                            onChangeText={setEmail}
                        />
                        :
                        <Input
                            label='EMAIL'
                            placeholder='Email'
                            status='danger'
                            value={email}
                            onChangeText={setEmail}
                        />
                    }
                    {
                        passwordMatches
                        ?
                        <View>
                            <Input
                                style={styles.passwordInput}
                                secureTextEntry={true}
                                placeholder='Password'
                                label='PASSWORD'
                                status='control'
                                value={password}
                                onChangeText={setPassword}
                            />
                            <Input
                                style={styles.passwordInput2}
                                secureTextEntry={true}
                                placeholder='Verify Password'
                                status='control'
                                value={passwordVerify}
                                onChangeText={setPasswordVerify}
                            />
                        </View>
                        :
                        <View>
                            <Input
                                style={styles.passwordInput}
                                secureTextEntry={true}
                                placeholder='Password'
                                label='PASSWORD'
                                status='danger'
                                value={password}
                                onChangeText={setPassword}
                            />
                            <Input
                                style={styles.passwordInput2}
                                secureTextEntry={true}
                                placeholder='Verify Password'
                                status='danger'
                                value={passwordVerify}
                                onChangeText={setPasswordVerify}
                            />
                        </View>
                    }
                    <Button
                        status='control'
                        size='large'
                        onPress={SignUpUser}>
                        SIGN UP
                    </Button>
                </View>
            }
        </View>
    </View>
    )

    async function LogIn() {
        const userInfo = {
            "email": email,
            "password": password,
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');

        var raw = JSON.stringify(userInfo);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
      
        var result = await fetch("https://pocketpantry.app/login", requestOptions)
        .then(response => {
            if (response.status === 200){
                response.text().then(response2 => {
                    let token = response2;
                    let decoded = jwt_decode(token);
                    props.dispatch({type: 'SET_USERNAME', username:decoded.user.name});
                    props.dispatch({type: 'SET_EMAIL', email:decoded.user.email});
                    props.dispatch({type: 'SET_JWT_TOKEN', token:token});

                    requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify({token: response2}),
                        redirect: 'follow'
                    };
                    

                    fetch("https://pocketpantry.app/api/userdata", requestOptions)
                    .then((response) => {
                        response.json().then((jsonResult) => {
                            props.dispatch({type: 'SET_INGREDIENT_DATA', ingredients:jsonResult});
                        });
                    })
                    .then(result => {})
                    .catch(error => console.log('error', error))

                    props.onLogIn();


                });
            }
            else {
                response.text().then(response2 => {
                    setInvalidMessage(response2);
                });
            }
        })
        .then(result => {})
        .catch(error => console.log('error', error));
          

    }

    async function SignUpUser() {
        var val = verifyEmail();
        var val2 = verifyPasswordsMatch();
        var val3 = name === '';
        var val4 = verifyPasswordValid();
        setEmailValid(val);
        setPasswordMatches(val2 && val4);
        setNameValid(!val3);
        if (val === false){
            setInvalidMessage('Email is invalid.');
        }
        if (val2 === false)
        {
            setInvalidMessage('Passwords do not match.');
        }
        if (val3 === true){
            setInvalidMessage('Please enter a valid name.')
        }
        if (val4 === false){
            setInvalidMessage('Please enter a valid password\nPassword must contain a minimum of eight characters, at least one letter, and at least one number.')
        }
        if (val && val2 && !val3 && val4){
            setInvalidMessage('');
            //do the thing here
            const userInfo = {
                "name": name,
                "email": email,
                "password": password,
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append('Access-Control-Allow-Origin', '*');

            var raw = JSON.stringify(userInfo);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
          
            fetch("https://pocketpantry.app/signup", requestOptions)
            .then((response) => {
                if (response.status === 200){
                    response.text().then(response2 => {
                        let token = response2;
                        let decoded = jwt_decode(token);
                        props.dispatch({type: 'SET_USERNAME', username:decoded.user.name});
                        props.dispatch({type: 'SET_EMAIL', email:decoded.user.email});
                        props.dispatch({type: 'SET_JWT_TOKEN', token:token});
    
                        requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify({token: response2}),
                            redirect: 'follow'
                        };
                        

                        fetch("https://pocketpantry.app/api/userdata", requestOptions)
                        .then((response) => {
                            response.json().then((jsonResult) => {
                                props.dispatch({type: 'SET_INGREDIENT_DATA', ingredients:jsonResult});
                            });
                        })
                        .then(result => {})
                        .catch(error => console.log('error', error))

                        props.onLogIn();
    
                    });
                }
                else {
                    response.text().then(response2 => {
                        setInvalidMessage(response2);
                    });
                }
            })
            .then(result => {})
            .catch(error => console.log('error', error))

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },
    socialAuthContainer: {
        marginTop: 48,
    },
    evaButton: {
        maxWidth: 72,
        paddingHorizontal: 0,
    },
    formContainer: {
        flex: 1,
        marginTop: 5,
    },
    tabBar: {
        color: 'rgba(250, 250, 250, 1)',
        flex: 1,
        marginTop: 20,
        backgroundColor: 'transparent',

    },
    tabViewIndicator: {
        color: 'white',
        backgroundColor: 'white',
    },
    passwordInput: {
        marginTop: 16,
        marginBottom: 16,
    },
    passwordInput2: {
        marginBottom: 16, 
    },
    signInLabel: {
        flex: 1,
    },
    signUpButton: {
        flexDirection: 'row-reverse',
        padding: 0,
        margin: 5,
        borderColor: 'rgba(250, 250, 250, 0.4)',
        borderRadius: 5,
    },
    text: {
        alignSelf: 'center',     
        color: 'rgba(250, 250, 250, 1)',
    },
    socialAuthButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialAuthHintText: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    formBackground: {
        borderRadius: 7,
        padding: 26,
        backgroundColor: 'rgba(40, 128, 138, 0.95)',
    },
});

export default connect()(Login);