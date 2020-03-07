/*
* Возвращает маску поля ввода
* */
export function getDateMask(): Array<string | RegExp> {
    return [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/];
}