import note from '../model/notedb';
import account from '../model/accountdb';
const allnotes=async (req, res) => {
    try{
        const currentuser=await account.find({username : req.user.username});
        const listofnotes= await note.find({user:currentuser._id}).select("-user");
       
        
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
            
            const resultnote = await note.find({ title : entry, user:currentuser_id});
            res.json(resultnote);
        }

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
};
    


const newnote = async(req, res) => {
    try{
        const finduser=req.user.username;
        
        const {title, text} = req.body;
        const currentuser=await account.find({username : finduser});
        if(title==null||title==""||checkdonotexist(title, currentuser._id)==false){
            res.status(400).json({ error: 'bad title' });
        }else{
            const creatednote = new note({
                title, 
                text,
                user :currentuser._id
            });
            
            await creatednote.save();
            res.status(201).json({status:"created"});
        }

    }catch (error){
        res.status(500).json({ error: error.message  });
    }
};

const updatenote = async(req, res) => {
    try{
        const {title, text} = req.body;
        console.log(req.user.username);
        const currentuser=await account.find({username : req.user.username});
        // const resultnote = await note.find({title, user:currentuser._id});
        // console.log(resultnote);
        if(title==null||title==""||checkdonotexist(title,currentuser._id)==true){
            res.status(400).json({ error: 'title do not exist' });
        }else{
            const updatednote = await note.findOneAndUpdate({title,user:currentuser._id},
                {
                    
                    $set:{
                        text
                    }
                    
                },{new: true});
            if(updatednote)return res.status(200).json(updatednote);
            else return res.status(404).json({ error: 'updatefail' });
        }
    }catch (error){
        res.status(500).json({ error: error.message });
    }
    

};

const renamenote = async(req, res) => {
    try{
        const {title, text} = req.body;
        const currentuser=await account.find({username : req.user.username});
        const resultnote = await note.find({title, user: currentuser});
        // console.log(resultnote);
        if(title==null||title==""||checkdonotexist(title, currentuser._id)==true){
            res.status(400).json({ error: 'title do not exist' });
        }else{
            const updatednote = await note.findOneAndUpdate({title, user:currentuser._id},
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


async function checkdonotexist (entry, id){
    if(entry==null)return false;
    const resultnote = await note.find({title: entry, user:id});
    if(JSON.stringify(resultnote)==="{}") return true;
    else return false;

}

    



export default {
  allnotes,
  getnote,
  newnote,
  renamenote,
  updatenote,
  any,
};
