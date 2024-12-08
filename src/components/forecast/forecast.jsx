import './forecast.css'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'

const WEEK_DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
export function Forecast({data})
{
    const dayInAWeek= new Date().getDay()
    const forecastedDays=WEEK_DAYS.slice(dayInAWeek+1,WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInAWeek+1))
    return (
    <>
       <label className='title'>Daily</label>   
       <Accordion allowZeroExpanded>
          {data.list.splice(0, 7).map(function(item,idx){
             return <AccordionItem key={idx}>
                 <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className='daily-item'>
                           <img src={`./icons/${item.weather[0].icon}.png`} alt="weather" className='icon-small' />
                           <label className='day'>{forecastedDays[idx]}</label>
                           <label className='description'>{item.weather[0].description}</label>
                           <label className='min-max'>{Math.round(item.main.temp_min)}°C/{Math.round(item.main.temp_max)}°C</label>
                        </div>
                    </AccordionItemButton>
                 </AccordionItemHeading>
                 <AccordionItemPanel>
                    <div className='daily-details-grid'>
                        <div className='daily-details-grid-item'>
                           <label >Pressure</label>
                           <label >{item.main.pressure}hPa</label>
                        </div>

                        <div className='daily-details-grid-item'>
                           <label >Humidity</label>
                           <label >{item.main.humidity}%</label>
                        </div>

                        <div className='daily-details-grid-item'>
                           <label >Clouds</label>
                           <label >{item.clouds.all}%</label>
                        </div>

                        <div className='daily-details-grid-item'>
                           <label >Wind Speed:</label>
                           <label >{item.wind.speed}m/s</label>
                        </div>

                        <div className='daily-details-grid-item'>
                           <label >Sea Level:</label>
                           <label >{item.main.sea_level}m</label>
                        </div>

                        <div className='daily-details-grid-item'>
                           <label >Feels like:</label>
                           <label >{Math.round(item.main.feels_like)}°C</label>
                        </div>
                    </div>
                 </AccordionItemPanel>
             </AccordionItem>
              
          })}
         
       </Accordion>
    </>
    )
}