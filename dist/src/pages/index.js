import { useEffect, useState } from 'react';
export default function Home() {
    const [text, setText] = useState('not found');
    useEffect(()=>{
        fetch('http://localhost:3000/api/hello').then((t)=>{
            t.text().then((tt)=>setText(tt));
        });
    }, []);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, text);
}

//# sourceMappingURL=index.js.map