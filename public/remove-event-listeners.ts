export function removeEventListeners(element: HTMLElement) {
    const newElement = element.cloneNode(true);
    element.parentNode!.replaceChild(newElement, element);
}