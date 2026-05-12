import React, { useEffect, useState } from 'react'
import {data as localData} from '../restApi.json'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Menu = () => {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
        const res = await axios.get(`${base}/api/v1/menu`)
        setItems(res.data.items)
      } catch (e) {
        setItems(localData[0].dishes.map(d => ({ _id: d.id, image: d.image, title: d.title, category: d.category })))
      } finally {
        setLoaded(true)
      }
    }
    load()
  }, [])

  return (
    <>
      <section className='menu' id='menu'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">POPULAR DISHES</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iusto dolorem! Voluptatibus ipsum nam mollitia architecto. Soluta pariatur eius et recusandae veritatis. Quasi, et molestias!</p>
            </div>
            <div className="dishes_container">
                {
                    (loaded ? items : []).map(element => (
                        <div className="card" key={element._id || element.id} onClick={() => navigate('/reservation')} style={{ cursor: 'pointer' }}>
                                <img src={element.image} alt={element.title} />
                                <h3>{element.title}</h3>
                                <button onClick={(e) => { e.stopPropagation(); navigate('/reservation') }}>{element.category}</button>
                        </div>
                    ))
                }   
            </div>
        </div>
      </section>
    </>
  )
}

export default Menu
