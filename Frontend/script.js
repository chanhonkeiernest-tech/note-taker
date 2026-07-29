const url="http://localhost:3001/note";
const renameurl="http://localhost:3001/name";

var editingtext=null;
var listofnote=[];
var sortoption ="title";
var sortorder ="ase";
var searchQuery ="";
document.getElementById("title").style.backgroundColor = "red";
document.getElementById("ase").style.backgroundColor = "red";

//basic login function
async function login() {
     try {
      // Making a GET request to fetch data from the server
     const username = document.getElementById("username");
     const password = document.getElementById("password");
      const response = await fetch(`http://localhost:3001/note/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });
      
      
      if (!response.ok) { //check response
        throw new Error('Fail to login');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
      if (data.message=="Login successful"){
        location.replace("index.html")
      }
    
    } catch (error) {
      // Handle any errors that occur during the fetch process
       window.alert("login failed");
      console.error('Error with async/await:', error);
    }
}

//basic register function
async function register() {
     try {
      // Making a GET request to fetch data from the server
     const username = document.getElementById("new username");
     const password = document.getElementById("new password");
     const cpassword = document.getElementById("new confirm password");
     if(password.value!=cpassword.value){
        window.alert("password do not match")
     }else{
        const response = await fetch(`http://localhost:3001/note/newuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.value, password: password.value, cpassword:cpassword.value }),
        });
      
      
        if (!response.ok) { //check response
            throw new Error('register fail');
            window.alert("register fail try again")
        }
  
      // Parse the response body as JSON
        const data = await response.json();
        if (data.message=="User created"){
            const response = await fetch(`http://localhost:3001/note/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.value, password: password.value }),
            });
             location.replace("index.html")
        }
     }
      
    
    } catch (error) {
      // Handle any errors that occur during the fetch process
      console.error('Error with async/await:', error);
    }
}

//basic logout function
async function logout() {
    try{
        const response = await fetch(`http://localhost:3001/note/nouser`);
        // const result = await response.json(); 
        console.log(response.ok) ;
         if (!response.ok) { //check response
            throw new Error('fail to logout');
        }else{
            location.replace("login.html");
        }
    }catch(error){
        console.error('Error with async/await and fail to logout:', error);
    }
        
        
}

//a special helper function used to determine whether text in the text area has already been saved. This is to get the content of the note currently being editd.
async function geteditingtext(){
        try {
            
            if(editingtext==null)return null;
            const response = await fetch(url + "/" +editingtext);
            const result = await response.json();
            if(!response.ok){
                if(409==response.status){
                    window.alert("you are not login");
                    location.replace("login.html");
                    
                }

            }else{
                
                if(result.title==null||JSON.stringify(result)==={}){
                    return null
                }else{
                
                    return result.text.toString();   
                }
            }
            
            return null
        } catch (error) {
            return null;
        }
    }

//Gets all the notes under created by the user of the session. Upon recieving the list, it will display the result to the frontend.
async function allnotes() {
    try {
        //console.log("here");
        searchQuery=  document.getElementById("search").value;
        //const response = await fetch(url + "/" +sortoption + "/" +sortorder, {
      
        var linkURL=url + "?sortType=" +sortoption + "&order=" +sortorder;
        if (searchQuery!==""){
            linkURL+="&title="+searchQuery;
        }
        const response = await fetch(linkURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'  
                },
            });
         if(!response.ok){
            if(409==response.status){
                window.alert("you are not login");
                location.replace("login.html");
            }
        }
        const result = await response.json();
        //console.log(result);
        listofnote=result;
        const display = document.getElementById("notes");
       
        //let count=1;
        let output=``;
        var page=1;
       document.getElementById("page").innerHTML=page;
        for(i=0;i<listofnote.length;i++){
            
            if(page*5-5<=i&&i<page*5){
                title=listofnote[i].title;
                output+= `<li>`+title+ `<button id="`+title+`" onclick="renamenote(this.id)">rename</button> <button id="`+title+`" onclick="getnotes(this.id)">edit note</button> <button id="`+title+`" onclick="removenote(this.id)">remove note</button></li>\n`

            }
            
        }
        // listofnote.forEach((note, count, page) =>{
        //     console.log(page);
        //     if(5*page-5<=count<5*page){

        //     }
        //     count++;
        // });
        display.innerHTML=output;
        // const buttonListener = document.querySelectorAll();
        // buttonListener.forEach(button=>{
        //     button.addEventListener('click', renamenote(document.getElementById("but"),null))
        // })

   } catch (error) {
    console.error("Error fetching list of notes:", error);
  }
}

