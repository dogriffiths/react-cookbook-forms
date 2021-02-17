import {useEffect, useRef} from 'react'
import {dequal as deepEqual} from 'dequal'
// Based on useDeepCompare by Kent C. Dodds
// https://github.com/kentcdodds/use-deep-compare-effect

export default (callback, deps) => {
    const cache = useRef()
    const version = useRef(0)

    if (!deepEqual(deps, cache.current)) {
        cache.current = deps
        version.current += 1
    }

    return useEffect(callback, [version.current])
}
