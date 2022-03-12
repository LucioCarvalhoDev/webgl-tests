const vertexText = `
attribute vec3 vPos;

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

