const express=require("express")
const multer=require("multer")
const fs=require("fs")
const cors=require("cors")
const axios=require("axios")

const app=express()
app.use(cors())

const upload=multer({dest:"/tmp"})

const TOKEN=process.env.SUPERVISOR_TOKEN

app.post("/upload",upload.single("audio"),async(req,res)=>{

const temp=req.file.path
const target="/config/www/voice.webm"

fs.copyFileSync(temp,target)

await axios.post(
"http://supervisor/core/api/services/media_player/play_media",
{
entity_id:"media_player.sonos_lobby",
media_content_type:"music",
media_content_id:"http://192.168.2.25:8123/local/voice.webm",
announce:true
},
{
headers:{
Authorization:`Bearer ${TOKEN}`
}
}
)

res.json({status:"ok"})

})

app.listen(1301,()=>{
console.log("Voice upload server running")
})