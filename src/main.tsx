import { render } from "solid-js/web";
import {
  createEffect,
  createRoot,
  createSignal,
  getOwner,
  on,
  onMount,
  runWithOwner
} from "solid-js";
import * as idb from "idb-keyval";

export function $counter() {
  const [count, setCount] = createSignal(0);
  const key = "_store";
  const owner = getOwner();

  onMount(() => {
    idb.get(key).then((state) => {
      setCount(state);

      if (owner) {
        runWithOwner(owner, () => {
          createEffect(
            on(count, (count) => {
              console.log(count);
              idb.set(key, count);
            })
          );
        });
      }
    });
  });

  const increment = () => setCount((prev) => prev + 1);

  return [count, setCount, increment] as const;
}

const counterState = createRoot($counter);
const getCounterState = () => counterState;

function Counter() {
  const [count, , increment] = getCounterState();

  return (
    <button type="button" onClick={increment}>
      {count()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);
