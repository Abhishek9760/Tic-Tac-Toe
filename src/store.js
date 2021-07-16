import {writable} from 'svelte/store';
import io from 'socket.io-client';

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const name = prompt("name ?")
console.log('joining namespace')
const socket = io('https://fathomless-stream-20577.herokuapp.com/', {
    query: {name}
});

function createStore() {
    const marks = writable(Array.from(" ".repeat(9)));

    return {
        subscribe: marks.subscribe,
        addMarker: (mark, index) => marks.update(items => {
            let m = [...items];
            m[index] = mark;
            return m;
        }),
        setMarks: (items) => marks.set(items),
        clear: () => marks.set(Array.from(" ".repeat(9))),
        checkWin: () => {
            let resX;
            let resO;
            let winner;
            const unsubscribe = marks.subscribe(items => {
            for (let win of wins) {
                resX = win.every((i) => items[i] === "X");
                resO = win.every((i) => items[i] === "O");
                    if (resX || resO) {
                        winner = resX ? "X" : "O";
                        return;
                    }
            }
            });
            unsubscribe();
            return winner;
        },
        checkTie: () => {
            let res = false;
            const unsubscribe = marks.subscribe(items => res = items.every((mark) => mark === "X" || mark === "O"));
            unsubscribe();
            return res;
        },
    }
}
export {socket};
export default createStore();