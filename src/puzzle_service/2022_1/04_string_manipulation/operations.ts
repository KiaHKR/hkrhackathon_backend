const performRotate = (s: string, count: number): { s: string, op_string: string } => {
    const op_string = `r${count}`;
    return { s: s.substring(s.length - count % s.length) + s.substring(0, s.length - count % s.length), op_string: op_string };
};

const performSwap = (s: string, index_a: number, index_b: number): { s: string, op_string: string } => {
    const op_string = `s${index_a}/${index_b}`;
    let s_arr = s.split('');
    const temp_a = s_arr[index_a];
    s_arr[index_a] = s_arr[index_b];
    s_arr[index_b] = temp_a;

    return { s: s_arr.join(''), op_string: op_string };
};

const performExchange = (s: string, item_a: string, item_b: string): { s: string, op_string: string } => {
    const op_string = `e${item_a}/${item_b}`;
    const index_a = s.indexOf(item_a);
    const index_b = s.indexOf(item_b);

    let s_arr = s.split('');
    s_arr[index_a] = s_arr[index_b];
    s_arr[index_b] = item_a;

    return { s: s_arr.join(''), op_string: op_string };
};

const performShift = (s: string, item_a: string): { s: string, op_string: string } => {
    const op_string = `s${item_a}`;
    const item_index = (s.indexOf(item_a) + 3) % (s.length - 1);
    s = s.replace(item_a, '');
    return { s: s.substring(0, item_index) + item_a + s.substring(item_index), op_string: op_string };
};

const performMirror = (s: string): { s: string, op_string: string } => {
    return { s: s.split('').reverse().join(''), op_string: 'm' };
};

export default { perform_rotate: performRotate, perform_swap: performSwap, perform_exchange: performExchange, perform_shift: performShift, perform_mirror: performMirror };