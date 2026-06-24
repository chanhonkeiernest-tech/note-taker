const url="http://localhost:3001/note/list";
const renameurl="http://localhost:3001/note/rename";
const removeurl="http://localhost:3001/note/remove";
var editingtext=null;

async function login() {
     try {
      // Making a GET request to fetch data from the server
     const username = document.getElementById("username");
     const password = document.getElementById("password");
      const response = await fetch(`http://localhost:3001/start/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });
      
      
      if (!response.ok) { //check response
        throw new Error('Network response was not ok');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
      if (data.message=="Login successful"){
        location.replace("http://localhost:3001/index.html")
      }
    
    } catch (error) {
      // Handle any errors that occur during the fetch process
      console.error('Error with async/await:', error);
    }
}


async function register() {
     try {
      // Making a GET request to fetch data from the server
     const username = document.getElementById("new username");
     const password = document.getElementById("new password");
     const cpassword = document.getElementById("new confirm password");
     if(password.value!=cpassword.value){
        window.alert("password do not match")
     }else{
        const response = await fetch(`http://localhost:3001/start/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.value, password: password.value }),
        });
      
      
        if (!response.ok) { //check response
            throw new Error('register fail');
            window.alert("register fail try again")
        }
  
      // Parse the response body as JSON
        const data = await response.json();
        if (data.message=="User created"){
            location.replace("http://localhost:3001/index.html")
        }
     }
      
    
    } catch (error) {
      // Handle any errors that occur during the fetch process
      console.error('Error with async/await:', error);
    }
}

async function allnotes() {
    try {
        //console.log("here");
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'  
                },
            });
        
        const result = await response.json();
        //console.log(result);
        const display = document.getElementById("notes");
        let output=``;
        result.forEach(note =>{
            output+= `<li>${note.title} <button id="${note.title}" onclick="renamenote(this.id)">rename</button> <button id="${note.title}" onclick="getnotes(this.id)">edit note</button> <button id="${note.title}" onclick="removenote(this.id)">remove note</button></li>\n`
            
        });
        display.innerHTML=output;
        // const buttonListener = document.querySelectorAll();
        // buttonListener.forEach(button=>{
        //     button.addEventListener('click', renamenote(document.getElementById("but"),null))
        // })

   } catch (error) {
    console.error("Error fetching list of notes:", error);
  }
}

async function getnotes(name) {
    try {
        //name=name.toString();
        const response = await fetch(url + "/" +name.toString());
        const result = await response.json();
        console.log(JSON.stringify(result));
        if(result.title==null||JSON.stringify(result)==={}){
            window.alert("cannot find note");
        }else{
            editingtext=result.title;
            const display = document.getElementById("notetitle");
            display.innerHTML=editingtext;
            const textforedit = document.getElementById("entry");
            textforedit.innerHTML=result.text;
        }


    } catch (error) {
        console.error("Error fetching note:", error);
    }
}

async function noteentry(errorsource){

    try {
        var newtitle=null;
        if(editingtext==null){
            
            if(errorsource=="badT"){
                while(newtitle==null||newtitle=="")newtitle = prompt("This title has already been use please reenter", "");
                
            }else if (errorsource=="noT"){
                while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
            }else{
                while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
            }
        }
        if(editingtext==null&&newtitle!=null){
            
            console.log(document.getElementById("entry").value);
            const data = {
                title: newtitle,
                text: document.getElementById("entry").value
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            if (!response.ok) {
                if(400<=response.status<500)noteentry("badT");
                else throw new Error(`HTTP Error: ${response.status}`);
                
                
            }else{
                window.alert("new note saved");
                editingtext=newtitle;
                
                document.getElementById("notetitle").innerHTML=editingtext;
                allnotes();
            }
        }else if (newtitle==null){
            console.log(document.getElementById("entry").value);
            const data = {
                title: editingtext,
                text: document.getElementById("entry").value
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (!response.ok) {
                if(400<=response.status<500){
                    editingtext=null;
                    document.getElementById("notetitle").innerHTML=``;
                    noteentry("noT");
                }else{
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                
            }else{
                window.alert("new note saved");
                
            }
        }
    } catch (error) {
        console.error("Error in create or editing note:", error);
    }

}

async function renamenote(old){
    try{
        console.log(old);
         let newtitle=null;
        // let old =document.getElementById(event.target.id);
        // if(errorsource=="badT"){
        //     while(newtitle==null||newtitle=="")newtitle = prompt("This title has already been use please reenter", "");
        // }else{
             while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
        // }

        if(newtitle!=null){
            //console.log(old.text);
            const data = {
                oldtitle: old.toString(),
                newtitle: newtitle
                
            }
            const response = await fetch(renameurl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                
                allnotes();
                if(editingtext==old.toString()){
                    document.getElementById("notetitle").innerHTML=newtitle;
                }
                window.alert("rename successful");
            }else{
                if(400==response.status){
                    window.alert("please try other title");
                    //renamenote(old, "badT");
                }else if(501==response.status){
                    window.alert("title do not exist");
                }
                else throw new Error(`HTTP Error: ${response.status}`);
                
            }
        }
        
        

    }catch (error) {
        console.error("Error in renaming:", error);
    }
}

async function removenote(name) {
    try {
        //name=name.toString();
        //const response = await fetch(url + "/" +name.toString());
        const response = await fetch(removeurl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: {title: name.toString()}
            });
        const result = await response.json();
        console.log(JSON.stringify(result));
        if(result.title==null||JSON.stringify(result)==={}){
            window.alert("cannot find note");
        }else{
            editingtext=result.title;
            const display = document.getElementById("notetitle");
            display.innerHTML=editingtext;
            const textforedit = document.getElementById("entry");
            textforedit.innerHTML=result.text;
        }


    } catch (error) {
        console.error("Error fetching note:", error);
    }
}

async function newnote(){
    editingtext=null;
    const display = document.getElementById("notetitle");
    display.innerHTML=``;
    const textforedit = document.getElementById("entry");
    textforedit.innerHTML=``;
}


