const amqp = require ("amqplib")
const msq = {Temp:10, TempF:12}
async function connect(){

    try {
        const connection = await amqp.connect('amqp://trainerkit:12345678@iwkrmq.pptik.id//trainerkit')
        const channel = await connection.createChannel ()

        let i = 1
        while (true){
            let suhu={
                TempC:Math.floor(Math.random()*100),
                TempF:Math.floor(Math.random()*100)
            }
            console.log(suhu)
            channel.sendToQueue("Sensors",Buffer.from(JSON.stringify(suhu)))
            i++
            if(i>=50){
                break
            }
        }
        console.log("Pesan Terkirim", i)

    } catch (error){
        console.log(error)

    }
    
}
setInterval(connect,3000)