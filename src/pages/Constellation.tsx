import ParticleCanvas from '../components/ParticleCanvas';
import './Constellation.css';

export default function Constellation() {
  return (
    <div className="constellation-wrapper">
      <ParticleCanvas />
      <div className="constellation-header">
        <p className="constellation-tag">
          CHAPTER 03
        </p>
        <h1 className="constellation-title">
          The Constellation
        </h1>
        <p className="constellation-subtitle">
          Every moment. Every event. Every star.
        </p>
        <div className="constellation-divider">
          <span className="divider-line" />
          <span className="divider-star">✦</span>
          <span className="divider-line" />
        </div>
      </div>

      <div className="constellation-empty">
        <p className="empty-text">
          Events coming soon...
        </p>
      </div>
    </div>
  );
}
