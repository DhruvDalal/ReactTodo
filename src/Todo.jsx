import React, { useEffect, useState } from "react";
import todo from "./images/todo.svg";

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return[];
    }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItem,setEditItem] =useState(null);
  const addItem = () => {
    if (!inputData) {
        alert ("please fill Data")
    }else if(inputData && !toggleSubmit) {
            setItems(items.map((ele)=>{
                if(ele.id === editItem){
                    return {...ele,name: inputData}
                }
                return ele;
            }))
            setToggleSubmit(true);
       setInputData("");
       setEditItem(null);
    } else {
        const allInputData = {id: new Date().getTime().toString(),name : inputData}
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const deleteItem = (id) => {
    setItems(items.filter((arrElem) => {
        return arrElem.id !== id;
      }));
    };
    const editTheItem = (id) => {
        
       let newEditItem = items.find((elem) => {
           return elem.id === id;
       });
       setToggleSubmit(false);
       setInputData(newEditItem.name);
       setEditItem(id);
    }

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" srcset="" />
            <figcaption>Add your List Here ✌️</figcaption>
          </figure>
          <div className="addItems" title="writeTodo">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              id=""
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit?
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            />:<i className="far fa-edit add-btn" title="edit Item" onClick={()=>addItem()}/>
}
          </div>
          <div className="showItems">
             { items.map((currVal)=>{
                 return (
                    <div className="eachItem" key={currVal.id}>
              <h3>{currVal.name}</h3>
              <div className="todo-btn">
              <i className="far fa-edit add-btn" title="edit Item" onClick={()=>editTheItem(currVal.id)}/>
              <i className="far fa-trash-alt add-btn" title="delete Item" onClick={()=>deleteItem(currVal.id)}/>
              </div>
            </div> 
                 );
             })}
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All ❌" onClick={()=>{
                setItems([])
            }}>
              <span>CHECK LIST ☑️</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
