class Route {
  constructor(routes) {
    this.routes = routes
    this._loadInitialRoute()
  }

  loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrlToRoute(urlSegs)
    // debugger
    const url = `/${urlSegs.join('/')}`
    history.pushState({}, 'This works', url)
    // debugger
    const routerOutElm = document.querySelectorAll('[data-router]')[0]
    routerOutElm.innerHTML = matchedRoute.template
  }

  _matchUrlToRoute(urlSegs) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split('/').slice(0)
      // debugger
      if (routePathSegs.length !== urlSegs.length) {
        // debugger
        return false
      }
      // debugger
      return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i])
    })

    if (matchedRoute === undefined) {
      return {
        template: '<h1>Not found</h1>',
      }
    }

    return matchedRoute
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/')
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : ''

    this.loadRoute(...pathSegs)
  }
}
