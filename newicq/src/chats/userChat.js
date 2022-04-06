import './userChat.css'
import { dbChats, dbMsg, dbMsgInChat, dbUsers } from '../dbHandle/dbHardcoded';
import { Component } from 'react';

class ProfilePicture extends Component {
    constructor(username){
    super();
    if (dbUsers[username].img !== ""){
        this.img = dbUsers[username].img;
    }
    else {
        this.img = "/default_picture.jpg"
    }
  }
  getPic(){
      return this.img
  }
}
class LastMsg extends Component {
    constructor(username){
        super();
        var currChat;
        // get the chat that contain the convection between them:
        for (const [key, value] of Object.entries(dbChats)) {
            if (value[0] == username || value[1] == username){
                currChat = key;
                break;
            }
        }
        var clock = "00:00" 
        var lastMsg = ""
        
        for (var i=0; i <dbMsgInChat[currChat].length; i++){
            // check which msg was the last that arrived from user1:
            if (dbMsgInChat[currChat][i].from === username && clock < dbMsg[dbMsgInChat[currChat][i].idMsg].date){
                clock = dbMsg[dbMsgInChat[currChat][i].idMsg].date
                lastMsg = dbMsg[dbMsgInChat[currChat][i].idMsg].text
            }
        }
        this.state = {time:clock, msg:lastMsg}
        
    }
}


function UserChat({user}) {
    return (
        <div class="list-group">
        
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <img src={new ProfilePicture(user).getPic()} alt="default" class="img-thumbnail"></img> 
                    <h5 class="mb-1">{user}</h5>
                    <span class="text-muted badge badge-info">msg not seen: </span>
                </div>
                <p class="mb-1">last message: {new LastMsg(user).state.msg}  
                <small  class="text-muted"><small> since {new LastMsg(user).state.time} </small></small> 
                </p>
            </a>
        </div>
    );
}
export default UserChat;