// The pathname will be saved using history
import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history