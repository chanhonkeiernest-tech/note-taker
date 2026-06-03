const note = require('../model/notedb');
const account = require('../model/accountdb');
const allnotes=async (req, res) => {
    try{
        const currentuser=await account.find({username : req.user.username});
        const listofnotes= await note.find({user:currentuser}).select("-user");
       
        
        res.json(listofnotes);
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
};


const getnote=async (req, res) => {
    try{
        const entry=req.params.name;
        if(entry==null||entry==""){
            res.json({});
        }else{
            const currentuser=await account.find({username : req.user.username});
            
            const resultnote = await note.find({ title : entry, user:currentuser});
            res.json(resultnote);
        }

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
};
    


const newnote = async(req, res) => {
    try{
        const {title, text} = req.body;
        const currentuser=await account.find({username : req.user.username});
        if(title==null||title==""||checkdonotexist(title)==false){
            res.status(400).json({ error: 'bad title' });
        }else{
            const creatednote = new note({
                title, 
                text,
                user :currentuser
            });

            await creatednote.save();
            res.status(201).json(creatednote);
        }

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
};

const updatenote = async(req, res) => {
    try{
        const {title, text} = req.body;
        const currentuser=await account.find({username : req.user.username});
        const resultnote = await note.find({title, user:currentuser});
        // console.log(resultnote);
        if(title==null||title==""||checkdonotexist(title)==true){
            res.status(400).json({ error: 'title do not exist' });
        }else{
            const updatednote = await note.findOneAndUpdate({title},
                {
                    
                    $set:{
                        text
                    }
                    
                },{new: true});
            if(updatednote)return res.status(200).json(updatednote);
            else return res.status(404).json({ error: 'updatefail' });
        }
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
    

};

const renamenote = async(req, res) => {
    try{
        const {title, text} = req.body;
        const currentuser=await account.find({username : req.user.username});
        const resultnote = await note.find({title, user: currentuser});
        // console.log(resultnote);
        if(title==null||title==""||checkdonotexist(title)==true){
            res.status(400).json({ error: 'title do not exist' });
        }else{
            const updatednote = await note.findOneAndUpdate({title},
                {
                    
                    $set:{
                        text
                    }
                    
                },{new: true});
            if(updatednote)return res.status(200).json(updatednote);
            else return res.status(404).json({ error: 'updatefail' });
        }
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
    
};
     
const any = async(req, res) => {
    res.json("list")
};


async function checkdonotexist (entry){
    if(entry==null)return false;
    const resultnote = await note.find({title: entry});
    if(JSON.stringify(resultnote)==="{}") return true;
    else return false;

}

    



module.exports = {
  allnotes,
  getnote,
  newnote,
  renamenote,
  updatenote,
  any,
};
