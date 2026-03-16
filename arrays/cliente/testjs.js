Object.prototype.has_key = function (key) {
    return Object.keys(this).includes(key);
};
Object.prototype.new = function (key, v = undefined) {
    this[key] = typeof v === "undefined" ? this[key] || {} : v;
    return this[key];
};
Object.prototype.add = function (key) {
    this[key] = undefined;
    return this[key];
};
Object.prototype.push = function (...args) {
    const keys = Object.keys(this);
    let index = 0;
    for (let item of keys) {
        index += !isNaN(item) ? 1 : 0;
    }
    args.forEach((item, i) => {
        this[index + i] = item;
        index++;
    });
    return this;
};
/*Object.prototype.push = function (v = undefined, k = undefined) {
    if (typeof k === "string") this[k] = v;
    const keys = Object.keys(this);
    let index = 0;
    for (let item of keys) {
        index += !isNaN(item) ? 1 : 0;
    }
    this[index] = v;
    return this;
};*/
Object.prototype.addR = function (...args) {
    const v = args.pop();
    let aux = this;
    args.forEach((item, i) => {
        aux[item] = i + 1 >= args.length ? v : aux[item] || {};
        aux = aux[item];
    });
    return aux;
};
Object.prototype.get = function (...args) {
    let aux = this;
    args.forEach((item, i) => {
        aux = aux[item];
    });
    return aux;
};
Object.prototype.pop = function () {
    const keys = Object.keys(this);
    let index = 0;
    keys.forEach(k => {
        if (isNaN(k)) return;
        index++;
    });
    const v = this[index - 1];
    delete this[index - 1];
    return v;
};
Object.prototype.del = function (index) {
    const v = this[index];
    if (typeof v === "undefined") return;
    delete this[index];
    return v;
};
Object.prototype.popR = function (...args) {
    if (!Array.isArray(args)) return;
    if (args.length === 0) return;
    const lastk = args[args.length - 1];
    args.pop();
    let aux = this[args[0]];
    if (typeof aux === "undefined") return;
    args.splice(0, 1);
    for (let item of args) {
        aux = aux[item];
    }
    const v = aux[index];
    if (typeof v === "undefined") return;
    delete aux[index];
    return v;
};
Object.prototype.length = function () {
    return Object.values(this).length;
};
function array(...args) {
    const new_obj = {};
    let buffer = Object.create(new_obj);
    let index = 0;
    args.forEach((item, i) => {
        if (Array.isArray(item)) {
            buffer[index] = item;
            index++;
        } else if (typeof item === "object") {
            const keys = Object.keys(item);
            const red_key = keys[0];
            if (red_key.includes("no_array_")) {
                buffer[index] = item[red_key];
                delete item[red_key];
                index++;
            } else {
                if (keys.length > 1) {
                    const aux = {};
                    keys.forEach((k, i) => {
                        aux[k] = item[k];
                        aux[i] = item[k];
                    });
                    buffer[
                        `no_array_${Math.ceil(Math.random() * Date.now())
                            .toString(16)
                            .substr(0, 5)}`
                    ] = aux;
                    index++;
                } else if (keys.length === 1) {
                    const key = keys[0];
                    buffer[key] = item[key];
                    buffer[index] = item[key];
                    index++;
                }
            }
        } else if (typeof item === "string" || typeof item === "number") {
            buffer[index] = item;
            index++;
        }
    });
    return buffer;
}
function array_chunk(a, length, preserve_keys = false) {
    if (typeof a !== "object") return;
    length = Math.max(0, Math.min(length, a.length()));
    const total = a.length();
    const buffer = array();
    let count = 0;
    for (let p = 0; p < total; p += length) {
        const aux = Object.values(a).slice(p, p + length);
        const array_aux = array();
        aux.forEach(item => {
            if (!preserve_keys) array_push(array_aux, item);
            else array_aux[count] = item;
            count++;
        });
        array_push(buffer, array_aux);
    }
    return buffer;
}
function array_column(a, column_key, index_key = 0) {
    if (typeof a !== "object") return;
    const buffer = array();
    let count = 0;
    Object.values(a).forEach(item => {
        if (typeof item !== "object") return;
        Object.keys(item).forEach((k, index) => {
            if (k === column_key.trim()) {
                if (typeof index_key === "string") {
                    buffer[item[index_key]] = item[column_key];
                } else if (typeof index_key === "number") {
                    buffer[count + index_key] = item[column_key];
                    index_key++;
                }
            }
        });
    });
    return buffer;
}
function array_combine(keys, values) {
    if (keys.length() !== values.length()) return console.error("Keys and values must have the same number of elements!");
    const buffer = array();
    Object.values(keys).forEach((k, i) => {
        buffer[k] = values[i];
    });
    return buffer;
}
function array_key_exists(k, array) {
    return array[k];
}
function array_keys(array) {
    if (typeof array !== "object") return;
    return Object.keys(array);
}
function array_is_list(array) {
    if (typeof array !== "object") return;
    if (Object.values(array).length === 0) return true;
    if (typeof array[0] === "undefined") return false;
    const keys = Object.keys(array);
    let index = 0;
    for (let k = 0; k < keys.length; k++) {
        const indexof = keys.indexOf(k);
        if (indexof > k + 1) return false;
        if (k + 1 !== keys.indexOf(k + 1)) return false;
    }
    return true;
}
function array_pop(a) {
    return a.pop();
}
function array_push(a, ...args) {
    args.forEach(item => {
        a.push(item);
    });
    return a;
}
/*function array_push(array, v) {
    if (Array.isArray(array)) {
        array.push(v);
        return;
    }
    if (typeof array !== "object") return;
    array.push(v);
    return array;
}*/
function array_unique(array) {
    if (typeof array !== "object") return;
    const aux = {};
    Object.keys(array).forEach(k => {
        const v = array[k];
        if (!in_array(isNaN(v) ? v : parseInt(v), aux, true)) {
            aux[k] = v;
        }
    });
    return aux;
}
function array_values(array) {
    if (typeof array !== "object") return;
    return Object.values(array);
}

