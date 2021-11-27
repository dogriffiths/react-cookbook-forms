import {render} from '@testing-library/react'

const stories = require('./Select.stories')

describe('render stories', () => {
    it('should render all storybook stories without error', () => {
        for (const story in stories) {
            if (story !== 'default') {
                const C = stories[story]
                render(<C/>)
            }
        }
    })
})
