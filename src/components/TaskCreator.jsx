import React, { useState } from 'react';

const TaskCreator = ({ createNewTask }) => {

    const [newTaskName, setNewTaskName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewTask(newTaskName);
        setNewTaskName('');
    }

    return (

        <form onSubmit={handleSubmit} className='my-2 row'>
            <div className='col-9'>
                <input type="text" placeholder='Entre a new task'
                    onChange={(e) => setNewTaskName(e.target.value)}
                    value={newTaskName}
                    className='form-control'
                />
            </div>

            <div className='col-3'>
                <button
                    className='btn btn-primary btn-sm'
                >Save Task</button>
            </div>
        </form>
    );
}

export default TaskCreator;