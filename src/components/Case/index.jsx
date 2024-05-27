import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './index.css';
import CodeLanguageImage from './CodeLanguageImage';


function Tilt(props) {
    const { options, mobileOptions, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const appliedOptions = isMobile ? mobileOptions : options;

        VanillaTilt.init(tilt.current, appliedOptions);
    }, [options, mobileOptions]);

    return <button ref={tilt} {...rest} />;
}

const Case = ({ onClick, value, disabled }) => {
    const code = value === "X" ? "PHP" : "JS";
    const options = {
        scale: 1.2,
        speed: 1000,
        max: 30
    };
    const mobileOptions = {
        scale: 1,
        speed: 1000,
        max: 30
    };

    return (
        <div className='tilt-container'>
            {/* <Tilt onClick={onClick} options={options} disabled={disabled} value={value} className={value === "X" ? "Case activePHP" : value === "O" ? "Case activeJS" : "Case"} /> */}
            <Tilt onClick={onClick} options={options} disabled={disabled} className={"Case"} mobileOptions={mobileOptions}>
                {value && <CodeLanguageImage code={code} />}
            </Tilt>
        </div>
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