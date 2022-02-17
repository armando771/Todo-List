import React, { useState, useEffect } from 'react';

import API from '../helpers/axios';

function TodoList() {
  const [allList, setAllList] = useState([]);
  const [newTask, setNewTask] = useState([{
    taskName: '',
    taskContent: '',
    taskStatus: ''
  }]);

  console.log(newTask);

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
      <form>
        <h2>Adicionar nova tarefa</h2>

        <label htmlFor="taskName">Nome da tarefa</label>
        <input type='text' name='taskName' id='taskName' value={ newTask.taskName } onChange={ handleChange }/>

        <label htmlFor="taskContent">Conteudo da tarefa</label>
        <input type='text' name='taskContent' id='taskContent' value={ newTask.taskContent } onChange={ handleChange }/>

        <label htmlFor="taskStatus">Status da tarefa</label>
        <select name='taskStatus' id='taskStatus' value={ newTask.taskStatus } onChange={ handleChange } >
          <option>Completa</option>
          <option>Em andamento</option>
          <option>Incompleta</option>
        </select>

        <button type='button' onClick={ () => createItem()} >Create</button>

      </form>

      <ul>
        {
          allList.map(({
            taskName, taskContent, taskStatus, _id,
          }) => (
            <li key={_id}>
              <span>Tarefa: { taskName }</span> <br />
              <span>Descrição: { taskContent }</span> <br />
              <span>Status{ taskStatus }</span>
              <button type='button' onClick={ () => deleteItem(_id)}>Apagar</button>
            </li>
          ))
        }
      </ul>
    </main>
  );
}

export default TodoList;
