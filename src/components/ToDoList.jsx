import React from "react";
import { Component } from "react/cjs/react.production.min";

export class ToDoList extends Component{
    constructor(){
        super();
        this.state = {
            input: '',
            listArr: (localStorage.length > 0) ? JSON.parse(localStorage.getItem('todolist')) : []
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.addTo = this.addTo.bind(this)
        this.handleKey = this.handleKey.bind(this)
    }

    changeHandler(e){
        const data = e.target.value;
        this.setState({
            input: data
        })
        // console.log(data);
    }

    handleKey(e){
        if(e.key === 'Enter'){
            this.addTo()
        }
    }

    addTo(){
        this.setState({
            listArr: [...this.state.listArr, this.state.input]
        })

        // console.log(this.state.listArr);
    }

    deleteTodo(id){
        const newArr = this.state.listArr.filter((item, index) =>{
            return id !== index;
        })
        // console.log(newArr);
        this.setState({
            listArr: [...newArr]
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.listArr !== this.state.listArr){
            this.setState({
                input: ''
            })
            localStorage.setItem('todolist', JSON.stringify(this.state.listArr))
        }
    }

    render(){
        return(
            <>
                <h1>Todo List</h1>
                <input value={this.state.input} type='text' onChange={this.changeHandler} onKeyDown={this.handleKey} placeholder="Enter Something" />
                <button onClick={this.addTo}>Add</button>
                <div>
                    {this.state.listArr.map((item, index) =>{
                        return(
                            <li key={index} style={{listStyle: 'none'}}>
                                <div style={{display: 'flex', background: "red", margin: "10px 0", padding: "10px", justifyContent: "space-between", width: "50%", color:'#fff'}}>
                                    <div>{item}</div>
                                    <button onClick={()=>this.deleteTodo(index)}>Delete</button>  
                                </div>
                            </li>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default ToDoList