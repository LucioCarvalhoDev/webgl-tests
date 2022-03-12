import CanvasController from "dots-galaxy";
import createProgram from "../helper/createProgram.js";
import createShader from "../helper/createShader.js";
const fakeCanvas = document.createElement('canvas');
const canvas = new CanvasController(fakeCanvas);
canvas.canvas.width = 500;
canvas.canvas.height = 500;
canvas.dots = [];
canvas.populate(10);

function normalizeCoords(width, height, _x, _y) {
    if (_x < width / 2) {
        _x = (_x / width / 2) - 1;
    } else if (_x > width / 2) {
        _x = _x / width;
    } else {
        _x = 0;
    }

    _y = height - _y;
    if (_y < height / 2) {
        _y = _y / height - 1;
    } else if (_y > height / 2) {
        _y = _y / height;
    } else {
        _y = 0;
    }

    return [_x, _y];
}

console.log(canvas.dots.map(dot => [dot.x, dot.y]));
const vertexText = `
attribute vec4 vPos;
attribute float vSize;

void main()
{
    gl_Position = vPos;
    gl_PointSize = 10.0;
}
`;

const fragmentText = `
precision mediump float;

void main()
{
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    vec2 coord = gl_PointCoord - vec2(0.5);  //from [0,1] to [-0.5,0.5]
    if(length(coord) > 0.5)                  //outside of circle radius?
        discard;
    gl_FragColor = color;
}
`;

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
export function Point(gl) {
    const data = canvas.dots.reduce((acc, cur) => acc.concat(...normalizeCoords(500, 500, cur.x, cur.y)), []);
    gl.clearColor(0.1, 0.1, .5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexText);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentText);

    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttribLocation = gl.getAttribLocation(program, 'vPos');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttribLocation);
    const size = 2;
    gl.vertexAttribPointer(
        positionAttribLocation,
        size,
        gl.FLOAT,
        false,
        0,
        0
    );

    setInterval(() => {
        canvas.updateDots();
        // console.log(canvas.dots[0]);
        gl.clearColor(0.1, 0.1, .5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, data.length / size);
    }, 100);
}

