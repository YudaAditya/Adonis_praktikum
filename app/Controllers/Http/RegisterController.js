'use strict'
const User = use('App/Models/User')


class RegisterController {
  async index({
    request,
    response,
    view
  }) {

    return view.render('user.register', {
      title: 'Register'
    })
  }

  async store({
    request,
    response
  }) {
    const {email, name, password} = request.only(['email', 'name', 'password'])

    const user = await User.create({
      'email': email,
      'name': name,
      'password': password
    })

    return response.redirect('/register')

  }
}

module.exports = RegisterController
