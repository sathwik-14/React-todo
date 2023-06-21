import { Hero } from './hero';
import "./App.css";
import { Paper, TextField, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./draggable.css";
import Grid from "@mui/material/Grid";
import { TouchBackend } from "react-dnd-touch-backend";
// import { TouchBackend } from 'react-dnd-touch-backend';  for mobile devi

function App() {

  const [todo, setTodo] = useState([]);
  const [comp, setComp] = useState([]);
  const [inp, setInp] = useState([]);
  const [input, setInput] = useState('');




  useEffect(() => {
    // localStorage.removeItem('todo');
    // localStorage.removeItem('inp');
    // localStorage.removeItem('comp');

    const todos = JSON.parse(localStorage.getItem('todo'));
    if (todos && Array.isArray(todos)) {
      setTodo(todos);
    }
    const inps = JSON.parse(localStorage.getItem('inp'));
    if (inps && Array.isArray(inps)) {
      setInp(inps);
    }
    const comps = JSON.parse(localStorage.getItem('comp'));
    if (comps && Array.isArray(comps)) {
      setComp(comps);
    }
  },
    []);

  function DraggableComponent(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "component",
      item: { ...props },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        style={{
          borderRadius: ".5rem",
          backgroundColor: 'white',
          borderBottom: '#22A699 .2rem solid',
          margin: "0 auto",
          padding: '.5rem',
          width: "100%",
          overflow: 'auto'
        }}
      >
        <Typography
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,

            cursor: "pointer",
          }}
          variant="subtitle2"
        >
          {props.item}
        </Typography>
      </div>
    );
  }

  const handleDelete = (param) => () => {
    const comps = JSON.parse(localStorage.getItem('comp')) || [];
    comps.splice(param, 1);
    localStorage.setItem('comp', JSON.stringify(comps));
    setComp(comp.filter((item) => item !== comp[param]))
  }

  function DroppableInpComponent() {
    const [{ isOver, hasDropped }, drop] = useDrop(() => ({
      accept: ["component"], // Accept multiple types
      drop: (item) => {
        const gettodoIndex = todo.indexOf(item.item);
        if (gettodoIndex !== -1) todo.splice(gettodoIndex, 1);
        const getcompIndex = comp.indexOf(item.item);
        if (getcompIndex !== -1) comp.splice(getcompIndex, 1);
        const todos = JSON.parse(localStorage.getItem('todo')) || [];
        const comps = JSON.parse(localStorage.getItem('comp')) || [];
        const valueToRemove = item.item;
        const indextodo = todos.indexOf(valueToRemove);
        const indexcomp = comps.indexOf(valueToRemove);
        if (indextodo !== -1) {
          todos.splice(indextodo, 1);
        }
        if (indexcomp !== -1) {
          comps.splice(indexcomp, 1);
        }
        localStorage.setItem('todo', JSON.stringify(todos));
        localStorage.setItem('comp', JSON.stringify(comps));

        if (!inp.includes(item.item)) {
          const inps = JSON.parse(localStorage.getItem('inp')) || [];
          inps.push(item.item)
          setInp([...inp, item.item]);
          localStorage.setItem('inp', JSON.stringify(inps));

        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        hasDropped: monitor.didDrop(),
      }),
    }));

    return (
      <div
        ref={drop}
        display=""
        style={{
          height: "100%",
          visibility: hasDropped ? "hidden" : "visible",
        }}
      >
        {isOver && <Typography variant="subtitle2" style={{
          padding: '1rem',
          marginTop: '.5rem',
          border: 'black 1px dotted '
        }}>Drop here!</Typography>}
      </div>
    );
  }

  function DroppableComComponent() {
    const [{ isOver, hasDropped }, drop] = useDrop(() => ({
      accept: ["component"], // Accept multiple types
      drop: (item) => {
        const gettodoIndex = todo.indexOf(item.item);
        if (gettodoIndex !== -1) todo.splice(gettodoIndex, 1);
        const getinpIndex = inp.indexOf(item.item);
        if (getinpIndex !== -1) inp.splice(getinpIndex, 1);
        const todos = JSON.parse(localStorage.getItem('todo')) || [];
        const inps = JSON.parse(localStorage.getItem('inp')) || [];
        const valueToRemove = item.item;
        const indextodo = todos.indexOf(valueToRemove);
        const indexinp = inps.indexOf(valueToRemove);
        if (indextodo !== -1) {
          todos.splice(indextodo, 1);
        }
        if (indexinp !== -1) {
          inps.splice(indexinp, 1);
        }
        localStorage.setItem('todo', JSON.stringify(todos));
        localStorage.setItem('inp', JSON.stringify(inps));

        if (!comp.includes(item.item)) {
          const comps = JSON.parse(localStorage.getItem('comp')) || [];
          comps.push(item.item)

          setComp([...comp, item.item]);
          localStorage.setItem('comp', JSON.stringify(comps));

        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        display=""
        style={{
          height: "100%",
          visibility: hasDropped ? "hidden" : "visible",
        }}
      >
        {isOver && <Typography variant="subtitle2" style={{
          padding: '1rem',
          marginTop: '.5rem',
          border: 'black 1px dotted '
        }}>Drop here!</Typography>}
      </div>
    );
  }

  const handleSubmit = () => {
    while (input !== "") {
      const todos = JSON.parse(localStorage.getItem('todo')) || [];


      if (
        !todo.includes(input) &&
        !comp.includes(input) &&
        !inp.includes(input) &&
        !todos.includes(input)
      ) {
        setTodo([...todo, input]);
        try {
          todos.push(input)
          localStorage.setItem('todo', JSON.stringify(todos));
          console.log("saved to localstorage")
          setInput('')
          return false
        } catch (e) {
          console.log(e)
        }
      }
      else {
        alert("Todo already exists! Delete if completed")
        setInput('')
        return false
      }
    }
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Hero setInput={setInput} input={input} handleSubmit={handleSubmit} />
        <Grid
          container
          mt={2}
          spacing={5}
          style={{
            padding: "0 2rem",
          }}
        >
          <Grid xs={12} md={6} lg={4} container item>
            <Paper
              elevation={4}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#CDC2AE",
              }}
            >
              <Typography sx={{ fontWeight: "light" }}>To-Do</Typography>
              {todo.length !== 0 && (<hr></hr>)}
              {todo.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem auto",
                  }}
                >
                  <DraggableComponent
                    key={index}
                    item={item}
                  ></DraggableComponent>
                </div>
              ))}
            </Paper>
          </Grid>
          <Grid xs={12} md={6} lg={4} container item>
            <Paper
              elevation={4}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#ECE5C7",
              }}
            >
              <Typography sx={{ fontWeight: "light" }}>In-Progress</Typography>
              {inp.length !== 0 && (<hr></hr>)}
              {inp.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem auto",
                  }}
                >
                  <DraggableComponent
                    key={index}
                    item={item}
                  ></DraggableComponent>
                </div>
              ))}
              <DroppableInpComponent></DroppableInpComponent>
            </Paper>
          </Grid>
          <Grid xs={12} md={6} lg={4} container item>
            <Paper
              elevation={4}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#C2DEDC",
              }}
            >
              <Typography sx={{ fontWeight: "light" }}>Completed</Typography>
              {comp.length !== 0 && (<hr></hr>)}
              {comp.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem auto",
                  }}
                >
                  <DraggableComponent
                    key={index}
                    item={item}
                    inComp={true}
                  ></DraggableComponent>
                  <IconButton style={{
                    marginLeft: '.5rem',
                  }} onClick={handleDelete(index)}>
                    <DeleteIcon
                      style={{
                        color: "rgba(0,0,0,.5)"
                      }}
                    />
                  </IconButton>
                </div>
              ))}
              <DroppableComComponent></DroppableComComponent>
            </Paper>
          </Grid>
        </Grid>
        {
          todo.length === 0 && inp.length === 0 & comp.length === 0 ? <h4 style={{ marginTop: '4rem' }}>Great ! Looks like you don't have any tasks</h4>
            :
            <h4 style={{ marginTop: '4rem' }}>You have tasks to complete !</h4>}
      </div>
    </DndProvider>
  );
}

export default App;