//Gets a specific note specified in the parameter where the note is also created by the user of the session.
async function getnotes(name) {
    

    try {
        //Since this involves changing the editing area, it will give a warning if the user is at risk of losing their unsaved work.
        event.preventDefault();
        let nochange =false;
        const gettext=await geteditingtext();
        const currententry=document.getElementById("entry").value;
        console.log(document.getElementById("entry").value);
         console.log(gettext);
        if(currententry===gettext){
            nochange=true;
        }
        if(editingtext==null&&currententry===""){
            nochange=true;
        }  
        if(nochange==false){
            if(window.confirm("You will loss your save")){
                
            }else{
                return null;
            }
        }else{

        }


        
        const response = await fetch(url + "/" +name.toString());
        const result = await response.json();
        if(!response.ok){
            if(409==response.status){
                window.alert("you are not login");
                location.replace("login.html");
            }
        }
        console.log(JSON.stringify(result));
        if(result.title==null||JSON.stringify(result)==={}){
            window.alert("cannot find note");
        }else{
            editingtext=result.title;
            const display = document.getElementById("notetitle");
            display.innerHTML=editingtext;
            //const textforedit = document.getElementById("entry");
            document.getElementById("entry").value=result.text;
        }


    } catch (error) {
        console.error("Error fetching note:", error);
    }
}

//Saves user's note. Based on the situation, it will use either the save or update route.
async function noteentry(errorsource){

    try {
        //If the title entered by the user has already been used by the user, it will ask for a different title. It will also change the parameter and call itself accordingly based on the response code.
        var newtitle=null;
        if(editingtext==null){
            
            if(errorsource=="badT"){
                while(newtitle==null||newtitle==""){
                    newtitle = prompt("This title has already been use please reenter", "");
                    if(newtitle===null)break;
                }
                
            }else if (errorsource=="noT"){
                while(newtitle==null||newtitle==""){
                    newtitle = prompt("Please enter new note title", "");
                    if(newtitle===null)break;
                }
            }else{
                while(newtitle==null||newtitle==""){
                    newtitle = prompt("Please enter new note title", "");
                    if(newtitle===null)break;
                }
            }
        }
        //New note case
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
                if(400==response.status)noteentry("badT");
                 
                if(409==response.status){
                    window.alert("you are not login");
                    location.replace("login.html");
                    
                }
                else if(402==response.status){
                    window.alert("please don't use symbol such as <, //");
                }
                else {
                     window.alert("fail to save");
                    throw new Error(`HTTP Error: ${response.status}`);
                } 
                
             
            }else{
                window.alert("new note saved");
                editingtext=newtitle;
                
                document.getElementById("notetitle").innerHTML=editingtext;
                allnotes();
            }
        //update note case
        }else if (editingtext!=null&&newtitle==null){
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
                if(400==response.status){
                    editingtext=null;
                    document.getElementById("notetitle").innerHTML=``;
                    noteentry("noT");
                    
                } else if (409==response.status){
                    window.alert("you are not login");
                    location.replace("login.html");
                    
                }else if(402==response.status){
                    window.alert("please don't use symbol such as <, //");
                }
                else{
                    window.alert("cannot edit note");
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                
            }else{
                window.alert("new note saved");
                if(document.getElementById("search").value!==searchQuery){
                    allnotes();
                }
            }
        }
    } catch (error) {
        console.error("Error in create or editing note:", error);
    }

}
//renames a note 
async function renamenote(old){
    try{
        event.preventDefault();
        console.log(old);
         let newtitle=null;
        // let old =document.getElementById(event.target.id);
        // if(errorsource=="badT"){
        //     while(newtitle==null||newtitle=="")newtitle = prompt("This title has already been use please reenter", "");
        // }else{
             while(newtitle==null||newtitle==""){
                newtitle = prompt("Please enter new note title", "");
                if(newtitle===null)break;
             }
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
                    editingtext=newtitle;
                }
                
                window.alert("rename successful");
            }else{
                if(400==response.status){
                    window.alert("please try other title");
                    //renamenote(old, "badT");
                }else if(501==response.status){
                    window.alert("title do not exist");
                }else if(409==response.status){
                    window.alert("you are not login");
                    location.replace("login.html");
                    
                

                }else if(402==response.status){
                    window.alert("please don't use symbol such as <, //");
                }
                else throw new Error(`HTTP Error: ${response.status}`);
                
            }
        }
        
        

    }catch (error) {
        console.error("Error in renaming:", error);
    }
}
//deletes a note chosen by the user of the session.
async function removenote(name) {
    try {
        event.preventDefault();
        //name=name.toString();
        //const response = await fetch(url + "/" +name.toString());
        const data = {
                title: name.toString()
            }
        const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(data)
            });
        const result = await response.json();
        console.log(JSON.stringify(result));
        if(response.ok){
            allnotes();
            if(editingtext==name.toString()){
                editingtext=null;
                const display = document.getElementById("notetitle");
                display.innerHTML="unsaved notes";
                const textforedit = document.getElementById("entry").value="";
                //textforedit.innerHTML="";
            }
            window.alert("note removed");

        }else{
            if(402==response.status){
                allnotes();
                window.alert("this note do not exist");
            }else if(409==response.status){
                    window.alert("you are not login");
                    location.replace("login.html");
                    
            }
            else window.alert("remoeve fail");

        }
        



    } catch (error) {
        window.alert("remoeve fail");
        console.error("Error fetching note:", error);
    }
}
//This is used to clear the text area for editing a brand new note
async function newnote(){
        event.preventDefault();
  
        let nochange =false;
        const gettext=await geteditingtext();
            if(document.getElementById("entry").value===gettext){
                nochange=true;
            }
            if(editingtext==null&&document.getElementById("entry").value===""){
                nochange=true;
            }    
           


        
        if(nochange==false){
            if(window.confirm("You will loss your save")){
                const display = document.getElementById("notetitle");
                display.innerHTML="unsaved notes";
                const textforedit = document.getElementById("entry").value="";
                editingtext=null;
            }
            
        }else{
            const display = document.getElementById("notetitle");
            display.innerHTML="unsaved notes";
            const textforedit = document.getElementById("entry").value="";
            editingtext=null;
        }   
    
    
}

