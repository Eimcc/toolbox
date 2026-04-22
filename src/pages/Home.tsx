import { Desktop } from '../components/Desktop';

export const Home = () => {
  const handleToolOpen = (tool: string) => {
    console.log(`Tool opened: ${tool}`);
  };

  return (
    <div className="w-full h-screen">
      <Desktop onToolOpen={handleToolOpen} />
    </div>
  );
};