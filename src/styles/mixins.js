

export function animateOnce(name, time) {
    return `
        animation-name: ${name};
        animation-duration: ${time};
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    `
}
  
export function animateLoop(name, time, offset = 0) {
    return `
        animation-name: ${name};
        animation-duration: ${time};
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        animation-timing-function: ease;
    `;
}
