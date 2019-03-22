import React, { Component } from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addLab = this.addLab.bind(this); 
    }

    addLab(e){
        fetch('/api/labs', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res=> res.json())
            .then(data=>{
                console.log(data)
                M.toast({html: 'Paciente Guardado'});
                this.setState({title:'', description:''}); 
            })
            .catch(err=> console.error(err));

        e.preventDefault();
    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name]:value

        });
    }

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Laboratorio Clínico</a>
                    </div>
                </nav>
                
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                <form onSubmit={this.addLab}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="title" onChange={this.handleChange} type="text" placeholder="Nombre Paciente" value={this.state.title}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} placeholder="Resultado CLinico" className="materialize-textarea" value={this.state.description}></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-blue darken-4">
                                    Enviar 
                                    </button>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;