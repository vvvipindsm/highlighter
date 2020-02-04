import React from 'react';

import './App.css';
import Data from '../src/data_file.json'
import Highligter from '../src/highlight.json'
class App extends React.Component {
  constructor(props) {
  super(props);
  let inclusion = []
  let exclusion = []
  Highligter.map(items=> {
    if(typeof items.annotations != 'undefined' ) {
      inclusion.push(Object.values(items.annotations.annotations.encounters.inclusion))
    // inclusion.push(Object.values(items.annotations.annotations.encounters.inclusion))
     exclusion.push(Object.values(items.annotations.annotations.encounters.exclusion))
    }
  })
  this.state = {
    header : Object.keys(Data.deIdentifiedFile),
    inclusion,
    exclusion
  }

  
  }
  findValueType = (content) => {
    let inclusionStatus = this.state.inclusion.find(items => {
       if(items[0] == content) {
         return true
      }
      return false
    })

    let exlusionStatus = this.state.exclusion.find(items => {
      if(items[0] == content) {
        return true
     }
     return false
   })
    if(inclusionStatus == true) {
      return 'inclusion'
    }
    else if(exlusionStatus) {
      return 'exlusion'
    }
    else {
      return 'none'
    }
    
  }
  renderRow = ()=> {
    const cols = this.state.header
    let rows = []
    
   cols.forEach(headerAsIndex => {
     let TempData = Data.deIdentifiedFile[headerAsIndex]
      //check it's string or object
      if(typeof TempData != "object" ) {
       rows.push(<td>{TempData}</td>)

      }
      else {
        let ObjectKeys =  Object.keys(TempData)
        let TempDataString = []
        ObjectKeys.forEach(ObjKey=> {
          if(typeof TempData[ObjKey] != 'object') {
              TempDataString.push(TempData[ObjKey])
           }
           else {
            let ObjectKeys1 =  Object.keys(TempData[ObjKey])
        
            ObjectKeys1.forEach(items => {
              // console.warn(items)
                let ObjectsKeys2 = Object.keys(TempData[ObjKey][items])

                if(typeof TempData[ObjKey][items] != 'object') {
                  
                  rows.push(<td className={(this.findValueType(TempData[ObjKey][items])=="exlusion")?"red":"green"}>{TempData[ObjKey][items]}</td>)
                }
                else{
                  ObjectsKeys2.forEach(items1 => {
                    if(typeof TempData[ObjKey][items][items1] == 'string' || typeof TempData[ObjKey][items][items1] == 'number' ) {
                      rows.push(<td className={(this.findValueType(TempData[ObjKey][items][items1] )=="exlusion")?"red":"green"}>{TempData[ObjKey][items][items1]}</td>)
                    }
                    else if(typeof TempData[ObjKey][items][items1] == 'array'){
                      rows.push(<td>{TempData[ObjKey][items][items1].join(',')}</td>)

                    }
                    else{
                     
                     if(TempData[ObjKey][items].length != undefined)  {
                       let ObjectsKeys3 = Object.keys(TempData[ObjKey][items][items1])
                       rows.push(<td>{ObjectsKeys3.join(',')}</td>)
                       ObjectsKeys3.forEach(items2 => {
                        if(typeof TempData[ObjKey][items][items1][items2] == 'string' || typeof TempData[ObjKey][items][items1][items2] == 'number' ) {
                          rows.push(<td>{TempData[ObjKey][items][items1][items2]}</td>)
                        }
                        else if(typeof TempData[ObjKey][items][items1][items2] == 'array'){
                          rows.push(<td>{TempData[ObjKey][items][items1][items2].join(',')}</td>)
    
                        }
                        else{
                          if(TempData[ObjKey][items][items1].length != undefined)  {


                            let ObjectsKeys4 = Object.keys(TempData[ObjKey][items][items1][items2])
                            rows.push(<td>{ObjectsKeys4.join(',')}</td>)
                            ObjectsKeys3.forEach(items3 => {
                             if(typeof TempData[ObjKey][items][items1][items2][items3] == 'string' || typeof TempData[ObjKey][items][items1][items2][items3] == 'number' ) {
                               rows.push(<td>{TempData[ObjKey][items][items1][items2][items3]}</td>)
                             }
                             else if(typeof TempData[ObjKey][items][items1][items2][items3] == 'array'){
                               rows.push(<td>{TempData[ObjKey][items][items1][items2][items3].join(',')}</td>)
         
                             }
                             else {
                               console.log(TempData[ObjKey][items][items1][items2][items3])
                             }

                            })





                          }
                     
                        }
    
                      })

                     }
                    }

                  })
                }
              
            })

           }
        })




        rows.push(<td>{TempDataString.join(', ')}</td>)
       
     
      }
      
    });

 
    return rows
   
  }
   render() {
     
  return (
    <div className="App">
      <header >
        <table>
        <tr>
            {
              this.state.header.map(title => <th>{title}</th> )
            }
       </tr>
        <tr>
        {this.renderRow()}
        
        
        </tr>
        
        </table>
      </header>
    </div>
  );
   }
}

export default App;
