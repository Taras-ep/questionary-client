export function placeholderInputAnimation(elementRef: React.RefObject<HTMLInputElement>, text: string[], speed?: number) {

    if (!elementRef.current) return console.error('element is not available') 

    let symbolIndex = 0;
    let arrElementIndex = 0;

    let intervalID = setInterval(() => {
        if (elementRef.current) {
            if (symbolIndex < text[arrElementIndex].length) {
                elementRef.current.placeholder = text[arrElementIndex].slice(0, symbolIndex + 1)
                symbolIndex++
            } else if (arrElementIndex < text.length - 1) {
                arrElementIndex++
                symbolIndex = 0
            }
            else {
                arrElementIndex = 0
                symbolIndex = 0
            }
        }
    }, speed === undefined ? 200 /*set default value if it's undefined*/ : speed)

    //returns clearInterval to unmount
    return () => clearInterval(intervalID)
}