//The maximum number of notes to be displaied at once is 5, thus a page system is needed to allow the user to view beyond 5.
async function prevpage(){
    const display = document.getElementById("notes");
    const currentpage = document.getElementById("page").innerHTML;
    page=currentpage;
    page--;
    console.log(page>0&&page*5-listofnote.length<=5);
    if(page>0&&page*5-listofnote.length<5){
        let count=1;
        let output=``;
        for(i=0;i<listofnote.length;i++){
            
            if(page*5-5<=i&&i<page*5){
                title=listofnote[i].title;
                output+= `<li>`+title+ `<button id="`+title+`" onclick="renamenote(this.id)">rename</button> <button id="`+title+`" onclick="getnotes(this.id)">edit note</button> <button id="`+title+`" onclick="removenote(this.id)">remove note</button></li>\n`

            }
            
        }
            
   
        display.innerHTML=output;
        document.getElementById("page").innerHTML=page;
    }
    
    
}
async function nextpage(){
    
    const display = document.getElementById("notes");
    var currentpage = document.getElementById("page").innerHTML;
    page=currentpage;
    page++;
    console.log(page);
    if(page>0&&page*5-listofnote.length<5){
        let count=1;
        let output=``;
        for(i=0;i<listofnote.length;i++){
            
            if(page*5-5<=i&&i<page*5){
                title=listofnote[i].title;
                output+= `<li>`+title+ `<button id="`+title+`" onclick="renamenote(this.id)">rename</button> <button id="`+title+`" onclick="getnotes(this.id)">edit note</button> <button id="`+title+`" onclick="removenote(this.id)">remove note</button></li>\n`

            }
            
        }
            

        display.innerHTML=output;
        document.getElementById("page").innerHTML=page;
    }
    
    
}
//Controls how the list is being displayed either by changing the quantifier or the ordering.
async function sortchange(change) {
    if(change==="title"&&sortoption!==change){
        sortoption=change;
        document.getElementById("title").style.backgroundColor = "red";
        document.getElementById("time").style.backgroundColor = " rgb(247, 176, 243)";

        allnotes();
    }else if(change==="timestamps"&&sortoption!==change){
        sortoption=change;
        document.getElementById("time").style.backgroundColor = "red";
        document.getElementById("title").style.backgroundColor = " rgb(247, 176, 243)";
        allnotes();
    }else if(change==="ase"&&sortoption!==change){
        sortorder=change;
        document.getElementById("ase").style.backgroundColor = "red";
        document.getElementById("dec").style.backgroundColor = " rgb(247, 176, 243)";
        allnotes();
    }else if (change==="dec"&&sortoption!==change){
        sortorder=change;
        document.getElementById("dec").style.backgroundColor = "red";
        document.getElementById("ase").style.backgroundColor = " rgb(247, 176, 243)";
        allnotes();
    }
    
}
//User can choose to do a note search by entering a query in the search box and activate a search.
async function search(){
    allnotes();

}