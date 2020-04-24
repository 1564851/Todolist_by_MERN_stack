import React, { Component } from 'react'
import { TextField, Grid, Fab, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class Form extends Component {

    render() {
        let AddTodo = ()=>{
            let Element = document.getElementsByName('TodoInput')[0].value
            let data = {
                key: this.props.todos.length,
                title: Element,
                completed:false,
            }
            fetch('/api',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data) 
            }).then(()=>{
                console.log('POSTED')
            })
            this.props.todos.push(data);
            console.log(this.props.todos)
        }

        return (

            <div style={{
                textAlign: 'center',
            }}>
                <form>
                    <Grid container spacing={3}>
                            <Grid item xs={12} sm={11}>
                                <TextField id="outlined-basic" label="Add Task Here" variant="outlined" name='TodoInput' fullWidth={true}/>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <Fab color="primary" aria-label="add" onClick={AddTodo}>
                                    <AddIcon />
                                </Fab>
                            </Grid>
                    </Grid>
                </form>
            </div>

        )
    }
}

export default Form