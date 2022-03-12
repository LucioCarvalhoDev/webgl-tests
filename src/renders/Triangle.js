import createProgram from "../helper/createProgram.js";
import createShader from "../helper/createShader.js";

const vertexText = `
attribute vec4 vPos;

void main()
{
    gl_Position = vPos;
}
`;

const fragmentText = `
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

const data =
    [// x, y
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5,

    ];

/**
 * 
 * @param {WebGLRenderingContext} gl 
 */
export function Triangle(gl) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexText);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentText);

    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttribLocation = gl.getAttribLocation(program, 'vPos');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

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

    gl.drawArrays(gl.TRIANGLES, 0, data.length / size);
}

