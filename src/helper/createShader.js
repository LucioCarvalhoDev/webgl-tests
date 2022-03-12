/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {*} type 
 * @param {*} source 
 */
export default function shaderGenerator(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}