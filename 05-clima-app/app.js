const { inquireMenu, pausa } = require("./helpers/inquirer")

const main = async() =>{
    let opt
    do{
        opt = await inquireMenu()

        switch(opt){
            case 1:
                break
            case 2:
                break
            case 0:
                break
        }

        if (opt !== 0) await pausa()

    }while(opt !== 0)
}

main()