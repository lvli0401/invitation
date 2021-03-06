import router from '@/router/index'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense } from 'react'
function App() {
  return (
    <Router>
      <div id='App'>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {router.map(item => {
              return (
                <Route
                  exact={item.exact}
                  path={item.path}
                  key={item.path}
                  render={props => (
                    <item.component {...props} routes={item.children} />
                  )}
                />
              )
            })}
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
export default App
