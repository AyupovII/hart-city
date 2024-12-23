export default function mask(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const pos = input.selectionStart;
    if (pos !== null && pos !== undefined && pos < 3) event.preventDefault();
    const matrix = "+7 (___) ___-__-__";
    let i = 0;
    const def = matrix.replace(/\D/g, "");
    const val = input.value.replace(/\D/g, "");
    let new_value = matrix.replace(/[_\d]/g, (a) => {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
    });
    if (!new_value.startsWith("+7")) new_value = "+7" + new_value.slice(2);
    i = new_value.indexOf("_");
    if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
    }
    const reg = matrix.substr(0, input.value.length).replace(/_+/g, (a) => {
        return "\\d{1," + a.length + "}"
    }).replace(/[+()]/g, "\\$&");
    const regex = new RegExp("^" + reg + "$");
    if (!regex.test(input.value) || input.value.length < 5 || /^\d$/.test(event.target.value)) input.value = new_value
    if (event.type == "blur" && input.value.length < 5) input.value = ""
}