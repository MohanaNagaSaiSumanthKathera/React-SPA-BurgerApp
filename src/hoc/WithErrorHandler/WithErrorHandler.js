import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../auxi';

const WithErrorHandler =(WrappedComponent,axios)=>{
    return class extends React.Component{
        state={
            error:null
        }
        constructor(){
            super();
            this.reqinterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.resinterceptors= axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }

        render(){
            return (
                <Auxi>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxi>
            );
        } 
    }       
}

export default WithErrorHandler;