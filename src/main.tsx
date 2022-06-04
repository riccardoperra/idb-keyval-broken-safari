import {render} from "solid-js/web";
import {getCounterState} from "./counter";


function Counter() {
    const [count, increment] = getCounterState();

    return (
        <button type="button" onClick={increment}>
            {count()}
        </button>
    );
}

render(() => <Counter/>, document.getElementById("app")!);
