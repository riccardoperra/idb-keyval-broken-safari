import {useIdb} from "./use-idb";
import {createEffect, createRoot, createSignal, onMount} from "solid-js";

export function $counter() {
    const idb = useIdb();
    const [$count, setCount] = createSignal(0);
    const [ready, setReady] = createSignal(true);
    const key = "_store";

    onMount(async () => {
        const idbState = await idb.get(key);
        if (idbState) {
            setCount(idbState);
            setReady(true);
        }
    });

    createEffect(async () => {
        const count = $count();
        if(ready()) {
            await idb.set(key, count);
        }
    })

    const increment = () => setCount((prev) => prev + 1);

    return [$count, increment] as const;
}

const counterState = createRoot($counter);

export const getCounterState = () => counterState;