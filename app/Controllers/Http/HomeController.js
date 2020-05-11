'use strict'

const Database = use('Database')
const Mahasiswa = use('App/Models/Mahasiswa')
const Helpers = use('Helpers')

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

    async listMhs({request,response,view}){
      const db = await Database.connect('mongodb')
      const list = await db.collection("mahasiswas").find().toArray()
      console.log(list)
      const data = {
        list:list
      }
      return view.render('listmhs',data)
    }

    async create({request,response,session}){
        const {nama, nim, email, tgl_lahir }= request.only(['nama','nim','email','tgl_lahir'])
        const foto = request.file('foto',{
          name: new Date().getTime(),
          types: ['image'],
          size: '2mb'
        })
        const db = await Database.connect('mongodb')
        const mahasiswa = await Mahasiswa.create({
          nama, 
          nim,
          email,
          tgl_lahir,
          'foto': foto.name
        })
        await foto.move(Helpers.tmpPath('uploads'),{
          overwrite: true
        })

        if(!foto.moved()){
          session.flash({
            notification: {
              type: 'danger',
              message: 'Silahkan coba lagi !'
            }
          })
          return foto.error()
        }else{
          return response.redirect('back')
        }
        
    }

    async update({request,response}){
      const db = await Database.connect('mongodb')
      const mahasiswa = await db.collection('mahasiswas')
      await mahasiswa.update({ nim: '1608107010009' }, {
        $set: {
           nama: request.input('nama'),
           tgl_lahir: request.input('tgl_lahir')
        }
    })
    return response.route('home.listMhs')
    }

    async delete({request,response}){
      const db = await Database.connect('mongodb')
      const mahasiswa = await db.collection('mahasiswas')
      await mahasiswa.deleteOne({ nim: '1608107010009' })
    return response.route('home.listMhs')
    }
  }

  

module.exports = HomeController