function count(array) {
    if (typeof array !== "object") return;
    return array.length();
}

function in_array(needle, array, strict = false) {
    if (typeof array !== "object") return;
    const values = Object.values(array);
    for (let v of values) {
        const resp = strict ? v === needle : v.toString().includes(needle);
        if (resp) return true;
    }
    return false;
}

function sizeof(array) {
    if (typeof array !== "object") return;
    return array.length();
}

function var_dump(array, tab = "\t") {
    if (typeof array === "string" || typeof array === "number") {
        return `[${typeof array}] => ${array}`;
    }
    const is_array = Array.isArray(array);
    const items = Object.keys(array)
        .map(k => {
            const item_is_array = typeof array[k] === "object" || Array.isArray(array[k]);
            const v = item_is_array ? `${var_dump(array[k], `\t${tab}`)}` : array[k].toString();
            return `${tab}[${k}] => ${v}`;
        })
        .join(",\n");
    return `${is_array ? "[" : "{"}\n${items}\n${tab.replace(`\t`, "")}${is_array ? `]` : `}`}`;
}

function unset(index, array) {
    if (typeof array !== "object") return;
    return array.unset(index);
}
function sort(a, order = "ASC") {
    if (typeof a !== "object") return false;
    return Object.values(a).sort((a, b) => {
        if (order === "ASC") return a > b ? 1 : b > a ? -1 : 0;
        else if (order === "DESC") return a > b ? -1 : b > a ? 1 : 0;
    });
}
function arsort(a, keep_k = true) {
    if (typeof a !== "object") return false;
    const aux = [];
    Object.keys(a).forEach(k => {
        if (keep_k) aux.push({ v: a[k], k });
        else aux.push(a[k]);
    });
    const s = aux.sort((a, b) => {
        if (keep_k) return a.v > b.v ? -1 : b.v > a.v ? 1 : 0;
        else return a > b ? -1 : b > a ? 1 : 0;
    });
    const buffer = {};
    s.forEach((item, i) => {
        buffer[i] = item;
    });
    return buffer;
}
function asort(a, keep_k = true) {
    if (typeof a !== "object") return false;
    const aux = [];
    Object.keys(a).forEach(k => {
        if (keep_k) aux.push({ v: a[k], k });
        else aux.push(a[k]);
    });
    const s = aux.sort((a, b) => {
        if (keep_k) return a.v > b.v ? 1 : b.v > a.v ? -1 : 0;
        else return a > b ? 1 : b > a ? -1 : 0;
    });
    const buffer = {};
    s.forEach((item, i) => {
        buffer[i] = item;
    });
    return buffer;
}

