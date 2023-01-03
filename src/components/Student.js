import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Student() {

    const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const classes = useStyles(); 
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/save",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        } ).then(()=>{
            console.log("New Student Added")
        })
    }

useEffect(()=>{
    fetch("http://localhost:8080/get")
    .then(res=>res.json())
    .then((result)=>{
        setStudents(result);
    })
})

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
                SUBMIT 
            </Button>
        </form>        
        </Paper>
        <h1>Students</h1>
        <Paper elevation={3} style={paperStyle}>
            {students.map(student=>(
                <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
                        ID:{student.id}<br/>
                        NAme:{student.name}<br/>
                        Address:{student.address}
                </Paper>
            ))}
        </Paper>
    </Container>  
  );
}
