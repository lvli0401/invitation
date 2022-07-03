import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jsdom-global/register'
const jsdom = require('jsdom')

const { JSDOM } = jsdom
const { window } = new JSDOM(``)
const { document } = new JSDOM(``).window

global.document = document
global.window = window

configure({ adapter: new Adapter() })
