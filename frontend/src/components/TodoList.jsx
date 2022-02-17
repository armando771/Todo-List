import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import API from '../helpers/axios';

const useStyles = makeStyles({
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    width: '50%',
    border: '1px transparent solid',
    background: '#DCDCDC',
    padding: '20px',
    borderRadius: '5%'
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  uList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputAddName: {
    width: '80%',
    margin: 'auto',
  },
  inputAddContent: {
    width: '80%',
    margin: 'auto',
  },
  buttonAdd: {
    width: '30%',
    margin: 'auto',
    fontFamily: 'monospace'
  },
  labels: {
    fontFamily: 'monospace'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px transparent solid',
    background: '#DCDCDC',
    borderRadius: '5%',
    width: '40%',
    marginBottom: '10px',
    paddingBottom: '10px',
    margin: 'auto'
  },
  spans: {
    padding: '3px',
    fontWeight: '600'
  },
  buttonDelete: {
    padding: '5px',
    width: '30%',
    margin: 'auto',
    fontFamily: 'monospace'
  }
})

function TodoList() {
  const classes = useStyles();
  const [allList, setAllList] = useState([]);
  const [newTask, setNewTask] = useState([{
    taskName: '',
    taskContent: '',
    taskStatus: ''
  }]);

  useEffect(() => {
    const axiosRequest = async () => {
      const { tasks } = await API.getAllTasks();
      setAllList(tasks);
    };
    axiosRequest();
  }, []);

  const createItem = async () => {
    const { taskName, taskContent, taskStatus } = newTask;
    const dt = { taskName, taskContent, taskStatus  }
    const newItem = await API.createTask(dt);
    setAllList([ ...allList, newItem ])
    setNewTask({ taskName: '', taskContent: '', taskStatus: '' })
  };

  const deleteItem = (id) => {
    try {
      API.deleteTask(id)
      setAllList(allList.filter(({ _id: idTask}) => id !== idTask ));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewTask((pv) => ({
      ...pv,
      [name]: value,
    }));
  }

  return (
    <main>
      <form className={classes.formStyle}>
        <h2 className={classes.heading} >Adicionar nova tarefa</h2>

        <label htmlFor="taskName" className={classes.labels} >Nome da tarefa</label>
        <input type='text' name='taskName' id='taskName' value={ newTask.taskName } onChange={ handleChange } className={classes.inputAddName}/>

        <label htmlFor="taskContent" className={classes.labels} >Conteudo da tarefa</label>
        <input type='text' name='taskContent' id='taskContent' value={ newTask.taskContent } onChange={ handleChange } className={classes.inputAddContent} />

        <label htmlFor="taskStatus" className={classes.labels} >Status da tarefa</label>
        <select name='taskStatus' id='taskStatus' value={ newTask.taskStatus } onChange={ handleChange } className={classes.labels}  >
          <option>Completa</option>
          <option>Em andamento</option>
          <option>Incompleta</option>
        </select>
        <br />

        <button type='button' onClick={ () => createItem()} className={classes.buttonAdd} >Create</button>

      </form>

      <ul className={classes.uList}>
        {
          allList.map(({
            taskName, taskContent, taskStatus, _id,
          }) => (
            <li key={_id} className={classes.list}>
              <span className={classes.spans} >Tarefa: { taskName }</span>
              <span className={classes.spans} >Descrição: { taskContent }</span>
              <span className={classes.spans} >Status: { taskStatus }</span>
              <button className={classes.buttonDelete} type='button' onClick={ () => deleteItem(_id)}>Apagar</button>
            </li>
          ))
        }
      </ul>
    </main>
  );
}

export default TodoList;
