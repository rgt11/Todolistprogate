import './App.css';
import React, { createContext, useState } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext("light");

function Todo({ todo, index, centangTugas, hapusTugas }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-primary" onClick={() => centangTugas(index)}> <FontAwesomeIcon icon={faCheckCircle} /></Button>{' '}
        <Button variant="outline-danger" onClick={() => hapusTugas(index)}><FontAwesomeIcon icon={faCircleMinus} /></Button>
      </div>
    </div>
  );
}

function FormTodo({ tambahTugas }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    tambahTugas(value);
    setValue("");
  };
  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b id="textpre">Tambah Tugas</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Ketik disini . . ." />
    </Form.Group>
    <Button variant="primary mb-3 mt-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr ==="light" ? "dark" : "light"));
  };

  const [todos, setTodos] = React.useState([
    {
      text: "Makan",
      isDone:false
    },
    {
      text: "Ngoding",
      isDone:false
    },
    {
      text: "Tidur",
      isDone:false
    },
    {
      text: "Nongkrong",
      isDone:false
    }
  ]);
  const tambahTugas = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const centangTugas = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const hapusTugas = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className="App" id={theme}>
      <div className="container">
        <h1 className="text-center mb-4" id="textpre">To do List FGA Progate 2022</h1>
        
        <FormTodo tambahTugas={tambahTugas} />
        <div>
          {todos.map((todo, index) => (
            <Card className='mb-2 mt-2' id='isi'>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                centangTugas={centangTugas}
                hapusTugas={hapusTugas}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="switch">
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
      <div className="footer-copyright text-center py-3">
        <footer id='textpre'>
          &copy; {new Date().getFullYear()} Copyright by <a> Riyan Glory Tamba</a>
        </footer>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
