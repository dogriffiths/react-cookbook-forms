import {useEffect, useRef} from 'react'
import isEqual from 'lodash/isEqual'

function useDepsVersion(deps) {
    const cache = useRef()
    const version = useRef(0)

    if (!isEqual(deps, cache.current)) {
        cache.current = deps
        version.current += 1
    }

    return [version.current]
}

export default (callback, deps) => {
    return useEffect(callback, useDepsVersion(deps))
}
