import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import api from '../services/api'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanagesMap.css'
import mapIcon from '../utils/maiIcon'

interface Orphanages {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanages[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>

          <img src={mapMarkerImg} alt="" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>Distrito Federal</strong>
          <span>Brasília</span>
        </footer>

      </aside>

      <Map
        center={[-15.7744228, -48.0772739]}
        zoom={11}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanages => {
          return (
            <Marker
            key={orphanages.id}
            icon={mapIcon}
            position={[orphanages.latitude, orphanages.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="mapPopup">
              {orphanages.name}
                    <Link to={`/orphanages/${orphanages.id}`}>
                <FiArrowRight size={32} color="FFF" />
              </Link>
            </Popup>
          </Marker>
          )

        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanate">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap