import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const [length, setLength] = useState(8);
    const [num, setNum] = useState(false);
    const [char, setChar] = useState(false);
    const [upalpha, setUpalpha] = useState(false);
    const [loalpha, setLoalpha] = useState(false);
    const [password, setPassword] = useState("");
    //useRef hook
    const passwordRef = useRef(null)
    const copyPasswordClip = useCallback(()=>{window.navigator.clipboard.writeText(password)},[password])


    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "";

        if (num) str += "0123456789";
        if (char) str += "!@#$%^&*()_+={}[]-";
        if (loalpha) str += "abcdefghijklmnopqrstuvwxyz";
        if (upalpha) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 1; i <= length; i++) {
            let charr = Math.floor(Math.random() * str.length);
            pass += str.charAt(charr);
        }

        setPassword(pass);
    }, [length, num, char, loalpha, upalpha]);

    useEffect(() => passwordGenerator(), [length, num, char, loalpha, upalpha, passwordGenerator])
    return (
        <>
            <div className="mainGen">
                <div className="mainGenTop">
                    <input
                        type="text"
                        value={password}
                        placeholder='password'
                        readOnly
                        ref={passwordRef}
                    />
                </div>
                <div className="customizePass">
                    <h2> Customize your password</h2>
                </div>
                <div className="bottomPanel">
                    <div className="bottomPanel-Left">
                        <h3>Password Length {length}</h3>
                        <div className="rangePassword">
                            <div className="rangePassword-right">
                                <input
                                    type="range"
                                    min={6}
                                    max={50}
                                    value={length}
                                    onChange={(e) => { setLength(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bottomPanel-right">
                        <input
                            type="checkbox"
                            defaultChecked={num}
                            onChange={() => setNum((prev) => !prev)}
                        />
                        <b>Number</b><br />
                        <input
                            type="checkbox"
                            defaultChecked={char}
                            onChange={() => setChar((prev) => !prev)}
                        />
                        <b>Character</b><br />
                        <input
                            type="checkbox"
                            defaultChecked={loalpha}
                            onChange={() => setLoalpha((prev) => !prev)}
                        />
                        <b>Lowercase</b><br />
                        <input
                            type="checkbox"
                            defaultChecked={upalpha}
                            onChange={() => setUpalpha((prev) => !prev)}
                        />
                        <b>Uppercase</b>
                    </div>
                </div>
                <div className="footerPass"><button onClick={copyPasswordClip}>Copy</button></div>
            </div>
        </>
    );
}
