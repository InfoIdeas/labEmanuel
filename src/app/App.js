import React, { Component } from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description:'',
            labs:[],
            _id:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addLab = this.addLab.bind(this); 
    }

    addLab(e){
       if (this.state._id){
            fetch(`/api/lab/${this.state._id}`, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data=> {
                console.log(data);
                M.toast({html: 'Paciente Actualizado'});
                this.setState({title:'', description:'', _id:''});
                this.fetchLabs();
            
            });
       } else {
            fetch('/api/lab', {
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
                this.fetchLabs();
            })
            .catch(err=> console.error(err));
       }

        e.preventDefault();
    }

    componentDidMount(){
        this.fetchLabs();
    }
    fetchLabs(){
        fetch('/api/lab')
            .then(res=> res.json())
            .then(data=> {
                this.setState({labs: data});
                console.log(this.state.labs);
            }); 

    }

    deleteLab(id){
        if (confirm('Seguro que desea eliminar')){
            fetch( `/api/lab/${id}`,{
                method: 'DELETE',
                headers:{
                    'Accept': 'applicaction/json',
                    'Content-Type': 'application/json'
                }
    
            }) 
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html:'Paciente Borrado'});
                this.fetchLabs();
                
            });
    
            console.log('deleting:', id);
        }
    
        
    }
    editLab(id) {
        fetch(`/api/lab/${id}`)
        .then(res=> res.json())
        .then(data => { 
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                _id:data._id

            })
        });

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
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Paciente</th>
                                        <th>Caso Clinico</th>               
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.labs.map(lab =>{
                                            return (
                                            <tr key={lab._id}>
                                                <td>{lab.title}</td>
                                                <td>{lab.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => this.deleteLab (lab._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button onClick={() => this.editLab(lab._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                    <i className="material-icons">edit</i>
                                                    </button>    
                                                    
                                                </td>
                                            </tr>                                            
                                            )
                                        
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;