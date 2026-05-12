import React, { useEffect, useState } from "react";
import { data as localData } from "../restApi.json";
import axios from 'axios'
const Team = () => {
  const [members, setMembers] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
        const res = await axios.get(`${base}/api/v1/staff`)
        setMembers(res.data.members)
      } catch (e) {
        setMembers(localData[0].team.map(t => ({ _id: t.id, image: t.image, name: t.name, designation: t.designation })))
      } finally {
        setLoaded(true)
      }
    }
    load()
  }, [])

  return (
    <section className="team" id="team">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">OUR TEAM</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            fugit dicta, ipsum impedit quam laboriosam quas doloremque quia
            perferendis laborum.
          </p>
        </div>
        <div className="team_container">
          {(loaded ? members : []).map((element) => {
            return (
              <div className="card" key={element._id || element.id}>
                <img src={element.image} alt={element.name} />
                <h3>{element.name}</h3>
                <p>{element.designation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
