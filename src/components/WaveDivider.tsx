const WaveDivider = () => {
  return (
    <div className="w-full relative overflow-visible my-8">
      <svg
        className="w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', height: '100px' }}
      >
        {/* Vague blanc cassé avec bordure noire brutalist */}
        <path
          d="M0,50 Q360,20 720,50 T1440,50"
          fill="none"
          stroke="#fdefd5"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Contour noir pour le style brutalist */}
        <path
          d="M0,50 Q360,20 720,50 T1440,50"
          fill="none"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transform: 'translateY(2px)',
            opacity: 0.3
          }}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
