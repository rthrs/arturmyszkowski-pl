import { render } from "@react-three/offscreen";
import WireframeScene from "./WireframeScene";

render(<WireframeScene position={[-2, 0, 0]} scale={1.2} divisions={60} speed={0.2} />);
