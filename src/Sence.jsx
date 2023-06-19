import { Model } from './Model'
import { useRef } from 'react'
import { Stage, PositionalAudio } from '@react-three/drei'


function Sence({ ready, isLoop, onLoad }) {
    const ref = useRef()
    const music_url = "/music.mp3"
    return(
        <Stage controls={ref} preset="rembrandt" intensity={1} environment="city" hdrImage="./potsdamer_platz_1k.hdr" >
            <Model onLoad={onLoad} isLoop={isLoop} />
            {ready && <PositionalAudio autoplay loop url={music_url} distance={100} />}
            <PositionalAudio autoplay loop url={music_url} distance={0} />
        </Stage>
    )
}

export default Sence;
