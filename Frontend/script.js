const url="http://localhost:3001/list";
const renameurl="http://localhost:3001/rename";
let editingtext=null;

async function allnotes() {
    try {

        const response = await fetch(url);
        const result = await response.json();
        const display = document.getElementById("notes");
        let output=``;
        result.forEach(note =>{
            output+= `<li onclick=getnotes(${note.title})>${note.title} <button onclick="rename()">rename</button> </li>\n`
        });
        display.innerHTML=output;

   } catch (error) {
    console.error("Error fetching list of notes:", error);
  }
}

async function getnotes(name) {
    try {
        const response = await fetch(url + "/" +name);
        const result = await response.json();
        
        if(result.title==null||JSON.stringify(result)==="{}"){
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
        if(editingtext==null){
            let newtitle;
            if(errorsource=="badT"){
                while(newtitle==null||newtitle=="")newtitle = prompt("This title has already been use please reenter", "");
                
            }else if (errorsource=="noT"){
                while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
            }else{
                while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
            }
        }
        if(editingtext==null&&newtitle!=null){
            
            
            const data = {
                title: newtitle,
                text=document.getElementById("myTextArea").textContent
            }
            const response = await fetch('url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            
            if (!response.ok) {
                if(400<=response.status<500)noteentry("badT");
                else throw new Error(`HTTP Error: ${response.status}`);
                
                
            }else{
                window.alert("new note saved");
                editingtext=newtitle;
                
                document.getElementById("notetitle").innerHTML=editingtext;
            }
        }else if (newtitle!=null){
            const data = {
                title: editingtext,
                text=document.getElementById("myTextArea").textContent
            }
            const response = await fetch('url', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(postData)
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

async function renamenote(errorsource){
    try{
        let newtitle;
        if(errorsource=="badT"){
            while(newtitle==null||newtitle=="")newtitle = prompt("This title has already been use please reenter", "");
        }else{
            while(newtitle==null||newtitle=="")newtitle = prompt("Please enter new note title", "");
        }

        if(newtitle!=null){
            const data = {
                title: newtitle
                
            }
            const response = await fetch('renameurl', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(postData)
            });

            const result = await response.json();

            if (!response.ok) {
                window.alert("rename successful");
                allnotes();
                if(result.title==editingtext){
                    document.getElementById("notetitle").innerHTML=newtitle;
                }
            }else{
                if(400==response.status)renamenote(badT);
                else throw new Error(`HTTP Error: ${response.status}`);
                
            }
        }
        
        

    }catch (error) {
        console.error("Error in renaming:", error);
    }
}

async function newnote(){
    editingtext=null;
    const display = document.getElementById("notetitle");
    display.innerHTML=``;
    const textforedit = document.getElementById("entry");
    textforedit.innerHTML=``;
}