function krsort(a) {
    if (typeof a !== "object") return false;
    const aux = [];
    Object.keys(a).forEach(k => {
        aux.push({ v: a[k], k });
    });
    const s = aux.sort((a, b) => {
        return a.k > b.k ? -1 : b.k > a.k ? 1 : 0;
    });
    const buffer = {};
    s.forEach((item, i) => {
        buffer[i] = item;
    });
    return buffer;
}
function ksort(a) {
    if (typeof a !== "object") return false;
    const aux = [];
    Object.keys(a).forEach(k => {
        aux.push({ v: a[k], k });
    });
    const s = aux.sort((a, b) => {
        return a.k > b.k ? 1 : b.k > a.k ? -1 : 0;
    });
    const buffer = {};
    s.forEach((item, i) => {
        buffer[i] = item;
    });
    return buffer;
}

function usort(a, cb) {
    if (typeof a !== "object") return false;
    const aux = [];
    Object.keys(a).forEach(k => {
        aux.push({ v: a[k], k });
    });
    const s = aux.sort((a, b) => {
        if (typeof cb === "function") return cb(a, b);
    });
    if (s.length === 0) return false;
    const buffer = {};
    s.forEach((item, i) => {
        buffer[i] = item;
    });
    return buffer;
}

/////////
const array1 = array({ www: [12, 435345, 32542342] }, "dfdss", 12, 343, "aa", 12, { aaa: array(234, [1, 2], 65, 32) }, "12", "aa", 324, [1, 2, 3, 4], 343, "hello world");
console.log(array1);
console.log(array_unique(array1));
array_push(array1, array());

//https://www.php.net/manual/en/function.array-chunk.php
const input_array = array("a", "b", "c", "d", "e");
const chunk1 = array_chunk(input_array, 2);
const chunk2 = array_chunk(input_array, 2, true);

//https://www.php.net/manual/en/function.array-column.php
const people = array(
    array({
        id: 2135,
        first_name: "John",
        last_name: "Doe",
    }),
    array({
        id: 3245,
        first_name: "Sally",
        last_name: "Smith",
    }),
    { dedf: 12 },
    array({
        id: 5342,
        first_name: "Jane",
        last_name: "Jones",
    }),
    array({
        id: 5623,
        first_name: "Peter",
        last_name: "IUEWDW",
    })
);
const people_col = array_column(people, "first_name", "id");

//https://www.php.net/manual/en/function.array-combine.php
const colours = array("green", "red", "yellow");
const fruits = array("avocado", "apple", "banana");
const combination = array_combine(colours, fruits);

//https://www.php.net/manual/en/function.array-pop.php
const stack_origin1 = array("orange", "banana", "apple", "raspberry");
const stack1 = array("orange", "banana", "apple", "raspberry");
const fruit2 = array_pop(stack1);

//https://www.php.net/manual/en/function.array-push.php
const stack_origin2 = array("orange", "banana");
const fruits3 = array("apple", "raspberry");
const stack2 = array("orange", "banana");
array_push(stack2, "apple", "raspberry");

//https://php.net/manual/en/function.arsort.php
const arr = array({ 0: "GeeksforGeeks" }, { 1: "Practice" }, { 2: "Contribute" }, { 3: "Java" }, { 4: "Videos" }, { 5: "Report Bug" }, { 6: "Article" }, { 7: "Sudo Placement" });
const arsort1 = arsort(arr);

const arr2 = array(3, 5, 2, 6, 4, "hello", 4, 7, "good bye", 8, "zero");
const arsort2 = arsort(arr2);

//https://www.php.net/manual/en/function.asort.php
const arr3 = array({ 0: "GeeksforGeeks" }, { 1: "Practice" }, { 2: "Contribute" }, { 3: "Java" }, { 4: "Videos" }, { 5: "Report Bug" }, { 6: "Article" }, { 7: "Sudo Placement" });
const arsort3 = asort(arr3);

const arr4 = array(3, 5, 2, 6, 4, "hello", 4, 7, "good bye", 8, "zero");
const arsort4 = asort(arr4);

//https://www.php.net/manual/en/function.krsort.php
const fruits4 = array({ d: "lemon" }, { a: "orange" }, { b: "banana" }, { c: "apple" });
const fruits4_ksort = krsort(fruits4);

//https://www.php.net/manual/en/function.ksort.php
const fruits5 = array({ d: "lemon" }, { a: "orange" }, { b: "banana" }, { c: "apple" });
const fruits5_ksort = ksort(fruits5);

