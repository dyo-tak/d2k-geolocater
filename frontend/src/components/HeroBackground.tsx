import './HeroBackground.css'

const HeroBackground = () => {
  return (
    <div className="relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-black transition-bg">
        <div className="absolute inset-0 overflow-hidden">
            <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
    </div>
  );
};

export default HeroBackground;
