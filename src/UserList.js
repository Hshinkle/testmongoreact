import React, {useRef} from 'react'

export default function UserList( props) {

    const sidRef   = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const gradeRef = useRef();

    const sendGetStudent = (sid) => {

        console.log('sendGetStudent id=' + sid)
        fetch(`http://localhost:5000/students/${sid}`, {
          method: 'GET',
        }).then(res => res.json())
          .then(data => {           
              //outAreaSetter( JSON.stringify(data.data ));
         
          let student = data.data
          console.log('sendGetStudent: student=' +JSON.stringify(student))
          sidRef.current.value = student.id;
          fnameRef.current.value = student.fname;
          lnameRef.current.value = student.lname;
          gradeRef.current.value = student.grade;
      })
          .catch(err => console.error("Error:", err));
      }


    const sendPost = () => {
        console.log('sendPost called')
        var sid = sidRef.current.value;
        var fname = fnameRef.current.value;
        var lname = lnameRef.current.value;
        var grade = gradeRef.current.value;
        var student = { fname: fname, lname: lname, grade: grade}
        console.log(JSON.stringify(student))
        fetch(`http://localhost:5000/students/`, {
             method: 'POST',
             body: JSON.stringify(student),
             headers: {
                "Content-Type": "application/json"
              }
        }).then(res => res.json())
            .then(data => {           
                console.log( JSON.stringify(data.data ));
            })
            .catch(err => console.error("Error:", err));
    }
    const sendDelete = ( sid) => {
        console.log('sendDelete')
        console.log('sid='+sid)
        var uri = `http://localhost:5000/students/${sid}`;
        console.log( uri)
        
        fetch(uri, {
          method: 'DELETE',
        })
        .then(res => res.json())
          .then(data => {           
            console.log( JSON.stringify(data.data ));
          })
          .catch(err => console.error("Error:", err));
    }
    const sendUpdate = ( sid) => {
        console.log('sendDelete')
        var sid = sidRef.current.value;
        var fname = fnameRef.current.value;
        var lname = lnameRef.current.value;
        var grade = gradeRef.current.value;
        var student = { fname: fname, lname: lname, grade: grade}
        console.log(JSON.stringify(student))  
        fetch(`http://localhost:5000/students/${sid}`, {
            method: 'PATCH',
            body: JSON.stringify(student),
            headers: {
               "Content-Type": "application/json"
             }
       }).then(res => res.json())
           .then(data => {           
               console.log( JSON.stringify(data.data ));
           })
           .catch(err => console.error("Error:", err));  
    }

    return (
        <div>
            <h3>Students</h3>
            <table width="100%">
                <thead>
            <tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Grade</th><th></th></tr>  
             </thead> 
             <tbody> 
            {
            props.students.map( (student, index) => {
                console.log('map: student=' +JSON.stringify(student))
                return (
                <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.fname}</td>
                    <td>{student.lname}</td>
                    <td>{student.grade}</td>
                    <td><button onClick ={()=> {sendGetStudent(student.id)}} >Query</button><button onClick={() => {sendDelete(student.id)}}>Delete</button></td>
                </tr>
                )
            })
            } 
            </tbody>       
            </table>          
            <div>ID <input type="text" ref={sidRef} /></div>
            <div>First Name <input type="text" ref={fnameRef} /></div>
            <div>Last Name <input type="text" ref={lnameRef} /></div> 
            <div>Grade <input type="text" ref={gradeRef} /></div> 
            <button onClick={sendPost}>Add</button>     
            <button onClick={sendUpdate}>Update</button>
    
        </div>

    )
}
