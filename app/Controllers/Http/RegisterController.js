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
    response,
    sessions
  }) {
    console.log('test');
    const user = await User.create({
      email: request.input('email'),
      name: request.input('name'),
      password: request.input('password')
    })

    return response.redirect('/register')

  }
}

module.exports = RegisterController
