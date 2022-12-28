import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import New from './New';
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import Moment from 'moment';

const News = () => {

    const [ids, setIds] = useState([]);
    
    const [dataArray, setDataArray] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    function sendRequest( id, dataArray ){
        return new Promise(resolve => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((response) => response.json())
            .then(response => {  
                dispatch(actions.addTask(response));
                dataArray.push(response) 
                resolve(); 
            });
        });
    }

    const getPosts = async () => {        
        const data = await fetch ('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then((response) => response.json())
        .then((data) => { 
            return data.slice(0, 10);   
        })
         
        //setIds(data)

        let promiseArray = []; 
        const ids = []
        
        data.map(id => {
            if(!ids.includes(id)){
                ids.push(id)
                let newPromise = sendRequest( id, dataArray );
                promiseArray.push(newPromise);
                console.log(dataArray)
            }
        })

        await Promise.all(promiseArray);
       
        setIsLoading(true)        
    }

    useEffect(() => { 
        getPosts()
    }, [])

    useEffect(() => {
        setInterval(() => {
            getPosts()
        }, 60000);
    }, []);
    
    const listNews = () =>{
        const sorted_news = dataArray.sort((news1, news2) => news1['time'] < news2['time'] ? 1 : -1);
        return <ul style={styles.newsUl}>
                {sorted_news.map((itm, key) => (
                    <li style={styles.newsLi} key={key}>
                        <Link to={`/new/${itm.id}`}>
                            {itm.title} ({itm.score}) 
                        </Link>
                        <div>
                            Author: {itm.by}
                        </div>
                        <div>
                            Date: {Moment(new Date( itm.time*1000 )).format(" DD-MM-yyyy hh:MM:ss")}
                        </div>
                        
                    </li>
                ))
                }
            </ul>
    }
    return (
        <div>
        <div>News</div>
        <div onClick={getPosts}>Reload</div>
            {loading?
                listNews()
            :null
            }      
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
export default News