//https://www.php.net/manual/en/function.sort.php
const fruits6 = array("lemon", "orange", "banana", "apple");
const fruits6_sorted = sort(fruits6);
const fruits6_sorted2 = sort(fruits6, "DESC");

//VAR DUMPS
const vardump = document.createElement("span");
vardump.innerHTML = `<h2>Initial notation</h2>
<pre>array1: ${var_dump(array1)}</pre>
<h2>https://www.php.net/manual/en/function.array-chunk.php</h2>
<pre>input_array: ${var_dump(input_array)}</pre>
<pre>chunk1: ${var_dump(chunk1)}</pre>
<pre>chunk2 preserve index: ${var_dump(chunk2)}</pre>
<h2>https://www.php.net/manual/en/function.array-column.php</h2>
<pre>people: ${var_dump(people)}</pre>
<pre>people column: ${var_dump(people_col)}</pre>
<h2>https://www.php.net/manual/en/function.array-combine.php</h2>
<pre>colours: ${var_dump(colours)}</pre>
<pre>fruits: ${var_dump(fruits)}</pre>
<pre>combination: ${var_dump(combination)}</pre>
<h2>https://www.php.net/manual/en/function.array-pop.php</h2>
<pre>original stack: ${var_dump(stack_origin1)}</pre>
<pre>stack pop: ${var_dump(stack1)}</pre>
<pre>popped value: ${var_dump(fruit2)}</pre>
<h2>https://www.php.net/manual/en/function.array-push.php</h2>
<pre>original stack: ${var_dump(stack_origin2)}</pre>
<pre>to push: ${var_dump(fruits3)}</pre>
<pre>pushed stack: ${var_dump(stack2)}</pre>
<h2>https://www.php.net/manual/en/function.sort.php</h2>
<pre>Array 1: ${var_dump(fruits6)}</pre>
<pre>Sorted Array 1: ${var_dump(fruits6_sorted)}</pre>
<pre>Sorted Array 2: ${var_dump(fruits6_sorted2)}</pre>
<h2>https://www.php.net/manual/en/function.arsort.php</h2>
<pre>Array 1: ${var_dump(arr)}</pre>
<pre>Sorted Array 1: ${var_dump(arsort1)}</pre>
<pre>Array 2: ${var_dump(arr2)}</pre>
<pre>Sorted Array 2: ${var_dump(arsort2)}</pre>
<h2>https://www.php.net/manual/en/function.asort.php</h2>
<pre>Array 1: ${var_dump(arr3)}</pre>
<pre>Sorted Array 1: ${var_dump(arsort3)}</pre>
<pre>Array 2: ${var_dump(arr4)}</pre>
<pre>Sorted Array 2: ${var_dump(arsort4)}</pre>
<h2>https://www.php.net/manual/en/function.krsort.php</h2>
<pre>Array 1: ${var_dump(fruits4)}</pre>
<pre>Sorted Array 1: ${var_dump(fruits4_ksort)}</pre>
<h2>https://www.php.net/manual/en/function.ksort.php</h2>
<pre>Array 1: ${var_dump(fruits5)}</pre>
<pre>Sorted Array 1: ${var_dump(fruits5_ksort)}</pre>
`;
document.body.appendChild(vardump);

/*const test1 = array({ item1: "hola mundo" }, ["efgergh", 43543, "rgewgewrg", array(1, 2, 3)], 1000, "this is another item", { item2: array(100, 200, 300) });
console.log(test1);
//test1.unset("item1");
console.log(test1);
test1.unsetR("item", 0);
console.log(test1);



const vardump = document.createElement("span");
vardump.innerHTML = `<pre>${var_dump(test1)}</pre>`;
document.body.appendChild(vardump);

const a = {};
const b = {};
b.new("asasasas", { asas: 23423423423 });
a.new("ewfderwfewr").new("ewfwfwef", 23143242);
a.new("ewfderwfewr").new("feriugefrge", b);
console.log(a);

const c = {};
c.addR("aaaaaaaa", "bbbbbbb", "cccccc", { morning: 4723483 });
c.get("aaaaaaaa", "bbbbbbb", "cccccc").new("hola", 1323123);
c.get("aaaaaaaa", "bbbbbbb", "cccccc").new("adios", 1323123);
c.addR("aaaaaaaa", "ddddddd", "eeeeee", []);
c.get("aaaaaaaa", "ddddddd", "eeeeee").push(24324234);
console.log(c);
*/
