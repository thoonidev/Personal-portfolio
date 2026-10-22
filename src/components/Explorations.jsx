import { useState } from 'react';
import { ArrowUpRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { videos } from '../data';
import SectionHeading from './SectionHeading';
function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return <article className="video-card" data-reveal><div className="video-preview">{playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button onClick={() => setPlaying(true)} aria-label={`Reproducir ${video.title}`}><span className="video-code" aria-hidden="true">{video.symbol}</span><span className="play-button"><PlayIcon /></span><span className="video-label">Ver exploración</span></button>}</div><div className="video-copy"><span className="eyebrow">{video.category}</span><h3>{video.title}</h3><p>{video.description}</p></div></article>;
}
export default function Explorations() {
  return <section className="section explorations-section" id="exploraciones" aria-labelledby="explorations-title"><div className="container"><SectionHeading id="explorations-title" label="Aprender, construir, compartir" title="Exploraciones" description="Pruebas, interfaces y pequeños experimentos de programación que comparto en mi canal." /><div className="videos-grid">{videos.map(video => <VideoCard key={video.id} video={video} />)}</div><a className="text-button channel-link" href="https://youtube.com/@thoonidev" target="_blank" rel="noreferrer">Más en mi canal de YouTube <ArrowUpRightIcon /></a></div></section>;
}
