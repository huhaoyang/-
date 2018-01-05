import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import index from 'routes/index/'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })

  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },
    {
      path: '/front',
      models: () => [
        import('./models/message'),
        import('./models/company'),
      ],
      component: () => import('./routes/front/'),
    },
    {
      path: '/application',
      models: ()=> [
        import('./models/course'),
      ],
      component: () => import('./routes/application/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/front" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                     path={path}
                     component={dynamic({
                       app,
                       ...dynamics,
                     })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
