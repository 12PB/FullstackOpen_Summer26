const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kvppss_db_user:${password}@cluster0.dewa7xc.mongodb.net/phonebook?appName=Cluster0`


mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)


switch (process.argv.length) {
    case 3:
        console.log("phonebook:")
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name," ",person.number);
            })
            mongoose.connection.close()
        })
        break
    case 5:
        const person = new Person({
            name: process.argv.at(-2),
            number: process.argv.at(-1)
        })

        person.save().then(result => {
            console.log(`added ${person.name} ${person.number} added to phonebook!`);
            mongoose.connection.close()
        })
        break
}
