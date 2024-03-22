const mongoose=require('mongoose');
const colors=require('colors')

const connectToMongo=async ()=>{
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("db is connected successfully".red.bold)
    }catch(error){
      console.log("Error occures while connecting with mongoDb",error )
    }
}
module.exports=connectToMongo;