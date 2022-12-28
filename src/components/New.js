    import React, { useState, useEffect } from 'react';
import { useDispatch, Provider, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";
import { Link } from 'react-router-dom';
import Moment from 'moment';

const New = () => {
    const [loading, setIsLoading] = useState(false);
    const [newObject, setNewObject] = useState([]);
    const [comments, setComments] = useState([]);

    let { topicId } = useParams();
    const tasks = useSelector(state => state);
    
    function sendRequest( id, dataArray ){
        return new Promise(resolve => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((response) => response.json()) 
            .then(response => {  
                dataArray.push(response)  
                resolve(); 
            });
        });
    } 

    const getComments = async (data) => {      
        const ids = []
        const promiseArray = []
        if(data!=undefined){
            data.map(id => {               
                if(!ids.includes(id)){ 
                    ids.push(id)
                    let newPromise = sendRequest( id, comments );
                    promiseArray.push(newPromise);          
                }
            })
            await Promise.all(promiseArray);
        }
        
        setIsLoading(true)  
    
 
    }
    const getItem = async () => {
        const data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${topicId}.json`)
        .then((response) => response.json())
        .then((data) => { 
            setNewObject(data)
            getComments(data.kids)
         })
        
    }
   
    useEffect(() => { 
        getItem()
    }, [])
    
    return (
        <div>
            
            <Link to="/">
                Return 
            </Link>
            <div onClick={getItem}>Reload</div>
            <div>
                <a target="_blank" href={newObject.url}>{newObject.title}</a>
            </div>
            <div>
                Author: {newObject.by}
            </div>
            <div>
                Date: Date: {Moment(new Date( newObject.time*1000 )).format(" DD-MM-yyyy hh:MM:ss")}
            </div>
            <div>
                Comments:
                <ul>
                    {comments.map((itm, key) => (
                        <li key={key} style={{marginLeft:10}}>{itm.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
const styles = {
    newsUl:{
        listStyle: "inside none",
        textAlign: "left"
    },
    newsLi:{
        fontSize: 14,
        marginBottom:10
    }
    
}
export default New