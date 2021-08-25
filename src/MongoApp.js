import React, {useEffect, useState} from 'react'
import UserList from './UserList';

export default function MongoApp() {
    const [outArea, outAreaSetter] = useState("");
    const [students, studentsSetter] = useState([])  //const students =[]
    


    const sendGet = () => {
      console.log('sendGet')
      fetch(`http://localhost:5000/students/`, {
        method: 'GET',
      }).then(res => res.json())
        .then(data => {           
            //outAreaSetter( JSON.stringify(data.data ));
       
        let students = data.data
        studentsSetter([...students]) 
    })
        .catch(err => console.error("Error:", err));
    }
    useEffect( ()=> {
        students.forEach( (student) =>{
          console.log( JSON.stringify( student))
        })      
      }, [students])
  


    return (
      <div>
        <h3>Mongo/Express Client</h3>
        <div><button onClick={sendGet}>Query All Students</button></div>
        <div><button >Query Student</button></div>
        
        <div>{outArea}</div>
        <UserList students={students}/>

        </div>
    )
}