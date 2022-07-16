import React, { useState, useEffect } from 'react';
import './App.css';
import TaskCreator from './components/TaskCreator';
import TaskTable from './components/TaskTable';
import VisivilityControl from './components/VisibilityControl';
import Container from './Container';

function App() {

  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const createNewTask = (taskName) => {
    if (!taskItems.find(task => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTaskItems(taskItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t))
  }

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data) {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  const cleanTasks = () => {
    setTaskItems(taskItems.filter(task => !task.done));
    setShowCompleted(false);
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        <VisivilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {
          showCompleted && (
            <TaskTable
              tasks={taskItems}
              toggleTask={toggleTask}
              showCompleted={showCompleted}
            />
          )
        }
      </Container>

    </main>
  );
}

export default App;
