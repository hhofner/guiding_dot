import { useRef, useEffect, useState} from "react";
import "./cell.css";

interface BoxCoordinates {
    top: number | null;
    bottom: number | null;
}

type DotYOffset = number | null;

const Cell = ({num, lastPosition, onInFrame}: {
    num:number;
    lastPosition:number | null;
    onInFrame: (pos: number | null) => void; // When the child is in Frame, it sends its dot position to the parent so it can distribute it (later)
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLImageElement>(null);
    const [isInFrame, setIsInFrame] = useState<boolean | null>(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                containerRef.current &&
                containerRef.current.getBoundingClientRect().y < 300 &&
                containerRef.current.getBoundingClientRect().bottom > 300
            ) {
                setIsInFrame(true);
                const dot = dotRef.current && dotRef.current.getBoundingClientRect().y
                onInFrame(dot); // Then update it here (send to parent)
            } else {setIsInFrame(false)}

        //    Why does the isInFrame variable not update here?
        })

        return (window.removeEventListener("scroll", () => {console.log("removed")}))
    }, [])

    useEffect(() => {
        if (!isInFrame) {
            console.log(`${num} is not inFrame`)
            // Has gone out of frame and it was before in frame, so set the dot position as latest
            onInFrame(dotRef.current && dotRef.current.getBoundingClientRect().y);
        }
    }, [isInFrame]);

    return (
        <div className="container" style={{height: `250px`}} ref={containerRef}>
            <div className={"sidebar"} style={{display: "flex", flexDirection: "column"}}>
                <p>Section {num}</p>
                <div style={{
                    fontSize: "5rem",
                    color: "turquoise",
                    display: "inline-block",
                    margin: "auto",
                }}
                     ref={dotRef}
                ><img ref={dotRef} src={"https://upload.wikimedia.org/wikipedia/commons/c/c0/Location_dot_black.svg"} width={30} height={30}
                      style={{visibility: isInFrame ? "visible" : "hidden",
                          transition: "transform 1s ease-out",
                          transform: isInFrame ?
                              "translateY(0)" : ((lastPosition && dotRef.current) ?
                                  (lastPosition > dotRef.current.getBoundingClientRect().y ?
                                      `translateY(${lastPosition - dotRef.current.getBoundingClientRect().y}px)` :
                                      `translateY(-${dotRef.current.getBoundingClientRect().y - lastPosition}px)`) : "translateY(0px)")}}
                /></div>

            </div>
            <div className="main">
                Main content
            </div>
        </div>
    )
}

export default Cell;