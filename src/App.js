import React, { useEffect, useState } from 'react'
import { BsFillCheckSquareFill, BsFillSquareFill, BsPlusSquareFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import todoimg from './todo.png';


const App = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('todo') || '[]';
      return JSON.parse(stored)
  });

  useEffect(() => {
      localStorage.setItem('todo', JSON.stringify(items))
  }, [items])

  const addItem = (e) => {
    e.preventDefault()
    if (input) {
      setItems([...items, { entry: input, id: Date.now(), complete: false }])
      setInput('')
    } else (
      alert('Add a task')
    )
  }

  const toggleCheck = (key) => {
    setItems(currentItem => {
      return currentItem.map((item) => {
        if (item.id === key) {
          return { ...item, complete: !item.complete }
        }
        return item
      });
    })
  }


  const deleteItem = (id) => {
    const newItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newItems);
  }

  const deleteAll = () => {
    if (items.length !== 0) {
      if (window.confirm('Are you sure you wish to delete all items?')) {
        setItems([]);
      }
    } else {
      alert('Add tasks')
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      <div className="w-full flex-col max-w-[600px] flex justify-center items-center bg-slate-700 p-4 sm:pl-8 sm:pr-8 sm:pb-8 rounded-lg m-4">
        <figure className='flex justify-center items-center flex-col'>
          <img src={todoimg} alt='todo' width={150} height={150}/>
          <figcaption className="text-white text-xl text-center">
            Add Your Tasks Below
          </figcaption>
        </figure>
        <form onSubmit={addItem} className="w-full flex flex-row items-center gap-3 m-6">
          <input
            type="text"
            className=" bg-slate-200 rounded-md border-2 p-3 w-[90%] outline-white focus:bg-white caret-white text-lg text-slate-700"
            placeholder="Add Task"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className=" text-green-400 bg-white hover:bg-slate-700 rounded-lg">
            <BsPlusSquareFill size={53} />
          </button>
        </form>

        {items.map((item) => {
          return (
            <div key={item.id} className="w-full border-2 border-white bg-slate-700 flex items-center justify-between p-2 rounded-md m-2">
              <div className=' rounded-md flex gap-3 text-lg text-white' onClick={() => toggleCheck(item.id)}>
                {item.complete ? <BsFillCheckSquareFill size={30} className=' text-green-400 hover:text-green-400 rounded-md hover:bg-white' /> : <BsFillSquareFill size={30} className=' text-white hover:text-green-400 rounded-md hover:bg-white' />}
                <h2 className={item.complete ? 'line-through text-gray-400' : null}>{item.entry}</h2>
              </div>
              <div className="border-l-2 pl-3">
                <button className="">
                  <FaTrashAlt size={30} className="text-white hover:text-red-400" onClick={() => deleteItem(item.id)} />
                </button>
              </div>
            </div>
          )
        })}
        <div className='w-full flex justify-between'>
          <h2 className='text-white text-lg'>{`You have ${items.length} tasks.`}</h2>
          <button className='text-white hover:text-red-400' onClick={deleteAll}>Delete All</button>
        </div>
      </div>

    </div >
  );
}

export default App
