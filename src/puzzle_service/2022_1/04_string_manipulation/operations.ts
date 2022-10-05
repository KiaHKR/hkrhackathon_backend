const performRotate = (s: string, count: number): { s: string, op_string: string } => {
    const op_string = `r${count}`;
    let s_arr = s.split('');

    const part_to_move_to_front = s_arr.slice(s_arr.length - count % s_arr.length);
    const part_to_move_to_back = s_arr.slice(0, s_arr.length - count % s_arr.length);

    const output_arr = part_to_move_to_front.concat(part_to_move_to_back);
    return { s: output_arr.join(''), op_string: op_string };
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
    let s_arr = s.split('');

    let item_index = (s_arr.indexOf(item_a) + 3);
    if (item_index >= s_arr.length) item_index = s_arr.length - 1;

    s_arr.splice(s_arr.indexOf(item_a), 1);
    s_arr.splice(item_index, 0, item_a);

    return { s: s_arr.join(''), op_string: op_string };
};

const performMirror = (s: string): { s: string, op_string: string } => {
    return { s: s.split('').reverse().join(''), op_string: 'm' };
};

export default { perform_rotate: performRotate, perform_swap: performSwap, perform_exchange: performExchange, perform_shift: performShift, perform_mirror: performMirror };