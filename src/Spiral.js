import {Fragment, useEffect, useRef, useState} from 'react';

const Spiral = () => {
  const canvas = useRef(null);
  const canvasStyle = {
    position: 'relative',
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    border: '1px solid black'
  }
  let [allNodes, setAllNodes] = useState({});

  useEffect(() => {
    for (let key in allNodes) {
        canvas.current.appendChild(createNode(allNodes[key].x, allNodes[key].y));
    }
  }, [allNodes]);

  function createNode(w, h) {
    const newNode = document.createElement('span');
    const newNodeStyle = {
        position: 'absolute',
        width: '1px',
        height: '1px',
        left: w+"px",
        top: h+"px",
        border: '1px solid black'
    };
    Object.assign(newNode.style, newNodeStyle);
    return newNode;
  }

  function isPrime(value) {
    if (value===0 || value===1) {
        return false;
    }
    if (value === 2) {
        return true;
    }
    for (let i = 2; i<=Math.ceil(value/2);i++) {
        if (value%i===0) {
            return false;
        }
    }
    return true;
  }

  function handleClick() {
    Object.assign(canvas.current.style, canvasStyle);

    let operations = {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        r: 1,
        s: 0,
        c: 0
    };
    let result = {};
    for (let i =0;i<100000;i++) {
        let val = incrementStep(operations);
        if (isPrime(i)) {
            result[i] = val;
        }
    }
    setAllNodes(result);
  }

  function incrementStep(o) {
    let reset = false
    if (o.c === o.s) {
        o.c = 0;
        reset = true;
        if (o.r === 4) {
            o.r=1
        } else {
            o.r+=1;
        }
        if (o.r%2===1) {
            o.s+=1;
        }  
    }

    switch(o.r) {
        case 1:
            o.x+=2;
            break;
        case 2:
            o.y-=2;
            break;
        case 3:
            o.x-=2;
            break;
        case 4:
            o.y+=2;
            break;
        default:
            break;
    }
    if (!reset) {
        o.c+=1;
    }
    return {...o};
  }

  return (
    <Fragment>
      <input
        type="button"
        value="draw the canvas"
        onClick={handleClick}
      />
      <div ref={canvas}></div>
    </Fragment>
  );
}

export default Spiral;