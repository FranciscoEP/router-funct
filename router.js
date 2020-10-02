class Router {
  constructor(routes) {
    this.routes = routes
    this._loadInitialRoute()
  }

  _loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrltoRoute(urlSegs)
    const url = `/${urlSegs.join('/')}`
    history.pushState({}, 'this works', url)

    const routerOutElm = document.querySelectorAll('[data-router]')[0]
    routerOutElm.innerHTML = matchedRoute.template
  }
  _matchUrltoRoute(urlSegs) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split('/').slice(1)
      if (routePathSegs.lenght !== urlSegs.length) return false
      return routePathSegs.every((routePathSegs, i) => routePathSegs === urlSegs[i])
    })
    return matchedRoute
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/')
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.splice(1) : ''

    this._loadRoute(...pathSegs)
  }
}
