import { useProgress,Html } from '@react-three/drei'
import { Progress ,Grid,Text} from '@nextui-org/react';


function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    console.log(Math.round(progress))
    return (
      <>
       <Html center>
          <Text style={{ width: '400px' ,textAlign:'center'}} h2>{Math.round(progress)}%</Text>
              <Progress
                style={{ width: '400px' }}
                value={Math.round(progress)}
                color="warning"
              />
              
       </Html>
      </>
    )
  }

export default Loader;