'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')

class LoginController {
    async index({response, view}) {
        return view.render('user.login')
    }

    async store({response, request, auth}) {
        const db = await Database.connect('mongodb')

        const {email, password} = request.only([
            'email', 
            'password'])

        const users = await db.collection("users")
        .findOne({email: email})

        if(users) {
            const passwordVerified = await Hash.verify(password, users.password)

            if (passwordVerified){
                await auth.login(users)
                return response.route('home')
            } else {
                console.log('password salah')
                return response.route('register')
            }
           
            
        } else {
            console.log('user tidak ada');
            return response.route('register')
        }

        
    }

    async logout({auth, response}){
        await auth.logout()
        return response.route('login')
    }

}

module.exports = LoginController
