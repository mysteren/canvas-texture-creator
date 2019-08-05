export default class CustomMath {
    
    /**
     * Случайное число в диапазоне
     * @param {number} min 
     * @param {number} max 
     */
    static randomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
}