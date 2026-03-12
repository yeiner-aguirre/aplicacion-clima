import "./DynamicBackground.css";

const cloudStyles = [
  { top: "10%", left: "-12%", size: "310px", duration: "42s", delay: "-8s" },
  { top: "22%", left: "-18%", size: "260px", duration: "36s", delay: "-18s" },
  { top: "52%", left: "-15%", size: "340px", duration: "48s", delay: "-24s" },
  { top: "66%", left: "-20%", size: "280px", duration: "40s", delay: "-14s" },
];

const rainStyles = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 4.1) % 100}%`,
  duration: `${0.9 + (index % 5) * 0.12}s`,
  delay: `${(index % 6) * -0.5}s`,
  opacity: `${0.15 + (index % 4) * 0.08}`,
}));

const snowStyles = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 4.3) % 100}%`,
  size: `${6 + (index % 4) * 4}px`,
  duration: `${7 + (index % 6)}s`,
  delay: `${(index % 6) * -1.2}s`,
}));

const starStyles = Array.from({ length: 18 }, (_, index) => ({
  top: `${8 + (index * 5) % 58}%`,
  left: `${4 + (index * 6) % 92}%`,
  size: `${2 + (index % 3)}px`,
  delay: `${index * 0.35}s`,
}));

const DynamicBackground = ({ scene }) => (
  <div className={`dynamic-background dynamic-background--${scene}`} aria-hidden="true">
    <div className="dynamic-background__gradient" />

    {scene === "clear-day" ? <div className="dynamic-background__sun" /> : null}
    {scene === "clear-night" || scene === "clouds-night" ? (
      <>
        <div className="dynamic-background__moon" />
        <div className="dynamic-background__stars">
          {starStyles.map((style, index) => (
            <span
              className="dynamic-background__star"
              key={index}
              style={{
                "--star-delay": style.delay,
                "--star-left": style.left,
                "--star-size": style.size,
                "--star-top": style.top,
              }}
            />
          ))}
        </div>
      </>
    ) : null}

    {scene !== "clear-day" && scene !== "clear-night" ? (
      <div className="dynamic-background__clouds">
        {cloudStyles.map((style, index) => (
          <span
            className="dynamic-background__cloud"
            key={index}
            style={{
              "--cloud-delay": style.delay,
              "--cloud-duration": style.duration,
              "--cloud-left": style.left,
              "--cloud-size": style.size,
              "--cloud-top": style.top,
            }}
          />
        ))}
      </div>
    ) : null}

    {scene === "rain" || scene === "storm" ? (
      <div className="dynamic-background__rain">
        {rainStyles.map((style, index) => (
          <span
            className="dynamic-background__drop"
            key={index}
            style={{
              "--drop-delay": style.delay,
              "--drop-duration": style.duration,
              "--drop-left": style.left,
              "--drop-opacity": style.opacity,
            }}
          />
        ))}
      </div>
    ) : null}

    {scene === "snow" ? (
      <div className="dynamic-background__snow">
        {snowStyles.map((style, index) => (
          <span
            className="dynamic-background__flake"
            key={index}
            style={{
              "--flake-delay": style.delay,
              "--flake-duration": style.duration,
              "--flake-left": style.left,
              "--flake-size": style.size,
            }}
          />
        ))}
      </div>
    ) : null}

    {scene === "mist" ? <div className="dynamic-background__fog" /> : null}
    {scene === "storm" ? <div className="dynamic-background__flash" /> : null}
  </div>
);

export default DynamicBackground;
