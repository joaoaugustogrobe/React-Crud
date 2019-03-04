import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
        let token = localStorage.getItem('SessionToken')
        var headers = {
            'Authorization': `bearer ${token}`
        }
        axios.post('http://localhost:3001/auth','', {headers: headers} ).then(resp => {//pass token as header
            this.setState( { loading: false } )
        }).catch(err => {
            console.error(err);
          this.setState({ loading: false, redirect: true });
        })
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}