import React , { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Movies from './Components/Movies';
import Popup from './Components/Popup';

const App= ()=>{


                              const[ state , setState]=useState({
                                      title:"rabbit",
                                      results:[],
                                      selected:{}

                                });
                              
                                const Search=(e)=>{
                                  if( e.key === "Enter"){
                                    fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${state.title}`)
                                    .then(response=>response.json())
                                    .then(data=>{
                                      let dat = data.data.movies;
                                      setState( prevState=>{
                                        return{ ...prevState, results:dat}
                                      })
                                    })

                                  }
                                };

                              const handleInput=(e)=>{
                                let typed= e.target.value;
                                setState(prevState=>{
                                  return{...prevState, title:typed}
                                })
                              };

                              const openPopup =async(id)=>{
                                const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
                                const data = await response.json();
                                  let selected = data.data.movie;
                                  setState(prevState=>{
                                    return{...prevState, selected:selected }
                                  }
                                  );
                              }

                              


                              const closePopup=()=>{
                                setState(prevState=>{
                                  return{...prevState, selected :{}}
                                })
                              }
                return (

                        <div className="App">
                          <Navbar handleInput={ handleInput } Search={ Search }  />
                          <Movies movies={state.results} openPopup={  openPopup } />
                          {(typeof state.selected.title !="undefined")? <Popup  selected={state.selected} closePopup={closePopup}/>: false}

                        </div>
                );
              
            }

export default App;
