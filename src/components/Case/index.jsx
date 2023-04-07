import './index.css';
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from 'react';


function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);
    return <button ref={tilt} {...rest} />;
}

const Case = ({ onClick, value, disabled }) => {
    const options = {
        scale: 1.2,
        speed: 1000,
        max: 30
    };


    return (
        <>
            <Tilt onClick={onClick} options={options} disabled={disabled} value={value} className={value === "X" ? "Case activePHP" : value === "O" ? "Case activeJS" : "Case"} />
        </>
    );
}
// const ListMap = () => {
//     const data = [1, 2, 3, 4];
//     return (
//         <>
//             {data.map(elt => <p key={elt}>{elt}</p>)}
//         </>
//     );
// }
// export default ListMap;

export default Case;