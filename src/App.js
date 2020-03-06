import './App.css';
import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { getAllInterviewEvents } from './Api/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faList } from '@fortawesome/free-solid-svg-icons'
const offices = require('./officeList.json')


const generateStats = (events) => {
  const stats = {}
  offices.forEach((office) => stats[office.office] = {})
  events.forEach((evt) => {
    stats[evt.nearestOffice] = stats[evt.nearestOffice] || {}
    stats[evt.nearestOffice][evt.type] = stats[evt.nearestOffice][evt.type] || 0
    stats[evt.nearestOffice][evt.type]++
  })
  return stats
}

function App() {
  const startPosition = [51.505, -0.09]

  const [events, setEvents] = useState(null)
  const [stats, setStats] = useState(generateStats([]))
  const [error, setError] = useState(null)
  const [refresh, doRefresh] = useState(false)

  useEffect(() => {
    getAllInterviewEvents()
      .then(events => {
        setStats(generateStats(events))
        setEvents(events)
        setError(null)
        doRefresh(false)
      })
      .catch(err => setError(err))
  }, [refresh])

  if (error) {
    return (
      <div className="message">
        <div>Oops, that didn't work; try reloading the page</div>
      </div>
    )
  }

  if (!events) {
    return (
      <div className="message">
        <div>Loading</div>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Interview Reports
        </p>
      </header>
      <div className="title"><FontAwesomeIcon icon={faMap} /><span>Map View</span></div>
      <div>
        <Map center={startPosition} zoom={6} style={{ height: "50vh" }} >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map((mk) => {
            if (!mk.lonlat) return null
            const position = [mk.lonlat[1], mk.lonlat[0]]
            return (
              <Marker key={mk.userid} position={position}>
                <Popup>{mk.type}</Popup>
              </Marker>
            )
          })}

        </Map>
      </div>
      <div className="title"><FontAwesomeIcon icon={faList} /><span>Stats By Monaco Office</span></div>
      <div className="stats">
        <div className="statsTable">
          {Object.keys(stats).map((office) => {
            return (
              <div key={`OK${office}`} className="statsOffice">
                <div className="office">{office}</div>
                {Object.keys(stats[office]).length === 0 &&
                  <div className="nodata">No data</div>
                }
                <ul>
                  {Object.keys(stats[office]).map((key) => {
                    return (
                      <li key={`SK${office}${key}`}>
                        <span>{key}: </span><b>{stats[office][key]}</b> submissions
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
