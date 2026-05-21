const Todo = require('../model/notedb');

const allnotes=async (req, res) => {
    res.json("list")
};
     
app.post('/note', (req, res)=>{
//TODO check duplicated note title
    if(req.body.title && req.body.text){
        const newnote={
            title:req.body.title,
            text: req.body.text
        }
        //TODO add to database
        res.status(201).json(newnote);
    }else{
        return res.status(404).send('Entry error');
    }
    
}
     

    

);


app.get('*', (req, res)=>
     res.redirect("http://localhost:${PORT}")
);