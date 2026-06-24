import note from '../model/notedb.js';
import account from '../model/accountdb.js';
const allnotes=async (req, res) => {
    try{
        const currentuser=await account.findOne({username : req.user.username});
        const listofnotes= await note.find({user:currentuser._id});
       
        
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
            const currentuser=await account.findOne({username : req.user.username});
            
            const resultnote = await note.findOne({ title : entry, user:currentuser._id});
            console.log(resultnote);
            res.status(201).json(resultnote);
        }

    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
};
    


const newnote = async(req, res) => {
    try{
        const finduser=req.user.username;
        
        const {title, text} = req.body;
        const currentuser=await account.findOne({username : finduser});
        const check = await checkdonotexist(title, currentuser._id);
        //console.log(checkdonotexist(title, currentuser._id)===false);
        if(title==null||title==""||check===false){
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
        const currentuser=await account.findOne({username : req.user.username});
        // const resultnote = await note.find({title, user:currentuser._id});
        // console.log(resultnote);
        const check = await checkdonotexist(title,currentuser._id);
        if(title==null||title==""||check==true){
            res.status(400).json({ error: 'title do not exist' });
        }else{
            const updatednote = await note.findOneAndUpdate({title,user:currentuser._id},
                {
                    
                    $set:{
                        text
                    }
                    
                },{returnDocument: 'after'});
            if(updatednote)return res.status(200).json(updatednote);
            else return res.status(404).json({ error: 'updatefail' });
        }
    }catch (error){
        res.status(500).json({ error: error.message });
    }
    

};

const renamenote = async(req, res) => {
    try{
        const {oldtitle, newtitle} = req.body;
        const currentuser=await account.findOne({username : req.user.username});
        //const resultnote = await note.find({oldtitle, user: currentuser._id});
        const checkold = await checkdonotexist(oldtitle, currentuser._id);
        const checknew = await checkdonotexist(newtitle, currentuser._id);
        
        console.log(oldtitle);
        console.log(newtitle);
        if(checkold===true)res.status(501).json({ error: 'title problem' });
        if(newtitle==null||newtitle==""||checknew===false){
            res.status(400).json({ error: 'title problem' });
        }else{
            
            const target = {title: oldtitle, user:currentuser._id};
            const update = {
                $set: {
                    title: newtitle
                }
            };
            const updatednote = await note.findOneAndUpdate(target, update, {
                returnDocument: 'after'
            });
            
            if(updatednote)return res.status(200).json(updatednote);
            else return res.status(404).json({ error: 'updatefail' });
        }
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
    
};

const removenote =async (req, res) => {
    try{
        const {title} = req.body;
        //console.log("check");
        const currentuser=await account.findOne({username : req.user.username});
         const check = await checkdonotexist(title, currentuser._id);
         if(check==true) res.status(402).json("no such  note to delete");
        if(title==null||title==""){
            res.json({});
        }else{
            const currentuser=await account.findOne({username : req.user.username});
            
            const resultnote = await note.deleteOne({ title, user:currentuser._id});
            //check = await checkdonotexist(title, currentuser._id);
            res.status(201).json("removed");
            
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
    const resultnote = await note.exists({title: entry, user:id});
    //console.log(resultnote===null);
    if(resultnote===null) {
        return true;
    }

    return false;

}

    



export default {
  allnotes,
  getnote,
  newnote,
  renamenote,
  updatenote,
  removenote,
  any,
};
