import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { SIGN_UP } from '../../queries';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../../components/error/error';

class SignUp extends Component{
	state = {
		username: '',
		password: ''
	};
	
	onChange = event => {
		const name = event.target.name;
		const value = event.target.value;
        const newState = {...this.state};
        newState[name] = value;
		this.setState({...newState});
	};

    onSubmit = (event, createUser) => {
		event.preventDefault();
        createUser().then(async ({data}) => {
			console.log(data);
			localStorage.setItem('token',data.createUser.token);
			await this.props.fetch();
			this.props.history.push('/');
		});
	};
	
	render(){
		return(
			<div>
            <Mutation mutation={SIGN_UP} variables={ { username: this.state.username, password: this.state.password } }>
                { (createUser, { loading, error }) => (
                    <form 
                    onSubmit={ event => this.onSubmit(event, createUser) }>
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
                    <button onClick={this.onClick}>Sign Up</button>
						{loading && <div>loading</div>}
						{error && <ErrorMessage message={error.message} />}
                    </form>
                ) }
            </Mutation>
                
			</div>
		);
	}
	
	
	
}

export default withRouter(SignUp);