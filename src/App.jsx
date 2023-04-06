import { GameArea, ResetBtn } from "./components";

function App() {
  return (
    <div className="w-11/12 h-full mx-auto py-8 px-4 bg-slate-500 flex flex-col items-center">
      <ResetBtn />
      <GameArea />
    </div>
  );
}

export default App;
