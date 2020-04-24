import React, { Component } from 'react'
import { Grid, Fab, Checkbox, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export class Todo extends Component {
    render() {

        return this.props.todos.map((todo)=>(
            <div key={todo.key}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={1}>
                        <Checkbox color="primary" checked={todo.completed} onChange={()=>{
                            todo.completed = !todo.completed
                            fetch(`/api/changecompleted/${todo.key}`)
                            //When click, find document with the same todo key, change he todo.completed
                        }}/>   
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div stye={{textAlign:'center'}}>
                            <Typography variant="h5" style={
                                todo.completed?{textAlign: "center", color: "white", padding: '2.5%', textDecoration: 'line-through'}:{textAlign: "center", color: "white", padding: '2.5%'}}>{todo.title}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Fab color="secondary" aria-label="add" onClick={
                            ()=>{
                                let TodoIndex = this.props.todos.findIndex((element)=>element.key === todo.key)
                                console.log(todo.key)
                                fetch(`/api/deletedocument/${TodoIndex}`)
                                this.props.todos.splice(TodoIndex,TodoIndex===0?TodoIndex+1:TodoIndex)
                                //If the index not zero, splice(index,index), else(0,1)

                                //Send delete request to delete the docuement with key equal to todokey
                                //If the document is the last element 
                                //Do nothing 
                                //If the document is not the last element
                                //update the document with todokey+1 of the deleted by increasing the value of todokey by 1
                                
                            }
                        }>
                            <DeleteIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </div>

        ))
    }
}

export default Todo