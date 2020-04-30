'use strict'

class HomeController {
  async index({
    request,
    view,
    response
  }) {
    console.log('halo dunias');
    let data = {
      nama: "yuda"
    }
    return view.render('home', data)
  }
}

module.exports = HomeController
