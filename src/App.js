import React, { useState, useTransition } from 'react'
import A from "./app.module.css"
import { data } from './data'
import Item from './components/Item'

const dataSort = {
  name : 'A',
  address: 'A',
  phone:'A',
  email: 'A'
}

function App() {
  const [state, setState]=useState(data)
  const [search,setSearch]=useState("")
  const [isLoading, startTransition] = useTransition()

  const sortName = (key) =>{  ///  'name' ; 'adress' ; 'email'  // a[email]

    const newArr = state.sort((a, b)=>{

      const nameA = a[key].toUpperCase();
      const nameB = b[key].toUpperCase();

      if(dataSort[key]==="A"){
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
      }
      else{
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    })
    setState(newArr)
  }

  const transform = (n)=>{
    const res = n.match(/\d+/g)
    return +res.join("")
  }

  const sortPhone = (key)=>{

    const newArr = state.sort(function (a, b) {

       if(dataSort[key]==="A") {
        return  transform(a.phone) - transform(b.phone)
       } else {
        return  transform(b.phone) - transform(a.phone)
      }
    });
    setState(newArr)
  }

  const sort = (e) => startTransition (()=>{
    const key = e.target.value
  dataSort[key] = dataSort[key] == 'A' ? 'B' :'A'

      switch (key){
        case 'phone':sortPhone(key);
          break
        default :sortName(key);
          break
      }

  })

  const filteredArray = (text) => {
    text = text.toLowerCase().trim()
  const newArr =  data
    .filter(elem =>
    elem.name.toLowerCase().includes(text) ||
    elem.address.toLowerCase().includes(text) ||
    elem.email.toLowerCase().includes(text) ||
    elem.phone.toLowerCase().includes(text)
  )
    setState(newArr)
  }

  const sortInput = (e)=>{
     setSearch(e.target.value)

     filteredArray(e.target.value)
  }

  return (
    <div className={A.App}>

      <input type="search"
             placeholder='search'
             onInput={sortInput}

      />

      <header className={A.C_beetween} onClick={sort}>
        <button className={A.elem} value="name">Name</button>
        <button className={A.elem + ' ' + A.elemAddress } value="address">Address</button>
        <button className={A.elem} value="phone">Phone</button>
        <button className={A.elem + ' ' + A.elemEmail} value="email">Email</button>
      </header>

      <section className={A.info}>
        {
          isLoading
            ? 'Loading...'
            : state.map((elem)=><Item key={elem.guid} {...elem} />)
        }

      </section>
    </div>
  );
}

export default App;


//
//
//
// let n1 = '(589) 858-9752'
// let n2 = '1-457-571-4196'
//
//
// const transform = (n)=>{
//   const res = n.match(/\d+/g)
//   return +res.join("")
// }
// transform(n1)
// transform(n2)
