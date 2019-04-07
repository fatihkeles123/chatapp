import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { LOGIN } from '../../queries';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../components/error/error';

class Login extends Component{
	constructor(props) {
        super(props);
        this.state = {
			username: '',
			password: ''
		};
    }

	onChange = event => {
		const name = event.target.name;
		const value = event.target.value;
        const newState = {...this.state};
        newState[name] = value;
		this.setState({...newState});
	};

    onSubmit = (event, loginUser) => {
		event.preventDefault();
        loginUser().then(async ({ data }) => {
			console.log(data);
			localStorage.setItem('token',data.loginUser.token);
			await this.props.refetch();
			this.props.history.push('/');
		});
	};
	
	render(){
		return(
			<div>
            <Mutation mutation={LOGIN} variables={ { username: this.state.username, password: this.state.password } }>
                { (loginUser, { loading, error }) => (
                    <form 
                    onSubmit={ event => this.onSubmit(event, loginUser) }>
                    <label>
                    <input
                        name="username"
                        onChange={this.onChange}
                        type="text"
                        value={this.state.username}
                        placeholder="username"/>
                    </label>
                    <label>
                    <input
                        name="password"
                        onChange={this.onChange}
                        type="password"
                        value={this.state.password}
                        placeholder="password"/>
                    </label>
                    <button onClick={this.onClick}>Login</button>
						{loading && <div>loading</div>}
						{error && <ErrorMessage message={error.message} />}
                    </form>
                ) }
            </Mutation>
                
			</div>
		);
	}	
	
}

export default withRouter(Login);