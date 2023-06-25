import { useProgress, Html } from '@react-three/drei';

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  //console.log(Math.round(progress));

  return (
    <>
      <Html center>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-lg font-semibold mb-4">{`${Math.round(progress)}%`}</div>
          <div className="w-64 h-4 bg-gray-200 rounded-full overflow-x-hidden">
            <div
              className="h-4 bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </Html>
    </>
  );
}

export default Loader;
